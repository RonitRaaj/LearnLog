import { Hono } from "hono";

import {
  createEntry,
  deleteEntry,
  getEntries,
  getEntry,
  updateEntry,
} from "../services/entry.service";


const entryRoutes = new Hono();

//get all entries route
entryRoutes.get("/", async (c) => {
  const data = await getEntries();

  return c.json(data);
});

//get one entry route
entryRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");

  return c.json(await getEntry(id));
});

//create one entry route
entryRoutes.post("/", async (c) => {
  const body = await c.req.json();

  const entry = await createEntry(body);

  return c.json(entry, 201);
});

//update one entry route
entryRoutes.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  return c.json(await updateEntry(id, body));
});

//delete one route
entryRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  await deleteEntry(id);

  return c.json({
    success: true,
  });
});


export default entryRoutes;