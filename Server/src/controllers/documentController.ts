import { Request, Response } from "express";
import Document from "../models/Document";

//Create Document
export const createDocument = async (
  req: Request,
  res: Response
) => {
  try {
    const document = await Document.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Document created successfully",
      data: document,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Get All Document

export const getAllDocuments = async (
  req: Request,
  res: Response
) => {
  try {
    const documents =
      await Document.find()
        .populate(
          "workspaceId",
          "workspaceName"
        )
        .populate(
          "createdBy",
          "name email"
        )
        .populate(
          "lastEditedBy",
          "name email"
        )
        .sort({
          updatedAt: -1,
        });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Get Document By Id
export const getDocumentById = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId } =
      req.params;

    const document =
      await Document.findById(
        documentId
      )
        .populate(
          "workspaceId",
          "workspaceName"
        )
        .populate(
          "createdBy",
          "name email"
        )
        .populate(
          "lastEditedBy",
          "name email"
        );

    if (!document) {
      return res.status(404).json({
        success: false,
        message:
          "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Get Documents By Workspace
export const getDocumentsByWorkspace =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { workspaceId } =
        req.params;

      const documents =
        await Document.find({
          workspaceId,
        })
          .populate(
            "createdBy",
            "name email"
          )
          .populate(
            "lastEditedBy",
            "name email"
          )
          .sort({
            updatedAt: -1,
          });

      return res.status(200).json({
        success: true,
        data: documents,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  //Update Document

  export const updateDocument = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId } =
      req.params;

    const updatedDocument =
      await Document.findByIdAndUpdate(
        documentId,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedDocument) {
      return res.status(404).json({
        success: false,
        message:
          "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Document updated successfully",
      data: updatedDocument,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Delete Document
export const deleteDocument = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId } =
      req.params;

    const deletedDocument =
      await Document.findByIdAndDelete(
        documentId
      );

    if (!deletedDocument) {
      return res.status(404).json({
        success: false,
        message:
          "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Search Document
export const searchDocuments = async (
  req: Request,
  res: Response
) => {
  try {
    const { keyword } = req.query;

    const documents =
      await Document.find({
        title: {
          $regex: keyword,
          $options: "i",
        },
      });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Get Recent Document
export const getRecentDocuments =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const documents =
        await Document.find()
          .sort({
            updatedAt: -1,
          })
          .limit(10);

      return res.status(200).json({
        success: true,
        data: documents,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };