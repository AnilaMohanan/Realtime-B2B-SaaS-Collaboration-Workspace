import { Request, Response } from "express";
import Workspace from "../models/Workspace";
import WorkspaceMember from "../models/Workspacemember";
import Channel from "../models/Channel";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalWorkspaces = await Workspace.countDocuments();

    const totalMembers = await WorkspaceMember.countDocuments();

    const totalChannels = await Channel.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalWorkspaces,
        totalMembers,
        totalChannels,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};