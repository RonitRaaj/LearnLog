import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
  id: text("id").primaryKey(),

  term: text("term").notNull(),

  meaning: text("meaning").notNull(),

  example: text("example"),

  category: text("category"),

  sourceName: text("source_name"),

  sourceUrl: text("source_url"),

  createdAt: text("created_at").notNull(),
});