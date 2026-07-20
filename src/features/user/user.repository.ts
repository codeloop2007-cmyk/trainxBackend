import { prisma } from "../../configs/prisma.singleton.js";

function upsertUser(id: string) {
  return prisma.user.upsert({
    where: { id },
    create: {
      id,
      lastLogin: new Date(),
    },
    update: {
      lastLogin: new Date(),
    },
  });
}

export const userRepository = {
  upsertUser,
};
