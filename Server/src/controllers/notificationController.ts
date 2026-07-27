import { Request, Response } from "express";
import Notification from "../models/Notification";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { user, title, message } = req.body;

    const notification = await Notification.create({
      user,
      title,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      user: (req as any).user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const markNotificationAsRead = async (
  req: Request,
  res: Response
) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        user: (req as any).user.id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};