import { ApiError } from "./ApiError";
import { Response } from "express";
import { ApiResponse } from "./ApiResponse";
import jwt from "jsonwebtoken";

export const sendError = (res: Response, error: any) => {
  if (error instanceof ApiError) {
    console.error(error);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, null, error.message));
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid access token"));
  }

  if (error instanceof jwt.TokenExpiredError) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Access token expired"));
  }

  console.error(error);
  return res
    .status(500)
    .json(new ApiResponse(500, null, "Internal Server Error"));
};
