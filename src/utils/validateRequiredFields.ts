import { ApiError } from "./ApiError";

// utils/validateRequiredFields.ts
export const validateRequiredFields = (fields: Record<string, any>): void => {
  const missingFields = Object.entries(fields)
    .filter(
      ([_, value]) => value === undefined || value === null || value === "",
    )
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new ApiError(
      400,
      `Following fields are required: ${missingFields.join(", ")}`,
    );
  }
};
