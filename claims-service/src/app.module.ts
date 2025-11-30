import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimsModule } from './claims/claims.module';
import { PrismaService } from './prisma/prisma.service';
//this is mandatory to get the .env file read
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ClaimsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
