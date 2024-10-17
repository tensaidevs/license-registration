import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendError } from "@/utils/sendError";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateRequiredFields } from "@/utils/validateRequiredFields";

// User Login
const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const {  password } = req.body;

  try {
    // Checking if required fields are missing
    validateRequiredFields({password})
    
    const payload = { role: 'admin',password: process.env.PASSWORD};

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
