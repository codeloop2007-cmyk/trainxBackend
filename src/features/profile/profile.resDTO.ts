import type { Sex } from "../../generated/prisma/enums.js";

export type ProfileResponseDTO = {
  userId: string;
  name: string;
  bio: string | null;
  age: number | null;
  sex: Sex | null;
  profilePhotoUrl: string | null;
};
