import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import "./db/init";
import entryRoutes from "./routes/entries";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({
    message: "LearnLog API is running 🚀",
  });
});

app.route("/entries", entryRoutes);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server running on http://localhost:3000");