import { Global, Module, Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas/schemas';

const databaseProvider: Provider = {
  provide: 'db',
  useFactory: () => {
    const client = new Pool({
      connectionString: process.env.DB_URL!,
    });

    return drizzle(client, { schema });
  },
};

@Global()
@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
