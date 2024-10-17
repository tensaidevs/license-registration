import pg from "pg";
import { type NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import dotenv from "dotenv";
import { getDatabaseUrl } from "@/utils/getDatabaseUrl";

dotenv.config();

// Select the appropriate database URL based on the environment
const ENV = process.env.NODE_ENV as string;

const DATABASE_URL = getDatabaseUrl(ENV);
const pool = new pg.Pool({
  connectionString: DATABASE_URL as string,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

export { db };
