import { Router } from "express";
import {
  createUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} from "./auth.controller.js"; // add .js extension here

export const authRouter = Router();

authRouter.post("/auth/register", createUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/request-reset", requestPasswordReset);
authRouter.post("/auth/reset-password", resetPassword);
