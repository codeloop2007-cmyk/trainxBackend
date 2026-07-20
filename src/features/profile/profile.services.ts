import { HttpErrorStatus } from "../../shared/constants/http_status.js";
import { HttpError } from "../../shared/errors/http.error.js";
import { profileRepo } from "./profile.repository.js";
import {
  toCreateInput,
  toUpdateInput,
  type CreateProfileDTO,
  type UpdateProfileDTO,
} from "./profile.reqDTO.js";
import type { ProfileResponseDTO } from "./profile.resDTO.js";

export const profileService = {
  /////////////////////////////////////
  async getProfile(userId: string): Promise<ProfileResponseDTO> {
    const profile = await profileRepo.findByUserId(userId);
    if (!profile) {
      throw new HttpError(HttpErrorStatus.NOT_FOUND, "Profile not found");
    }
    return profile;
  },

  /////////////////////////////////////////////
  async createProfile(
    userId: string,
    data: CreateProfileDTO,
  ): Promise<ProfileResponseDTO> {
    const existing = await profileRepo.findByUserId(userId);
    if (existing) {
      throw new HttpError(HttpErrorStatus.CONFLICT, "Profile already exists");
    }
    const createData = toCreateInput(userId, data);
    return profileRepo.createProfile(createData);
  },
  /////////////////////////////////////////
  async updateProfile(
    userId: string,
    data: UpdateProfileDTO,
  ): Promise<ProfileResponseDTO> {
    const existing = await profileRepo.findByUserId(userId);
    if (!existing) {
      throw new HttpError(HttpErrorStatus.NOT_FOUND, "Profile not found");
    }
    const updateData = toUpdateInput(data);
    return profileRepo.updateProfile(userId, updateData);
  },
};
