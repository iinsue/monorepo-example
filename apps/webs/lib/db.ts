import { createDbClient } from "@mono/database";

// Next.js Server Components / Route Handlers 에서 사용
export const db = createDbClient(process.env.DATABASE_URL!);
