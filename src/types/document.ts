interface User {
  name: string;
  avatar?: string;
}

export interface IDocument {
  type: "folder" | "file";
  name: string;
  updatedAt: string;
  size?: string;
  user: User;
}
export interface IFolder {
  id: string;
  name: string;
  items: IDocument[];
}
