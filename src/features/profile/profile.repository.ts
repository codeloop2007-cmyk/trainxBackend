import { prisma } from "../../configs/prisma.singleton.js";
import type { Prisma } from "../../generated/prisma/client.js";

export const profileRepo = {
  async findByUserId(userId: string) {
    return prisma.userProfile.findUnique({
      where: { userId },
    });
  },

  async createProfile(data: Prisma.UserProfileUncheckedCreateInput) {
    return prisma.userProfile.create({ data });
  },

  async updateProfile(
    userId: string,
    data: Prisma.UserProfileUncheckedUpdateInput,
  ) {
    return prisma.userProfile.update({
      where: { userId },
      data,
    });
  },
};
