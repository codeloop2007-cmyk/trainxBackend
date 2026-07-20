import { Router } from "express";
import { profileController } from "./profile.controller.js";

export const profileRouter = Router();

profileRouter.get("/", profileController.getProfile);
profileRouter.post("/", profileController.createProfile);
profileRouter.patch("/", profileController.updateProfile);
