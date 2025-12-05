import { IDocument } from "@/types/document";

// Google Identity Services configuration
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

// Google Identity Services types
interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

interface GoogleIdentityServices {
  accounts: {
    oauth2: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        callback: (response: TokenResponse) => void;
        error_callback?: (error: Error) => void;
        ux_mode?: string;
        state?: string;
        redirect_uri?: string;
      }) => {
        requestAccessToken: () => void;
      };
    };
  };
}

interface GoogleAPI {
  load: (api: string, callback: () => void) => void;
  client: {
    init: (config: {
      apiKey: string;
      discoveryDocs: string[];
    }) => Promise<void>;
    setToken: (token: { access_token: string }) => void;
    drive: {
      files: {
        list: (params: {
          q?: string;
          fields?: string;
          pageSize?: number;
          orderBy?: string;
        }) => Promise<{ result: { files: GoogleDriveFile[] } }>;
        get: (params: {
          fileId: string;
          alt?: string;
          fields?: string;
        }) => Promise<{ result: GoogleDriveFile; body?: string }>;
        create: (params: {
          resource: { name: string; mimeType: string; parents?: string[] };
          fields?: string;
          uploadType?: string;
          media?: { mimeType: string; body: string | File };
        }) => Promise<{ result: GoogleDriveFile }>;
        update: (params: {
          fileId: string;
          resource?: { name?: string; description?: string };
          uploadType?: string;
          media?: { mimeType: string; body: string | File };
        }) => Promise<{ result: GoogleDriveFile }>;
        delete: (params: { fileId: string }) => Promise<void>;
      };
    };
  };
}

declare global {
  interface Window {
    gapi: GoogleAPI;
    google: GoogleIdentityServices;
  }
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  parents?: string[];
  size?: string;
  createdTime: string;
  modifiedTime: string;
  owners?: Array<{
    displayName: string;
    photoLink?: string;
  }>;
}

export class GoogleDriveGISService {
  private static readonly ACCESS_TOKEN_KEY = "google_drive_access_token";
  private static readonly TOKEN_EXPIRY_KEY = "google_drive_token_expiry";
  private static tokenClient: ReturnType<
    GoogleIdentityServices["accounts"]["oauth2"]["initTokenClient"]
  > | null = null;
  private static isInitialized = false;

  private static get accessToken(): string | null {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);

    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() < expiryTime) {
        return token;
      } else {
        // Token expired, clear it
        this.clearToken();
        return null;
      }
    }

    return null;
  }

  private static set accessToken(token: string | null) {
    if (typeof window === "undefined") return;

    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
      // Set expiry to 1 hour from now (Google tokens usually last 1 hour)
      const expiry = Date.now() + 60 * 60 * 1000;
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiry.toString());
    } else {
      this.clearToken();
    }
  }

  private static clearToken() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  // Khởi tạo Google Identity Services
  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Check environment variables
    if (
      !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    ) {
      throw new Error(
        "Google API credentials not configured. Please check your environment variables.",
      );
    }

    try {
      // Load Google API and GSI scripts
      await Promise.all([this.loadGoogleAPI(), this.loadGoogleGSI()]);

      // Initialize GAPI client
      await this.initializeClient();

      // Initialize Token Client
      this.initializeTokenClient();

      // Restore token if available and set it in GAPI client
      const savedToken = this.accessToken;
      if (savedToken) {
        window.gapi.client.setToken({ access_token: savedToken });
      }

      this.isInitialized = true;
      console.log("Google Drive GIS initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Google Drive GIS:", error);
      throw new Error(`Google Drive initialization failed: ${error}`);
    }
  }

  private static loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Google API script"));
      document.head.appendChild(script);
    });
  }

  private static loadGoogleGSI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google?.accounts) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Google GSI script"));
      document.head.appendChild(script);
    });
  }

  private static initializeClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.gapi.load("client", () => {
        window.gapi.client
          .init({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          })
          .then(() => {
            resolve();
          })
          .catch(reject);
      });
    });
  }

  private static initializeTokenClient(): void {
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: SCOPES,
      callback: (response: TokenResponse) => {
        this.accessToken = response.access_token;
        // Set token for GAPI client
        window.gapi.client.setToken({ access_token: response.access_token });
        console.log("Successfully signed in to Google Drive");
      },
      error_callback: (error: Error) => {
        console.error("Token client error:", error);
      },
    });
  }

  // Đăng nhập Google với redirect flow để tránh COOP issues
  static async signIn(): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.tokenClient) {
        throw new Error("Token client not initialized");
      }

      // Thử sử dụng direct redirect thay vì popup
      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          redirect_uri: window.location.origin,
          response_type: "token",
          scope: SCOPES,
          state: Math.random().toString(36).substring(2),
        }).toString();

      // Check if we're returning from OAuth redirect
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = urlParams.get("access_token");

      if (accessToken) {
        // We have a token from redirect
        this.accessToken = accessToken;
        window.gapi.client.setToken({ access_token: accessToken });
        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        console.log("Successfully signed in to Google Drive via redirect");
        return;
      }

      // No token found, redirect to Google
      window.location.href = authUrl;
    } catch (error) {
      console.error("Sign in failed:", error);

      // Fallback to popup method as last resort
      try {
        return new Promise((resolve, reject) => {
          // Store original callbacks
          const originalCallback = this.tokenClient.callback;
          const originalErrorCallback = this.tokenClient.error_callback;

          // Override callback for this specific request
          this.tokenClient.callback = (response: TokenResponse) => {
            this.accessToken = response.access_token;
            window.gapi.client.setToken({
              access_token: response.access_token,
            });
            // Restore original callbacks
            this.tokenClient.callback = originalCallback;
            this.tokenClient.error_callback = originalErrorCallback;
            resolve();
          };

          // Override error callback for this request
          this.tokenClient.error_callback = (error: Error) => {
            // Restore original callbacks
            this.tokenClient.callback = originalCallback;
            this.tokenClient.error_callback = originalErrorCallback;
            reject(new Error(`Google Drive sign in failed: ${error}`));
          };

          this.tokenClient.requestAccessToken();
        });
      } catch (popupError) {
        throw new Error(
          `All Google Drive sign in methods failed: ${error}, ${popupError}`,
        );
      }
    }
  }

  // Đăng xuất
  static async signOut(): Promise<void> {
    this.accessToken = null;
    window.gapi.client.setToken({ access_token: "" });
    console.log("Signed out from Google Drive");
  }

  // Kiểm tra trạng thái đăng nhập
  static isSignedIn(): boolean {
    return !!this.accessToken;
  }

  // Lấy danh sách files/folders
  static async getFiles(
    parentId?: string,
    query?: string,
  ): Promise<IDocument[]> {
    if (!this.isSignedIn()) {
      throw new Error("Not signed in to Google Drive");
    }

    let q = "trashed=false";
    if (parentId) {
      q += ` and '${parentId}' in parents`;
    } else {
      q += " and parents in 'root'";
    }

    if (query) {
      q += ` and name contains '${query}'`;
    }

    const response = await window.gapi.client.drive.files.list({
      q,
      fields:
        "files(id,name,mimeType,parents,size,createdTime,modifiedTime,owners)",
      orderBy: "folder,name",
    });

    const files: GoogleDriveFile[] = response.result.files;

    return files.map((file) => this.mapGoogleDriveFileToDocument(file));
  }

  // Lấy thông tin chi tiết file
  static async getFile(fileId: string): Promise<GoogleDriveFile> {
    if (!this.isSignedIn()) {
      throw new Error("Not signed in to Google Drive");
    }

    const response = await window.gapi.client.drive.files.get({
      fileId,
      fields: "id,name,mimeType,parents,size,createdTime,modifiedTime,owners",
    });

    return response.result;
  }

  // Tạo folder mới
  static async createFolder(
    name: string,
    parentId?: string,
  ): Promise<GoogleDriveFile> {
    if (!this.isSignedIn()) {
      throw new Error("Not signed in to Google Drive");
    }

    const fileMetadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : ["root"],
    };

    const response = await window.gapi.client.drive.files.create({
      resource: fileMetadata,
      fields: "id,name,mimeType,parents,createdTime,modifiedTime,owners",
    });

    return response.result;
  }

  // Upload file
  static async uploadFile(
    file: File,
    parentId?: string,
  ): Promise<GoogleDriveFile> {
    if (!this.isSignedIn()) {
      throw new Error("Not signed in to Google Drive");
    }

    const metadata = {
      name: file.name,
      parents: parentId ? [parentId] : ["root"],
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" }),
    );
    form.append("file", file);

    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,parents,size,createdTime,modifiedTime,owners",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: form,
      },
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Cập nhật file/folder
  static async updateFile(
    fileId: string,
    updates: { name?: string; parents?: string[] },
  ): Promise<GoogleDriveFile> {
    if (!this.isSignedIn()) {
      throw new Error("Not signed in to Google Drive");
    }

    const response = await window.gapi.client.drive.files.update({
      fileId,
      resource: updates,
      fields: "id,name,mimeType,parents,createdTime,modifiedTime,owners",
    });

    return response.result;
  }

  // Xóa file/folder
  static async deleteFile(fileId: string): Promise<void> {
    if (!this.isSignedIn()) {
      throw new Error("Not signed in to Google Drive");
    }

    await window.gapi.client.drive.files.delete({
      fileId,
    });
  }

  // Download file
  static async downloadFile(fileId: string): Promise<Blob> {
    if (!this.isSignedIn()) {
      throw new Error("Not signed in to Google Drive");
    }

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return await response.blob();
  }

  // Helper: Convert Google Drive file to IDocument
  private static mapGoogleDriveFileToDocument(
    file: GoogleDriveFile,
  ): IDocument {
    const isFolder = file.mimeType === "application/vnd.google-apps.folder";

    return {
      id: file.id,
      type: isFolder ? "folder" : "file",
      name: file.name,
      size: file.size ? this.formatFileSize(parseInt(file.size)) : undefined,
      updatedAt: new Date(file.modifiedTime).toISOString().split("T")[0],
      parentId: file.parents?.[0],
      user: {
        name: file.owners?.[0]?.displayName || "Unknown",
        avatar: file.owners?.[0]?.photoLink,
      },
    };
  }

  // Helper: Format file size
  private static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
