export interface Document {
  _id?: string;
  workspaceId: string;
  title: string;
  content: string;
  createdBy: string;
  lastEditedBy: string;
  createdAt?: string;
  updatedAt?: string;
}