export function getBaseUrl(): string {
  // BASE_URL based on NODE environment (i.e; development, devback or production)
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.BASE_URL_DEV
      : process.env.NODE_ENV === "devback"
        ? process.env.BASE_URL_DEVBACK
        : process.env.BASE_URL_PROD;

  if (baseUrl === undefined) {
    throw new Error("BASE_URL is not defined for the current environment");
  }

  return baseUrl;
}
