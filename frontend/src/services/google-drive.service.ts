import { IDocument } from "@/types/document";

// Google Drive API configuration
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

// Google API client - sẽ được load từ Google APIs
interface GoogleAuth {
  isSignedIn: {
    get(): boolean;
  };
  signIn(options?: { prompt?: string }): Promise<unknown>;
  signOut(): Promise<void>;
}

interface GoogleAPI {
  load: (api: string, callback: () => void) => void;
  client: {
    init: (config: {
      apiKey: string;
      discoveryDocs: string[];
      clientId: string;
      scope: string;
    }) => Promise<void>;
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
        }) => Promise<{ result: GoogleDriveFile }>;
        update: (params: {
          fileId: string;
          resource?: { name?: string };
        }) => Promise<{ result: GoogleDriveFile }>;
        delete: (params: { fileId: string }) => Promise<void>;
      };
    };
  };
  auth2: {
    init: (config: { client_id: string; scope: string }) => Promise<void>;
    getAuthInstance(): GoogleAuth;
  };
}

declare global {
  interface Window {
    gapi: GoogleAPI;
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: unknown) => void;
          }) => void;
        };
      };
    };
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

export class GoogleDriveService {
  private static accessToken: string | null = null;
  private static isInitialized = false;

  // Khởi tạo Google API
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
      // Load Google API script
      await this.loadGoogleAPI();

      // Initialize auth2
      await this.initializeAuth();

      // Initialize client
      await this.initializeClient();

      this.isInitialized = true;
      console.log("Google Drive API initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Google Drive API:", error);
      throw new Error("Google Drive initialization failed");
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

  private static initializeAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          })
          .then(() => {
            resolve();
          })
          .catch(reject);
      });
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

  // Đăng nhập Google
  static async signIn(): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance) {
        throw new Error("Google Auth not initialized");
      }

      const user = await authInstance.signIn({
        scope: SCOPES,
      });

      const authResponse = user.getAuthResponse();
      if (!authResponse || !authResponse.access_token) {
        throw new Error("Failed to get access token");
      }

      this.accessToken = authResponse.access_token;
      console.log("Successfully signed in to Google Drive");
    } catch (error) {
      console.error("Sign in failed:", error);
      throw new Error(`Google Drive sign in failed: ${error}`);
    }
  }

  // Đăng xuất
  static async signOut(): Promise<void> {
    const authInstance = window.gapi.auth2.getAuthInstance();
    await authInstance.signOut();
    this.accessToken = null;
  }

  // Kiểm tra trạng thái đăng nhập
  static isSignedIn(): boolean {
    if (!this.isInitialized) return false;
    const authInstance = window.gapi.auth2.getAuthInstance();
    return authInstance.isSignedIn.get() && !!this.accessToken;
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
