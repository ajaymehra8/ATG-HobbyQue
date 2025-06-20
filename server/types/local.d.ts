import express from "express";
import { IUser } from "../models/userModel";

export type MyRequest = express.Request & {
  user?: IUser;
};
