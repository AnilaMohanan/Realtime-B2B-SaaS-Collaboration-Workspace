import { Request, Response } from "express";
import WorkspaceMember from "../models/Workspacemember";


//Create a Member
export const addMember = async (
  req: Request,
  res: Response
) => {
  try {
    const { workspaceId, userId, role } = req.body;

    const loggedInUserId = (req as any).user.id;

    // Check whether logged-in user is Admin
    const admin = await WorkspaceMember.findOne({
      workspaceId,
      userId: loggedInUserId,
      role: "Admin",
    });

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Only workspace admins can add members",
      });
    }

    // Check whether member already exists
    const existingMember = await WorkspaceMember.findOne({
      workspaceId,
      userId,
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "User is already a workspace member",
      });
    }

    const member = await WorkspaceMember.create({
      workspaceId,
      userId,
      role: role || "Member",
    });

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Get Members by Workspace
export const getWorkspaceMembers = async (
  req: Request,
  res: Response
) => {
  try {
    const members = await WorkspaceMember.find({
      workspaceId: req.params.workspaceId,
    })
      .populate("userId", "name email")
      .populate("workspaceId", "workspaceName");

    res.json({
      success: true,
      total: members.length,
      data: members,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Update Member Role
export const updateMember = async (
  req: Request,
  res: Response
) => {
  try {
    const loggedInUserId = (req as any).user.id;

    const member = await WorkspaceMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const admin = await WorkspaceMember.findOne({
      workspaceId: member.workspaceId,
      userId: loggedInUserId,
      role: "Admin",
    });

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Only workspace admins can change member roles",
      });
    }

    const updatedMember =
      await WorkspaceMember.findByIdAndUpdate(
        req.params.id,
        {
          role: req.body.role,
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      message: "Member role updated successfully",
      data: updatedMember,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Delete Member
export const deleteMember = async (
  req: Request,
  res: Response
) => {
  try {
    await WorkspaceMember.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};