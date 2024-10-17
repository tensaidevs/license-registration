import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { sendError } from "@/utils/sendError";
import { getPassword } from "@/utils/getPassword";

export const verifyJWT  = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {
      // Checking if token is provided
      if (!token) {
        throw new ApiError(401, "Unauthorized Request");
      }
      const password = getPassword(token);
      if (!password) {
        throw new ApiError(401, "Invalid access token");
      }

      if (password !== process.env.PASSWORD) {
        throw new ApiError(401, "Invalid access token");
      }
      next();
    } catch (error: any) {
      sendError(res, error);
    }
  },
);
