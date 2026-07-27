import { Request, Response } from "express";
import Channel from "../models/Channel";

// Create Channel
export const createChannel = async (req: Request, res: Response) => {
  try {
    const channel = await Channel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Channel created successfully",
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
    const channel = await Channel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Channel updated successfully",
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

// Delete Channel
export const deleteChannel = async (
  req: Request,
  res: Response
) => {
  try {
    await Channel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Channel deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};