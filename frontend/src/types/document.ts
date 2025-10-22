interface User {
  name: string;
  avatar?: string;
}

export interface IDocument {
  id?: string;
  type: "folder" | "file";
  name: string;
  updatedAt: string;
  size?: string;
  user: User;
  parentId?: string;
}
export interface IFolder {
  id: string;
  name: string;
  items: IDocument[];
}
