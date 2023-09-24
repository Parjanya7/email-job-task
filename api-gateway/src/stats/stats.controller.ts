import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from 'src/const';
import { EmailStats } from 'src/intefaces/email-stats.interface.ts';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern(KafkaTopics.getStats)
  sendEmail(@Payload() message : { value : EmailStats}) {
    const { value } = message;
    return this.statsService.getStats(value);
  }
}
