import Hobby, { IHobby } from "../models/hobbyModel";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { MyRequest } from "../types/local";
import { NextFunction, Response } from "express";

export const createHobby = catchAsync(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user._id) {
      next(new AppError(401, "You are not authorized"));
      return;
    }
    const { name } = req.body;
    if (!name) {
      next(new AppError(400, "Provide a hobby name"));
      return;
    }
    let hobby:IHobby|null = await Hobby.create({ user: user._id, name });
    if (!hobby) {
      next(new AppError(500, "Problem in creating hobby"));
      return;
    }
    hobby=await Hobby.findById(hobby._id).populate("user");
    res.status(200).json({
      success: true,
      message: "Hobby created successfully",
      hobby,
    });
  }
);

export const deleteHobby = catchAsync(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user._id) {
      next(new AppError(401, "You are not authorized"));
      return;
    }
    let hobby: string | IHobby | null = req.params.hobby as string;
    if (!hobby) {
      next(new AppError(400, "Select a hobby"));
      return;
    }
    hobby = await Hobby.findById(hobby);
    if (!hobby) {
      next(new AppError(404, "No hobby found"));
      return;
    }
    await Hobby.findByIdAndDelete(hobby);

    res.status(200).json({
      success: true,
      message: "Hobby deleted successfully",
      hobby,
    });
  }
);

export const updateHobby = catchAsync(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user._id) {
      next(new AppError(401, "You are not authorized"));
      return;
    }
    const { name, hobbyId } = req.body;
    if (!name) {
      next(new AppError(400, "Provide a hobby name"));
      return;
    }
    if (!hobbyId) {
      next(new AppError(400, "Select a hobby"));
      return;
    }
    let hobby = await Hobby.findById(hobbyId);
    if (!hobby) {
      next(new AppError(404, "No hobby found"));
      return;
    }
    hobby = await Hobby.findByIdAndUpdate(hobbyId, { name });
    res.status(200).json({
      success: true,
      message: "Hobby created successfully",
      updateHobby: hobby,
    });
  }
);

export const getAllHobbies = catchAsync(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log("working");
    if (!user || !user._id) {
      next(new AppError(401, "You are unauthorized"));
      return;
    }
    const hobbies = await Hobby.find({})
      .limit(13)
      .populate("user")
      .sort({ createdAt: -1 });
      console.log(hobbies);
    res.status(200).json({
      success: true,
      message: "Hobbies fetched successfully",
      hobbies,
    });
  }
);

export const getUsersByHobbies = catchAsync(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const { query } = req.query;

    if (!user || !user._id) {
      return next(new AppError(401, "You are unauthorized"));
    }

    if (!query || typeof query !== "string") {
      return next(new AppError(400, "Query is required"));
    }
console.log(query);
    // Step 1: Find matching hobbies by name
    const matchingHobbies = await Hobby.find({
      name: { $regex: query, $options: "i" },
    });

    if (matchingHobbies.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found with that hobby",
        users: [],
      });
    }

    // Step 2: Extract unique user IDs from hobbies
    const userIds = new Set<string>();
    matchingHobbies.forEach((hobby) => {
      // assuming hobby.user is a single user or an array (adjust as needed)
      if (Array.isArray(hobby.user)) {
        hobby.user.forEach((u: any) => userIds.add(u.toString()));
      } else {
        userIds.add(hobby.user.toString());
      }
    });

    // Step 3: Remove current user from result
    userIds.delete(user._id.toString());

    // Step 4: Fetch users
    const users = await User.find({ _id: { $in: Array.from(userIds) } }).populate("hobbies");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  }
);

