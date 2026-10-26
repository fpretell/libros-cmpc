
import "dotenv/config";
import { defineConfig } from "prisma/config";

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
  throw new Error("Faltan variables DB_* para Prisma CLI");
}

// Si Prisma CLI se ejecuta en Ubuntu, usa el puerto publicado por Docker.
// Si se ejecuta dentro de Docker, usa DB_HOST=db y DB_PORT=5432.
const host = DB_HOST === "db" ? "localhost" : DB_HOST;
const port = DB_HOST === "db" ? "5434" : DB_PORT;

const url =
  `postgresql://${encodeURIComponent(DB_USERNAME)}:` +
  `${encodeURIComponent(DB_PASSWORD)}@${host}:${port}/${DB_NAME}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
});
