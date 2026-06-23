import { config } from '../config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../prisma/client/client';


const adapter = new PrismaPg({ connectionString: config.POSTGRESQL_URL });
const prisma = new PrismaClient({ adapter });

export { prisma };
