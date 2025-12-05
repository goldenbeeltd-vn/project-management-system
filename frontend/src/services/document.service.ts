import { IDocument } from "@/types/document";
import { GoogleDriveGISService } from "./google-drive-gis.service";

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
  // Lấy danh sách documents từ Google Drive
  static async getDocuments(
    parentId?: string,
    search?: string,
  ): Promise<IDocument[]> {
    return await GoogleDriveGISService.getFiles(parentId, search);
  }

  // Lấy thông tin chi tiết một document từ Google Drive
  static async getDocument(id: string): Promise<DocumentResponse> {
    const file = await GoogleDriveGISService.getFile(id);
    // Convert Google Drive format to local format
    return {
      id: file.id,
      name: file.name,
      type:
        file.mimeType === "application/vnd.google-apps.folder"
          ? "folder"
          : "file",
      size: file.size,
      mimeType: file.mimeType,
      parentId: file.parents?.[0],
      createdBy: {
        id: "google-user",
        name: file.owners?.[0]?.displayName || "Unknown",
        avatar: file.owners?.[0]?.photoLink,
      },
      createdAt: file.createdTime,
      updatedAt: file.modifiedTime,
    };
  }

  // Tạo folder mới trên Google Drive
  static async createFolder(
    name: string,
    parentId?: string,
  ): Promise<DocumentResponse> {
    const folder = await GoogleDriveGISService.createFolder(name, parentId);
    return {
      id: folder.id,
      name: folder.name,
      type: "folder",
      mimeType: folder.mimeType,
      parentId: folder.parents?.[0],
      createdBy: {
        id: "google-user",
        name: folder.owners?.[0]?.displayName || "Unknown",
        avatar: folder.owners?.[0]?.photoLink,
      },
      createdAt: folder.createdTime,
      updatedAt: folder.modifiedTime,
    };
  }

  // Tải file lên Google Drive
  static async uploadFile(
    file: File,
    parentId?: string,
  ): Promise<DocumentResponse> {
    const uploadedFile = await GoogleDriveGISService.uploadFile(file, parentId);
    return {
      id: uploadedFile.id,
      name: uploadedFile.name,
      type: "file",
      size: uploadedFile.size,
      mimeType: uploadedFile.mimeType,
      parentId: uploadedFile.parents?.[0],
      createdBy: {
        id: "google-user",
        name: uploadedFile.owners?.[0]?.displayName || "Unknown",
        avatar: uploadedFile.owners?.[0]?.photoLink,
      },
      createdAt: uploadedFile.createdTime,
      updatedAt: uploadedFile.modifiedTime,
    };
  }

  // Cập nhật document trên Google Drive
  static async updateDocument(
    id: string,
    data: { name?: string; parents?: string[] },
  ): Promise<DocumentResponse> {
    const updatedFile = await GoogleDriveGISService.updateFile(id, data);
    return {
      id: updatedFile.id,
      name: updatedFile.name,
      type:
        updatedFile.mimeType === "application/vnd.google-apps.folder"
          ? "folder"
          : "file",
      size: updatedFile.size,
      mimeType: updatedFile.mimeType,
      parentId: updatedFile.parents?.[0],
      createdBy: {
        id: "google-user",
        name: updatedFile.owners?.[0]?.displayName || "Unknown",
        avatar: updatedFile.owners?.[0]?.photoLink,
      },
      createdAt: updatedFile.createdTime,
      updatedAt: updatedFile.modifiedTime,
    };
  }

  // Xóa document từ Google Drive
  static async deleteDocument(id: string): Promise<void> {
    await GoogleDriveGISService.deleteFile(id);
  }

  // Download file từ Google Drive
  static async downloadFile(id: string): Promise<Blob> {
    return await GoogleDriveGISService.downloadFile(id);
  }
}
