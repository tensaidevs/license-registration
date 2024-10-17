// import type { Request, Response } from "express";
// import { ApiError } from "@/utils/ApiError";
// import { asyncHandler } from "@/utils/asyncHandler";
// import { uploadOnCloudinary } from "@/utils/cloudinary";
// import { ApiResponse } from "@/utils/ApiResponse";
// import { db } from "@/drizzle/db";
// import {
//   AllFilesTable,
//   CandidatePersonalDetailTable,
//   UserTable,
// } from "@/drizzle/schema";
// import { eq } from "drizzle-orm";
// import { AllFiles } from "@/types";
// import { UploadApiResponse } from "cloudinary";
// import { getUserId } from "@/utils/getUserId";
// import { sendError } from "@/utils/sendError";

// // Upload File
// const uploadFile = asyncHandler(async (req: Request, res: Response) => {
//   const file = req.file;
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   try {
//     // Checking if File is provided
//     if (!file) {
//       throw new ApiError(400, "File is required");
//     }

//     // Checking if token is provided
//     if (!token) {
//       throw new ApiError(401, "Unauthorized Request");
//     }
//     const userId = getUserId(token);
//     if (!userId) {
//       throw new ApiError(401, "Invalid access token");
//     }

//     // Uploading the file to Cloudinary
//     const uploadedFileResponse: UploadApiResponse = await uploadOnCloudinary(
//       file.path,
//     );

//     const fileDetails = {
//       url: uploadedFileResponse.url,
//       name: uploadedFileResponse.original_filename,
//       type: uploadedFileResponse.resource_type,
//       size: uploadedFileResponse.bytes,
//       cloudinaryPublicId: uploadedFileResponse.public_id,
//     };

//     // Get the current timestamp for createdAt
//     const createdAt: string = new Date().toISOString();

//     // Inserting the File using db.insert()
//     const filesInDB: AllFiles[] = await db
//       .insert(AllFilesTable)
//       .values({
//         ...fileDetails,
//         createdAt,
//       })
//       .returning({
//         id: AllFilesTable.id,
//         url: AllFilesTable.url,
//         name: AllFilesTable.name,
//         type: AllFilesTable.type,
//         size: AllFilesTable.size,
//       });

//     if (!file.fieldname) {
//       throw new ApiError(400, "Fieldname for file is required");
//     }

//     if (file?.fieldname === "image") {
//       const avatarIdForUserTable = filesInDB[0]?.id || null;
//       await db
//         .update(UserTable)
//         .set({ avatarId: avatarIdForUserTable })
//         .where(eq(UserTable.id, userId));
//     } else if (file?.fieldname === "file") {
//       const resumeIdforCandidatePersonalDetails = filesInDB[0]?.id;

//       const candidateDetails: any = await db
//         .select()
//         .from(CandidatePersonalDetailTable)
//         .where(eq(CandidatePersonalDetailTable.userId, userId));

//       if (!candidateDetails[0]?.resumeOneId) {
//         await db
//           .update(CandidatePersonalDetailTable)
//           .set({ resumeOneId: resumeIdforCandidatePersonalDetails })
//           .where(eq(CandidatePersonalDetailTable.userId, userId));
//       } else if (
//         candidateDetails[0]?.resumeOneId &&
//         !candidateDetails[0]?.resumeTwoId &&
//         !candidateDetails[0]?.resumeThreeId
//       ) {
//         await db
//           .update(CandidatePersonalDetailTable)
//           .set({ resumeTwoId: resumeIdforCandidatePersonalDetails })
//           .where(eq(CandidatePersonalDetailTable.userId, userId));
//       } else if (
//         candidateDetails[0]?.resumeOneId &&
//         !candidateDetails[0]?.resumeTwoId &&
//         candidateDetails[0]?.resumeThreeId
//       ) {
//         await db
//           .update(CandidatePersonalDetailTable)
//           .set({ resumeTwoId: resumeIdforCandidatePersonalDetails })
//           .where(eq(CandidatePersonalDetailTable.userId, userId));
//       } else if (
//         candidateDetails[0]?.resumeOneId &&
//         candidateDetails[0]?.resumeTwoId &&
//         !candidateDetails[0]?.resumeThreeId
//       ) {
//         await db
//           .update(CandidatePersonalDetailTable)
//           .set({ resumeThreeId: resumeIdforCandidatePersonalDetails })
//           .where(eq(CandidatePersonalDetailTable.userId, userId));
//       } else if (
//         candidateDetails[0]?.resumeOneId &&
//         candidateDetails[0]?.resumeTwoId &&
//         candidateDetails[0]?.resumeThreeId
//       ) {
//         throw new ApiError(400, "Maximum 3 resumes can be uploaded");
//       }
//     }

//     return res
//       .status(201)
//       .json(new ApiResponse(201, filesInDB, "File uploaded successfully"));
//   } catch (error) {
//     sendError(res, error);
//   }
// });

// export { uploadFile };
