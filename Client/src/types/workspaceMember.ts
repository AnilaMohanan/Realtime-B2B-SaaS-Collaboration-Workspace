export interface WorkspaceMember {
  _id: string;

  workspaceId: string;

  role: string;

  userId: {
    _id: string;
    name: string;
    email: string;
  };
}