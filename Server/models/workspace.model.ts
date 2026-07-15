import mongoose, { Schema, Document } from "mongoose";

export interface IWorkspace extends Document {
  workspaceName: string;
  description: string;
  ownerId: mongoose.Types.ObjectId;
  inviteCode: string;
  isPrivate: boolean;
}

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    workspaceName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    inviteCode: {
      type: String,
      required: true,
      unique: true,
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWorkspace>(
  "Workspace",
  WorkspaceSchema
);