// import type { Request, Response } from "express";
// import { ApiError } from "@/utils/ApiError";
// import { asyncHandler } from "@/utils/asyncHandler";
// import { deletefromCloudinary } from "@/utils/cloudinary";
// import { ApiResponse } from "@/utils/ApiResponse";
// import { db } from "@/drizzle/db";
// import {
//   AllFilesTable,
//   CandidatePersonalDetailTable,
//   UserTable,
// } from "@/drizzle/schema";
// import { eq } from "drizzle-orm";
// import { getUserId } from "@/utils/getUserId";
// import { sendError } from "@/utils/sendError";

// // Delete File
// const deleteFile = asyncHandler(async (req: Request, res: Response) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   const { fileId } = req.params;

//   try {
//     // Checking if token is provided
//     if (!token) {
//       throw new ApiError(401, "Unauthorized Request");
//     }
//     const userId = getUserId(token);
//     if (!userId) {
//       throw new ApiError(401, "Invalid access token");
//     }

//     // Checking if fileId is provided
//     if (!fileId) {
//       throw new ApiError(400, "fileId is required");
//     }

//     // getting candidate details of currently logged in user from db
//     const candidateDetails: any = await db
//       .select()
//       .from(CandidatePersonalDetailTable)
//       .where(eq(CandidatePersonalDetailTable.userId, userId));

//     if (!candidateDetails.length) {
//       throw new ApiError(500, "File could not be deleted");
//     }

//     if (candidateDetails[0].resumeOneId === fileId) {
//       await db
//         .update(CandidatePersonalDetailTable)
//         .set({ resumeOneId: null })
//         .where(eq(CandidatePersonalDetailTable.userId, userId));
//     } else if (candidateDetails[0].resumeTwoId === fileId) {
//       await db
//         .update(CandidatePersonalDetailTable)
//         .set({ resumeTwoId: null })
//         .where(eq(CandidatePersonalDetailTable.userId, userId));
//     } else if (candidateDetails[0].resumeThreeId === fileId) {
//       await db
//         .update(CandidatePersonalDetailTable)
//         .set({ resumeThreeId: null })
//         .where(eq(CandidatePersonalDetailTable.userId, userId));
//     }

//     // Get the current timestamp for deletedAt
//     const deletedAt = new Date().toISOString();

//     // Fetching the File
//     const filesInDB: any = await db
//       .update(AllFilesTable)
//       .set({
//         isDeleted: true,
//         deletedAt,
//       })
//       .where(eq(AllFilesTable.id, fileId))
//       .returning({
//         cloudinaryPublicId: AllFilesTable.cloudinaryPublicId,
//       });

//     // Deleting the file from Cloudinary
//     await deletefromCloudinary(filesInDB[0]?.cloudinaryPublicId);

//     return res
//       .status(200)
//       .json(new ApiResponse(200, "File deleted from cloudinary successfully"));
//   } catch (error) {
//     sendError(res, error);
//   }
// });

// // Delete Avatar
// const deleteAvatar = asyncHandler(async (req: Request, res: Response) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   const { fileId } = req.params;

//   try {
//     // Checking if token is provided
//     if (!token) {
//       throw new ApiError(401, "Unauthorized Request");
//     }
//     const userId = getUserId(token);
//     if (!userId) {
//       throw new ApiError(401, "Invalid access token");
//     }

//     // Checking if fileId is provided
//     if (!fileId) {
//       throw new ApiError(400, "fileId is required");
//     }

//     await db
//       .update(UserTable)
//       .set({ avatarId: null })
//       .where(eq(UserTable.id, userId));

//     // Get the current timestamp for deletedAt
//     const deletedAt = new Date().toISOString();

//     // Fetching the File
//     const filesInDB: any = await db
//       .update(AllFilesTable)
//       .set({
//         isDeleted: true,
//         deletedAt,
//       })
//       .where(eq(AllFilesTable.id, fileId))
//       .returning({
//         cloudinaryPublicId: AllFilesTable.cloudinaryPublicId,
//       });

//     // Deleting the file from Cloudinary
//     await deletefromCloudinary(filesInDB[0]?.cloudinaryPublicId);

//     return res
//       .status(200)
//       .json(
//         new ApiResponse(200, "Avatar deleted from cloudinary successfully"),
//       );
//   } catch (error) {
//     sendError(res, error);
//   }
// });

// export { deleteFile, deleteAvatar };
