// Select the appropriate database URL based on the environment
export function getDatabaseUrl(ENV: string): string {
  let databaseUrl: string | undefined;
  switch (ENV) {
    case "development":
      databaseUrl = process.env.DATABASE_URL_DEV;
      break;
    case "devback":
      databaseUrl = process.env.DATABASE_URL_DEVBACK;
      break;
    case "production":
      databaseUrl = process.env.DATABASE_URL_PROD;
      break;
    default:
      throw new Error(`Unknown environment: ${ENV}`);
  }

  if (!databaseUrl) {
    throw new Error("Database URL is not defined for the current environment");
  }

  return databaseUrl;
}
