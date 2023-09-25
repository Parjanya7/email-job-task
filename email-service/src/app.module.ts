import { Module } from '@nestjs/common';
import { SenderController } from './sender/sender.controller';
import { SenderService } from './sender/sender.service';

@Module({
  controllers: [SenderController],
  providers: [SenderService],
})
export class AppModule {}
