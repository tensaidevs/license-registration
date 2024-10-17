import { db } from "@/drizzle/db";
import { UserRoleTable, UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getUserRole = async (userId: string): Promise<string> => {
  const [currentUser] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, userId));

  const [userRole] = await db
    .select()
    .from(UserRoleTable)
    .where(eq(UserRoleTable.id, currentUser?.roleId));

  return userRole?.publicId as string;
};
