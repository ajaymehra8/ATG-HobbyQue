import { NextFunction, Response } from "express";
import Hobby from "../models/hobbyModel";

import { MyRequest } from "../types/local";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

export const getUserHobbies=catchAsync(async(req:MyRequest,res:Response,next:NextFunction)=>{
const user=req.user;
if(!user || !user._id){
next(new AppError(401,"You are unauthorized"));
  return;
}
const hobbies=await Hobby.find({user:user?._id});
res.status(200).json({
  success:true,
  message:"Hobbies fetched successfully",
  hobbies
});
});