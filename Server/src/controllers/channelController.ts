import { Request, Response } from "express";
import Channel from "../models/Channel";
import WorkspaceMember from "../models/Workspacemember";

// Create Channel

export const createChannel = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      workspaceId,
      channelName,
      description,
    } = req.body;

    // Get logged-in user
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Check workspace membership
    const member = await WorkspaceMember.findOne({
      workspaceId,
      userId,
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    // Only Admin can create channel
    if (member.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only workspace admins can create channels",
      });
    }

    // Create channel
    const channel = await Channel.create({
      workspaceId,
      channelName,
      description,
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      message: "Channel created successfully",
      data: channel,
    });

  } catch (error) {
    console.error(
      "Create Channel Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Channels
export const getAllChannels = async (
  req: Request,
  res: Response
) => {
  try {
    const channels = await Channel.find()
      .populate("workspaceId", "workspaceName")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      total: channels.length,
      data: channels,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Channel By Id
export const getChannelById = async (
  req: Request,
  res: Response
) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("workspaceId", "workspaceName")
      .populate("createdBy", "name email");

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    res.status(200).json({
      success: true,
      data: channel,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Channel
export const updateChannel = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const channel = await Channel.findById(
      req.params.id
    );

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    const member = await WorkspaceMember.findOne({
      workspaceId: channel.workspaceId,
      userId,
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    if (member.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only workspace admins can edit channels",
      });
    }

    const updatedChannel =
      await Channel.findByIdAndUpdate(
        req.params.id,
        {
          channelName: req.body.channelName,
          description: req.body.description,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Channel updated successfully",
      data: updatedChannel,
    });

  } catch (error) {

    console.error(
      "Update Channel Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Channel
export const deleteChannel = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const channel = await Channel.findById(
      req.params.id
    );

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    const member = await WorkspaceMember.findOne({
      workspaceId: channel.workspaceId,
      userId,
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "You are not a workspace member",
      });
    }

    if (member.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only workspace admins can delete channels",
      });
    }

    await Channel.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Channel deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete Channel Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Channels by Workspace
export const getChannelsByWorkspace = async (
  req: Request,
  res: Response
) => {
  try {
    const { workspaceId } = req.params;

    const channels = await Channel.find({
      workspaceId,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: channels.length,
      data: channels,
    });

  } catch (error) {
    console.error("Get Channels Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};