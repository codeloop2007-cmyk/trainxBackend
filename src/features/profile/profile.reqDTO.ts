import { z } from "zod";
import { Sex } from "../../generated/prisma/enums.js";
import type { Prisma } from "../../generated/prisma/client.js";

export const createProfileSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
  age: z.number().int().min(0).optional(),
  sex: z.enum(Sex).optional(),
  profilePhotoUrl: z.url().optional(),
});

export const updateProfileSchema = z
  .object({
    name: z.string().min(1).optional(),
    bio: z.string().optional(),
    age: z.number().int().min(0).optional(),
    sex: z.enum(Sex).optional(),
    profilePhotoUrl: z.url().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateProfileDTO = z.infer<typeof createProfileSchema>;
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;

export function toCreateInput(
  userId: string,
  data: CreateProfileDTO,
): Prisma.UserProfileUncheckedCreateInput {
  return {
    userId,
    name: data.name,
    bio: data.bio ?? null,
    age: data.age ?? null,
    sex: data.sex ?? null,
    profilePhotoUrl: data.profilePhotoUrl ?? null,
  };
}

export function toUpdateInput(
  data: UpdateProfileDTO,
): Prisma.UserProfileUncheckedUpdateInput {
  const updateData: Prisma.UserProfileUncheckedUpdateInput = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.age !== undefined) updateData.age = data.age;
  if (data.sex !== undefined) updateData.sex = data.sex;
  if (data.profilePhotoUrl !== undefined)
    updateData.profilePhotoUrl = data.profilePhotoUrl;

  return updateData;
}
