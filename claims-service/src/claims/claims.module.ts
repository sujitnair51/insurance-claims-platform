import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, PrismaService]
})
export class ClaimsModule {}
