import express from "express";
import * as authController from "../controller/authController";
import * as userController from "../controller/userController";


const router = express.Router();

router.use(authController.isProtect);
router.get('/user-hobbies',userController.getUserHobbies);


export default router;
