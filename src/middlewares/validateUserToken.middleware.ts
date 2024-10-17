import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { UserTable } from "@/drizzle/schema";
import { sendError } from "@/utils/sendError";
import { getUserId } from "@/utils/getUserId";

declare global {
  namespace Express {
    interface Request {
      user?: User | undefined;
    }
  }
}

export const validateUserToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {
      // Checking if token is provided
      if (!token) {
        throw new ApiError(401, "Unauthorized Request");
      }
      const userId = getUserId(token);
      if (!userId) {
        throw new ApiError(401, "Invalid access token");
      }

      // Checking if user exists
      const user = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, userId));

      if (!user) {
        throw new ApiError(401, "Invalid access token");
      }

      // Add found user to the request object
      req.user = user;
      next();
    } catch (error: any) {
      sendError(res, error);
    }
  },
);
