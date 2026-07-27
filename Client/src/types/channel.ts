export interface Channel {

  _id: string;

  workspaceId: {
    _id: string;
    workspaceName: string;
  };

  channelName: string;

  description: string;

  createdBy: {
    _id: string;
    name: string;
    email: string;
  };

  createdAt: string;

  updatedAt: string;
}