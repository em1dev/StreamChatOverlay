import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const connectionString = process.env['POSTGRESQL_URL'] as string | undefined;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource:  {
    url: connectionString,
  },
});
