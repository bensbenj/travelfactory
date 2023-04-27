import { Request, Response } from "express";
import { users } from "../db/users";

export const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const userExist = users.filter((user) => user.phone === req.body.phone);

      if (userExist?.length > 0) {
        throw new Error("This user already exist.");
      }

      users.push({ ...req.body, id: (users.length + 1).toString() });

      res.status(200).json({
        message: `User ${req.body.firstname} ${req.body.lastname} successful register`,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
        success: false,
      });
    }
  },

  getAll: (req: Request, res: Response) => {
    try {
      res.status(200).json({
        success: true,
        message: "Users list",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error get all user",
        error,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      let index = users.findIndex((user) => {
        return user.id === req.params.id;
      });

      if (index < 0) {
        throw new Error("User not found.");
      }
      users.splice(index, 1);

      res
        .status(200)
        .json({ success: true, message: "The user deleted.", data: users });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error delete user",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      let index = users.findIndex((user) => {
        return user.id === req.params.id;
      });

      if (index < 0) {
        throw new Error("User not found.");
      }

      users[index] = req.body;

      res.status(200).json({
        success: true,
        message: "The user updated.",
        data: users[index],
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error update user",
        error,
      });
    }
  },
};
