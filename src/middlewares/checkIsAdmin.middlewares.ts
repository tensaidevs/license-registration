import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { getUserRole } from "@/utils/getUserRole";
import { getUserId } from "@/utils/getUserId";
import { ApiError } from "@/utils/ApiError";
import { sendError } from "@/utils/sendError";

export const checkIsAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {
      // Check if token exists
      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }
      const userId = getUserId(token);
      if (!userId) {
        throw new ApiError(401, "Invalid access token");
      }

      // Get user role from database based on userId
      const userRole = await getUserRole(userId);

      // Check if user has admin role
      if (userRole !== "0001") {
        throw new ApiError(401, "Only Admins are allowed to make this request");
      }

      next();
    } catch (error) {
      sendError(res, error);
    }
  },
);
