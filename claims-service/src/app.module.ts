import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimsModule } from './claims/claims.module';
import { PrismaService } from './prisma/prisma.service';
//this is mandatory to get the .env file read
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ 
    isGlobal: true,
    envFilePath: [
        `.env.${process.env.NODE_ENV}`, // environment-specific file
        `.env`,                        // fallback (optional)
    ],
  }), 
    LoggerModule.forRoot({
    pinoHttp: {
      level: process.env.LOG_LEVEL || 'info',
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true,
              },
            }
          : undefined,
    },
  }),
  ClaimsModule
],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
