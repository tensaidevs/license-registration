// import type { Request, Response } from "express";
// import { ApiError } from "@/utils/ApiError";
// import { asyncHandler } from "@/utils/asyncHandler";
// import { uploadOnCloudinary } from "@/utils/cloudinary";
// import { ApiResponse } from "@/utils/ApiResponse";
// import { db } from "@/drizzle/db";
// import { AllFilesTable } from "@/drizzle/schema";
// import { AllFilesWithAudit } from "@/types";
// import { sendError } from "@/utils/sendError";

// // Upload Customer Identification Images
// const uploadCustomerIdentificationImages = asyncHandler(
//   async (req: Request, res: Response) => {
//     try {
//       if (!req.file) {
//         throw new ApiError(400, "No file provided");
//       }

//       const { path } = req.file;

//       const uploadResponse = await uploadOnCloudinary(path);

//       const fileData = {
//         url: uploadResponse.url,
//         name: uploadResponse.original_filename,
//         type: uploadResponse.resource_type,
//         size: uploadResponse.bytes,
//         cloudinaryPublicId: uploadResponse.public_id,
//       };

//       // Get the current timestamp for createdAt
//       const createdAt: string = new Date().toISOString();

//       const savedFile: AllFilesWithAudit[] = await db
//         .insert(AllFilesTable)
//         .values({ ...fileData, createdAt })
//         .returning({
//           id: AllFilesTable.id,
//           url: AllFilesTable.url,
//           name: AllFilesTable.name,
//           type: AllFilesTable.type,
//           size: AllFilesTable.size,
//         });

//       return res
//         .status(201)
//         .json(
//           new ApiResponse(
//             201,
//             savedFile,
//             "Customer Identification image uploaded successfully",
//           ),
//         );
//     } catch (error) {
//       sendError(res, error);
//     }
//   },
// );

// export { uploadCustomerIdentificationImages };
