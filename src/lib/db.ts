import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL?.trim() ?? "";

type GlobalDb = {
  pool?: pg.Pool;
  local?: Promise<PGlite>;
};

const globalDb = globalThis as typeof globalThis & { __chapterwiseDb?: GlobalDb };
globalDb.__chapterwiseDb ??= {};

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (databaseUrl !== "") {
    globalDb.__chapterwiseDb!.pool ??= new pg.Pool({
      connectionString: databaseUrl,
      max: 5,
    });
    return (await globalDb.__chapterwiseDb!.pool.query(text, params)).rows as T[];
  }

  globalDb.__chapterwiseDb!.local ??= startLocal().catch((error: unknown) => {
    globalDb.__chapterwiseDb!.local = undefined;
    throw error;
  });
  return (await (await globalDb.__chapterwiseDb!.local).query<T>(text, params)).rows;
}

async function startLocal(): Promise<PGlite> {
  // Persist across Next.js HMR / route vs RSC module copies in local preview.
  const dataDir = path.join(process.cwd(), ".data", "chapterwise");
  await mkdir(dataDir, { recursive: true });
  const db = new PGlite(dataDir);
  const migrationsDir = path.join(process.cwd(), "migrations");
  const files = (await readdir(migrationsDir).catch(() => []))
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    await db.exec(await readFile(path.join(migrationsDir, file), "utf8"));
  }
  return db;
}
