import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  registerSSchema,
  loginSchema,
  subscriptionSchema,
} from "../models/user.js";
import {
  registerController,
  loginController,
  getCurrentController,
  logOutController,
  UpdateSubcriptionController,
} from "../controllers/authControllers.js";

import { authenticate } from "../middlewares/authenticate.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", validateBody(registerSSchema), registerController);
AuthRouter.post("/login", validateBody(loginSchema), loginController);
AuthRouter.get("/current", authenticate, getCurrentController);
AuthRouter.post("/logout", authenticate, logOutController);
AuthRouter.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  UpdateSubcriptionController
);
export default AuthRouter;
