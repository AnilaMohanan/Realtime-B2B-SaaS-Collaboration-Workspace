import { Request, Response } from "express";
import Channel from "../models/channel.model";

// Create Channel
export const createChannel = async (req: Request, res: Response) => {
  try {
    const channel = await Channel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Channel created successfully",
      data: channel,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Channels
export const getAllChannels = async (req: Request, res: Response) => {
  try {
    const channels = await Channel.find()
      .populate("workspaceId")
      .populate("createdBy");

    res.status(200).json({
      success: true,
      totalChannels: channels.length,
      data: channels,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Channel By Id
export const getChannelById = async (req: Request, res: Response) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("workspaceId")
      .populate("createdBy");

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Channel
export const updateChannel = async (req: Request, res: Response) => {
  try {
    const channel = await Channel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Channel updated successfully",
      data: channel,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Channel
export const deleteChannel = async (req: Request, res: Response) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.id);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Channel deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};