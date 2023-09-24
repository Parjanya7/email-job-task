import { Module } from '@nestjs/common';
import { NotifierGateway } from 'src/notifier.gateway';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService, NotifierGateway],
})
export class StatsModule {}
