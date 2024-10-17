import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendError } from "@/utils/sendError";
import { asyncHandler } from "@/utils/asyncHandler";
import { ArmsApplicationTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { validateRequiredFields } from "@/utils/validateRequiredFields";

// armsApplication
const armsApplication = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    fatherName,
    CNICNumber,
    criminalCase,
    applicationfor,
    weaponType,
    cartridges,
    licenseNumber,
    weaponNumber,
    area,
    issueDate,
    expiryDate,
    status,
  } = req.body;

  try {
    // Checking if all required fields are provided
    validateRequiredFields({
      name,
      fatherName,
      CNICNumber,
      criminalCase,
      applicationfor,
      weaponType,
      cartridges,
      licenseNumber,
      weaponNumber,
      area,
      issueDate,
      expiryDate,
      status,
    });

    const createdApplication = await db
      .insert(ArmsApplicationTable)
      .values({
        name,
        fatherName,
        CNICNumber,
        criminalCase,
        applicationfor,
        weaponType,
        cartridges,
        licenseNumber,
        weaponNumber,
        area,
        issueDate,
        expiryDate,
        status,
      })
      .returning({
        name: ArmsApplicationTable.name,
        fatherName: ArmsApplicationTable.fatherName,
        CNICNumber: ArmsApplicationTable.CNICNumber,
        criminalCase: ArmsApplicationTable.criminalCase,
        applicationfor: ArmsApplicationTable.applicationfor,
        weaponType: ArmsApplicationTable.weaponType,
        cartridges: ArmsApplicationTable.cartridges,
        licenseNumber: ArmsApplicationTable.licenseNumber,
        weaponNumber: ArmsApplicationTable.weaponNumber,
        area: ArmsApplicationTable.area,
        issueDate: ArmsApplicationTable.issueDate,
        expiryDate: ArmsApplicationTable.expiryDate,
        status: ArmsApplicationTable.status,
      });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          createdApplication,
          "You are logged in successfully",
        ),
      );
  } catch (error) {
    sendError(res, error);
  }
});

export { armsApplication };
