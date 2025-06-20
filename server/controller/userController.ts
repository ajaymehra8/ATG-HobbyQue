import { NextFunction, Response } from "express";
import Hobby from "../models/hobbyModel";

import { MyRequest } from "../types/local";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import User from "../models/userModel";

export const getUserHobbies = catchAsync(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user._id) {
      next(new AppError(401, "You are unauthorized"));
      return;
    }
    const hobbies = await Hobby.find({ user: user?._id });
    res.status(200).json({
      success: true,
      message: "Hobbies fetched successfully",
      hobbies,
    });
  }
);

export const getAllUsers = catchAsync(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const { query } = req.query;

    if (!user || !user._id) {
      return next(new AppError(401, "You are unauthorized"));
    }

    let users;

    if (!query) {
      users = await User.find({ _id: { $ne: user._id } })
        .limit(15)
        .populate("hobbies");
    } else {
      // 1. Find hobbies matching query

      // 2. Search users by name or hobbyId
      users = await User.find({
        _id: { $ne: user._id },
        name: { $regex: query, $options: "i" },
      })
        .limit(15)
        .populate("hobbies");
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  }
);
