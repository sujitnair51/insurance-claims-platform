import { Injectable, OnModuleInit } from '@nestjs/common';

// import { PrismaClient }  from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; 
import { PrismaClient } from 'app/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // For Prisma 7 with specific adapters, you might initialize with an adapter
    // const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
    // const connectionString = `${process.env.DATABASE_URL}`
    console.log("url: process.env.DATABASE_URL", process.env.DATABASE_URL)
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    // const prisma = new PrismaClient({ adapter })
     super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}