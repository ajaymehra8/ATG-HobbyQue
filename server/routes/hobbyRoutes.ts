import express from "express";
import * as authController from "../controller/authController";
import * as hobbyController from "../controller/hobbyController";

const router = express.Router();

router.use(authController.isProtect);
router
  .route("/")
  .post(hobbyController.createHobby)
  .patch(hobbyController.updateHobby);
router.delete("/:hobby", hobbyController.deleteHobby);

export default router;
