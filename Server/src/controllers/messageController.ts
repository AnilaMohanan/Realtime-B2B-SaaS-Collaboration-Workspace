import { Request, Response } from "express";
import Message from "../models/Message";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiver, message } = req.body;

    const newMessage = await Message.create({
      sender: (req as any).user.id,
      receiver,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          sender: (req as any).user.id,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: (req as any).user.id,
        },
      ],
    })
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const editMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;

    const updatedMessage = await Message.findOneAndUpdate(
      {
        _id: messageId,
        sender: (req as any).user.id,
      },
      { message },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      sender: (req as any).user.id,
    });

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};