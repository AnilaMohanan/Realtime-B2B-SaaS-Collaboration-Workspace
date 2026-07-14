import { Request, Response } from "express";
import Workspace from "../models/workspace.model";


// CREATE WORKSPACE

export const createWorkspace = async (
  req: Request,
  res: Response
) => {
  try {

    const workspace = await Workspace.create(req.body);

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspace,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET ALL WORKSPACES

export const getAllWorkspaces = async (
  req: Request,
  res: Response
) => {

  try {

    const workspaces = await Workspace.find()
      .populate("ownerId", "name email");

    res.status(200).json({
      success: true,
      data: workspaces,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// GET WORKSPACE BY ID

export const getWorkspaceById = async (
  req: Request,
  res: Response
) => {

  try {

    const workspace = await Workspace.findById(req.params.id)
      .populate("ownerId", "name email");

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      data: workspace,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// UPDATE WORKSPACE

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
        runValidators: true,
      }
    );

    if (!workspace) {

      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      data: workspace,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// DELETE WORKSPACE

export const deleteWorkspace = async (
  req: Request,
  res: Response
) => {

  try {

    const workspace = await Workspace.findByIdAndDelete(req.params.id);

    if (!workspace) {

      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};