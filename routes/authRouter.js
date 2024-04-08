import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  registerSSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
} from "../models/user.js";
import {
  registerController,
  loginController,
  getCurrentController,
  logOutController,
  UpdateSubcriptionController,
  updateAvatarController,
  verifyEmailController,
  resendVerifyEmailController,
} from "../controllers/authControllers.js";

import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
const AuthRouter = express.Router();

AuthRouter.post("/register", validateBody(registerSSchema), registerController);
AuthRouter.get("/verify/:verificationToken", verifyEmailController);
AuthRouter.post(
  "/verify",
  validateBody(emailSchema),
  resendVerifyEmailController
);
AuthRouter.post("/login", validateBody(loginSchema), loginController);
AuthRouter.get("/current", authenticate, getCurrentController);
AuthRouter.post("/logout", authenticate, logOutController);
AuthRouter.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  UpdateSubcriptionController
);
AuthRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarController
);

export default AuthRouter;
