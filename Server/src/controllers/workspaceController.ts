import { Request, Response } from "express";
import Workspace from "../models/Workspace";

// Create Workspace
export const createWorkspace = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    const workspace = await Workspace.create(req.body);

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspace,
    });
  } catch (error: any) {
  console.error("Create Workspace Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
    error,
  });
  }
};

// Get All Workspaces
export const getAllWorkspaces = async (
  req: Request,
  res: Response
) => {
  try {
    const workspaces = await Workspace.find().populate(
      "ownerId",
      "name email"
    );

    res.status(200).json({
      success: true,
      total: workspaces.length,
      data: workspaces,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Workspace By Id
export const getWorkspaceById = async (
  req: Request,
  res: Response
) => {
  try {
    const workspace = await Workspace.findById(req.params.id).populate(
      "ownerId",
      "name email"
    );

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Workspace
export const updateWorkspace = async (
  req: Request,
  res: Response
) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Workspace updated successfully",
      data: workspace,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Workspace
export const deleteWorkspace = async (
  req: Request,
  res: Response
) => {
  try {
    await Workspace.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};