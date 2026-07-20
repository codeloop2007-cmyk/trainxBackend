import { userRepository } from "./user.repository.js";

async function syncUser(userId: string): Promise<boolean> {
  await userRepository.upsertUser(userId);
  return true;
}
export const userService = {
  syncUser,
};
