import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmailStats } from 'src/intefaces/email-stats.interface.ts';
import { NotifierGateway } from '../notifier.gateway';

@Injectable()
export class StatsService {
  constructor(private readonly socketGetaway: NotifierGateway) {}

  getStats(@Payload() stats: EmailStats) {
    return this.socketGetaway.handleMessage(stats);
  }
}
