import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  real,
  integer,
  boolean,
  PgInteger,
  jsonb,
} from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  isImportant: boolean("is_important").default(false),
  replyMessage: text("reply_message"),
  repliedAt: timestamp("replied_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactReplies = pgTable("contact_replies", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").references(() => contacts.id).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  sentBy: varchar("sent_by", { length: 255 }).default("Admin"),
  createdAt: timestamp("created_at").defaultNow(),
});


export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  avatar: varchar("avatar", { length: 500 }),
  role: varchar("role", { length: 50 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const plants = pgTable("plants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  owner: varchar("owner", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  capacityKw: integer("capacity_kw"),
  status: varchar("status", { length: 50 }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),
  plantId: integer("plant_id").references(() => plants.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }),
});

export const sensorData = pgTable("sensor_data", {
  id: serial("id").primaryKey(),
  machineId: integer("machine_id").references(() => machines.id),
  temperature: real("temperature"),
  pressure: real("pressure"),
  flowRate: real("flow_rate"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  shortName: varchar("short_name", { length: 255 }).notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  
  // NEW: Helps frontend distinguish between "Core Solutions" and "Equipment"
  productType: varchar("product_type", { length: 50 }).default('solution').notNull(), 
  
  features: jsonb("features").$type<string[]>().default([]).notNull(),
  specs: jsonb("specs").$type<{label: string, value: string}[]>(),
  applications: jsonb("applications").$type<string[]>(),
  
  image: varchar("image", { length: 255 }),
  brand: varchar("brand", { length: 255 }),
  brandOrigin: varchar("brand_origin", { length: 255 }),
  category: varchar("category", { length: 100 }).notNull(),
  
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});