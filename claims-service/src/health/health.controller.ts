import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Liveness: App is running, not deadlocked.
   */
  @Get('live')
  @HttpCode(HttpStatus.OK)
  live() {
    return { status: 'UP' };
  }

  /**
   * Readiness: All dependencies working (DB, etc.)
   */
  @Get('ready')
  async ready() {
    try {
      // Check Prisma/Postgres connection
      await this.prisma.$queryRaw`SELECT 1`;

      return { status: 'READY' };
    } catch (error) {
      return {
        status: 'NOT_READY',
        message: error?.message || 'DB connection failed',
      };
    }
  }
}
