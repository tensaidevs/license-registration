import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError";
import dotenv from "dotenv";

dotenv.config();

const ENV = process.env.NODE_ENV as string;

const cloudinaryConfig: {
  [key: string]:
    | { cloud_name: string; api_key: string; api_secret: string }
    | undefined;
} = {
  development: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME_DEV as string,
    api_key: process.env.CLOUDINARY_API_KEY_DEV as string,
    api_secret: process.env.CLOUDINARY_API_SECRET_DEV as string,
  },
  devback: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME_DEV as string,
    api_key: process.env.CLOUDINARY_API_KEY_DEV as string,
    api_secret: process.env.CLOUDINARY_API_SECRET_DEV as string,
  },
  production: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME_PROD as string,
    api_key: process.env.CLOUDINARY_API_KEY_PROD as string,
    api_secret: process.env.CLOUDINARY_API_SECRET_PROD as string,
  },
};

const currentConfig = cloudinaryConfig[ENV];

if (!currentConfig) {
  throw new ApiError(
    500,
    "Cloudinary configuration not found for the current environment",
  );
}

cloudinary.config(currentConfig);

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) {
      throw new ApiError(400, "File path is required");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); // Remove the locally saved file as the upload failed
    throw new ApiError(500, "Internal Server Error");
  }
};

const deletefromCloudinary = async (fileId: string) => {
  try {
    if (!fileId) {
      throw new ApiError(400, "File ID is required");
    }
    const response = await cloudinary.uploader.destroy(fileId, {
      invalidate: true,
    });
    return response;
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

export { uploadOnCloudinary, deletefromCloudinary };
