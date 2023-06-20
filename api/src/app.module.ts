import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [AuthModule, TicketModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
