import { db } from "../db/database";
import { entries } from "../schema/entry";
import { CreateEntry } from "../types/entry";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";

//get all entries service
export async function getEntries() {
  return db.select().from(entries);
}

//get one entry service
export async function getEntry(id: string) {
  const result = await db
    .select()
    .from(entries)
    .where(eq(entries.id, id));

  return result[0];
}

//create one entry service
export async function createEntry(data: CreateEntry) {
  const entry = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  await db.insert(entries).values(entry);

  return entry;
}

//delete service
export async function deleteEntry(id: string) {
  await db.delete(entries).where(eq(entries.id, id));
}

//update service
export async function updateEntry(
  id: string,
  data: Partial<CreateEntry>,
) {
  await db
    .update(entries)
    .set(data)
    .where(eq(entries.id, id));

  return getEntry(id);
}