import type { Request, Response } from "express";
import { createProfileSchema, updateProfileSchema } from "./profile.reqDTO.js";
import type { ProfileResponseDTO } from "./profile.resDTO.js";
import type { HttpBody } from "../../shared/types/http_body.js";
import { getAuth } from "@clerk/express";
import { profileService } from "./profile.services.js";
import { HttpError } from "../../shared/errors/http.error.js";
import { HttpErrorStatus } from "../../shared/constants/http_status.js";

export const profileController = {
  async getProfile(req: Request, res: Response<HttpBody<ProfileResponseDTO>>) {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new HttpError(HttpErrorStatus.UNAUTHORIZED, "invalid user id");
    }

    const profile = await profileService.getProfile(userId);
    res.json({ success: true, data: profile });
  },

  async createProfile(
    req: Request,
    res: Response<HttpBody<ProfileResponseDTO>>,
  ) {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new HttpError(HttpErrorStatus.UNAUTHORIZED, "invalid user id");
    }

    const validation = createProfileSchema.safeParse(req.body);
    if (!validation.success) {
      throw new HttpError(HttpErrorStatus.BAD_REQUEST, "Invalid request");
    }
    const profile = await profileService.createProfile(userId, validation.data);
    res.status(201).json({ success: true, data: profile });
  },

  async updateProfile(
    req: Request,
    res: Response<HttpBody<ProfileResponseDTO>>,
  ) {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new HttpError(HttpErrorStatus.UNAUTHORIZED, "invalid user id");
    }
    const validation = updateProfileSchema.safeParse(req.body);
    if (!validation.success) {
      throw new HttpError(HttpErrorStatus.BAD_REQUEST, "Invalid request");
    }
    const profile = await profileService.updateProfile(userId, validation.data);
    res.json({ success: true, data: profile });
  },
};
