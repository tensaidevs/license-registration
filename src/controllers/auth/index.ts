import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendError } from "@/utils/sendError";
import { getUserRole } from "@/utils/getUserRole";

// User Login
const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Checking if required fields are missing
    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      throw new ApiError(
        400,
        `Following fields are required: ${missingFields.join(", ")}`,
      );
    }

    // Checking if all required fields are provided
    if ([email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Email and Password cannot be empty");
    }

    // Checking if User with this email exists and not deleted
    const user: any = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));

    if (user.length === 0 || user[0]?.isDeleted) {
      throw new ApiError(404, "User with this email does not exist");
    }

    // Checking if password is set
    const foundPassword = user[0]?.password;
    if (!foundPassword) {
      throw new ApiError(401, "User password is not set");
    }

    // Checking if password is correct
    const isMatch = await bcrypt.compare(password, user[0]?.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid password");
    }

    // Get User Role
    const publicId = await getUserRole(user[0]?.id as string);
    const userRole =
      publicId === process.env.ADMIN_PUBLIC_ID
        ? "admin"
        : publicId === process.env.CANDIDATE_PUBLIC_ID
          ? "candidate"
          : "customer";

    // If password is correct, generate access token
    const payload = { userId: user[0]?.id, userRole };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "30d",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { token }, "You are logged in successfully"));
  } catch (error) {
    sendError(res, error);
  }
});

export { userLogin };
