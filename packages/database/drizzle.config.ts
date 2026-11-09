import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as path from "path";

// 외부(dotenv-cli, 배포 환경 등)에서 이미 주입된 상태가 아닐 때만 루트 .env를 직접 로드
if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(process.cwd(), "../../.env");
  dotenv.config({ path: envPath });
}

export default defineConfig({
  schema: "./src/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
