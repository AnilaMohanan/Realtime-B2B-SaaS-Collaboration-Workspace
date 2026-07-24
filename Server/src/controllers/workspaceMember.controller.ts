import { Request, Response } from "express";
import WorkspaceMember from "../models/Workspacemember";

// Create Member
export const createWorkspaceMember = async (
  req: Request,
  res: Response
) => {
  try {
    const member = await WorkspaceMember.create(req.body);

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Members
export const getAllWorkspaceMembers = async (
  req: Request,
  res: Response
) => {
  try {
    const members = await WorkspaceMember.find()
      .populate("workspaceId")
      .populate("userId");

    res.status(200).json({
      success: true,
      totalMembers: members.length,
      data: members,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Member By ID
export const getWorkspaceMemberById = async (
  req: Request,
  res: Response
) => {
  try {
    const member = await WorkspaceMember.findById(req.params.id)
      .populate("workspaceId")
      .populate("userId");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Member Role
export const updateWorkspaceMember = async (
  req: Request,
  res: Response
) => {
  try {
    const member = await WorkspaceMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Member
export const deleteWorkspaceMember = async (
  req: Request,
  res: Response
) => {
  try {
    const member = await WorkspaceMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};