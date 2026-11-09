// apps/api/src/database/database.module.ts

import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDbClient, DatabaseInstance } from '@mono/database';

export const DRIZZLE = Symbol('DRIZZLE');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DatabaseInstance => {
        const connectionString = configService.get<string>('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL is not set');
        }

        return createDbClient(connectionString);
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
