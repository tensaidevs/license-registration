import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ========================================================================
// ============================= AUDIT FIELDS =============================

const auditFields_i = {
  createdAt: timestamp("createdAt", {
    mode: "string",
    withTimezone: true,
  }),
  updatedAt: timestamp("updatedAt", {
    mode: "string",
    withTimezone: true,
  }),
};

const auditFields_ii = {
  createdBy: uuid("createdBy").references(() => UserTable.id),
  updatedBy: uuid("updatedBy").references(() => UserTable.id),
  deletedBy: uuid("deletedBy").references(() => UserTable.id),
};

const auditFields_iii = {
  isDeleted: boolean("isDeleted").notNull().default(false),
  ...auditFields_i,
  deletedAt: timestamp("deletedAt", {
    mode: "string",
    withTimezone: true,
  }),
};

const auditFields_iv = {
  isDeleted: boolean("isDeleted").notNull().default(false),
  ...auditFields_i,
  deletedAt: timestamp("deletedAt", {
    mode: "string",
    withTimezone: true,
  }),
  ...auditFields_ii,
};

const auditFields_v = {
  createdAt: timestamp("createdAt", {
    mode: "string",
    withTimezone: true,
  }),
  isDeleted: boolean("isDeleted").notNull().default(false),
  deletedAt: timestamp("deletedAt", {
    mode: "string",
    withTimezone: true,
  }),
};

// ========================================================================
// ========================== ALL UPLOADED FILES ==========================

export const AllFilesTable = pgTable("all_files", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: varchar("url", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  size: integer("size").notNull(),
  cloudinaryPublicId: varchar("cloudinaryPublicId", { length: 255 }),
  ...auditFields_v,
});


// ===========================================================================
// ================================ USER ROLE ================================

export const UserRoleTable = pgTable("user_role", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: varchar("role", { length: 255 }).notNull(),
  publicId: varchar("publicId", { length: 4 }).unique(),
});

// ======================================================================
// ================================ USER ================================

export const UserTable: any = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  roleId: uuid("roleId").references(() => UserRoleTable.id),
  email: varchar("email", { length: 100 }).notNull().unique(),
  username: varchar("username", { length: 18 }),
  password: varchar("password", { length: 64 }),
  firstName: varchar("firstName", { length: 20 }).notNull(),
  middleName: varchar("middleName", { length: 20 }),
  lastName: varchar("lastName", { length: 20 }),
  gender: varchar("gender", { length: 255 }),
  dateOfBirth: varchar("dateOfBirth", { length: 255 }),
  mobileNumber: varchar("mobileNumber", { length: 20 }),
  nationality: varchar("nationality", { length: 255 }),
  identificationType: varchar("identificationType", {
    length: 255,
  }),
  identificationNumber: varchar("identificationNumber", {
    length: 255,
  }),
  address: varchar("address", { length: 255 }),
  location: varchar("location", { length: 255 }),
  isVerified: boolean("isVerified").notNull().default(false),
  isActive: boolean("isActive").notNull().default(true),
  createdBy: varchar("createdBy", { length: 255 }),
  ...auditFields_iii,
});