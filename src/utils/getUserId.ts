import jwt, { type JwtPayload } from "jsonwebtoken";
import { ApiError } from "./ApiError";

export const getUserId = (token: string) => {
  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }

  // Checking if access token secret is defined
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Access token secret is not defined");
  }

  // Verifying the access token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

  // If token is verified successfully, decodedToken will have the type of the payload provided when signing the token
  let userId: string | undefined;

  if (typeof decodedToken === "string") {
    userId = decodedToken;
  } else {
    userId = (decodedToken as JwtPayload).userId as string;
  }
  return userId as string;
};
