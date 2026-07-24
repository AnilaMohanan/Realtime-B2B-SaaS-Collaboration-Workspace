export interface Workspace {
  _id?: string;
  workspaceName: string;
  description: string;
  ownerId: string;
  inviteCode: string;
  isPrivate: boolean;
}