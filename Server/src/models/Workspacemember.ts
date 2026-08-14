import mongoose, { Schema, Document } from "mongoose";

export interface IWorkspaceMember extends Document {
  workspaceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role: "Admin" | "Member";
  joinedAt: Date;
}

const WorkspaceMemberSchema = new Schema<IWorkspaceMember>({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  role: {
    type: String,
    enum: ["Admin", "Member"],
    default: "Member",
  },

  joinedAt: {
    type: Date,
    default: Date.now,
  },
});
// Prevent the same user from being added twice
// to the same workspace
WorkspaceMemberSchema.index(
  { workspaceId: 1, userId: 1 },
  { unique: true }
);

export default mongoose.model<IWorkspaceMember>(
  "WorkspaceMember",
  WorkspaceMemberSchema
);