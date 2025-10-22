import { IDocument } from "@/types/document";

const API_BASE_URL = "http://localhost:3001/api";

export interface DocumentResponse {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  mimeType?: string;
  parentId?: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export class DocumentService {
  private static async fetchApi(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (text) {
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }

    return null;
  }

  // Lấy danh sách documents
  static async getDocuments(
    parentId?: string,
    search?: string
  ): Promise<IDocument[]> {
    const params = new URLSearchParams();
    if (parentId) params.append("parentId", parentId);
    if (search) params.append("search", search);

    const queryString = params.toString();
    const endpoint = `/documents${queryString ? `?${queryString}` : ""}`;

    const documents = (await this.fetchApi(endpoint)) as DocumentResponse[];

    return documents.map((doc) => ({
      type: doc.type,
      name: doc.name,
      updatedAt: new Date(doc.updatedAt).toISOString().split("T")[0],
      size: doc.size,
      user: {
        name: doc.createdBy.name,
        avatar: doc.createdBy.avatar,
      },
      id: doc.id,
      parentId: doc.parentId,
    }));
  }

  // Lấy thông tin chi tiết một document
  static async getDocument(id: string): Promise<DocumentResponse> {
    return this.fetchApi(`/documents/${id}`) as Promise<DocumentResponse>;
  }

  // Tạo folder mới
  static async createFolder(
    name: string,
    parentId?: string
  ): Promise<DocumentResponse> {
    return this.fetchApi("/documents/folders", {
      method: "POST",
      body: JSON.stringify({
        name,
        type: "folder",
        parentId,
      }),
    }) as Promise<DocumentResponse>;
  }

  // Tải file
  static async uploadFile(
    file: File,
    parentId?: string
  ): Promise<DocumentResponse> {
    const formData = new FormData();
    formData.append("file", file);
    if (parentId) {
      formData.append("parentId", parentId);
    }

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  // Cập nhật document
  static async updateDocument(
    id: string,
    data: { name?: string; parentId?: string }
  ): Promise<DocumentResponse> {
    return this.fetchApi(`/documents/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }) as Promise<DocumentResponse>;
  }

  // Xóa document
  static async deleteDocument(id: string): Promise<void> {
    await this.fetchApi(`/documents/${id}`, {
      method: "DELETE",
    });
  }
}
