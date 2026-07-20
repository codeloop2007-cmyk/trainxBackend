import { getAuth } from "@clerk/express";
import {
  HttpErrorStatus,
  HttpSuccessStatus,
} from "../../shared/constants/http_status.js";

import { userService } from "./user.service.js";
import type { Request, Response } from "express";
import { HttpError } from "../../shared/errors/http.error.js";
import type { HttpBody } from "../../shared/types/http_body.js";
export async function syncUserController(req: Request, res: Response) {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new HttpError(HttpErrorStatus.UNAUTHORIZED, "invalid user id");
  }

  await userService.syncUser(userId);
  const resBody: HttpBody<unknown> = {
    success: true,
    data: {
      sync: true,
    },
  };
  res.status(HttpSuccessStatus.OK).json(resBody);
}
