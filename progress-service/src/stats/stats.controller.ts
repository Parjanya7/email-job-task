import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from 'src/const';
import { EmailStats } from 'src/interfaces/email-stats.interface';
import { StatsService } from '../stats/stats.service';

@Controller('posts')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern(KafkaTopics.sendStats)
  getStats(@Payload() stats: { value: EmailStats }) {
    const { value } = stats;
    return this.statsService.getStats(value);
  }
}
