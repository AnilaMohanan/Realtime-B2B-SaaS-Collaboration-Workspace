import { Request, Response } from "express";
import WorkspaceMember from "../models/Workspacemember";


//Create a Member
export const addMember = async (
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
    const member =
      await WorkspaceMember.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json({
      success: true,
      message: "Member updated successfully",
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