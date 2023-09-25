import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Payload } from '@nestjs/microservices';
import { KafkaTopics, microserviceStatsRecieverConfig } from 'src/const';
import { EmailStats } from 'src/interfaces/email-stats.interface';

@Injectable()
export class StatsService {
  @Client(microserviceStatsRecieverConfig)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KafkaTopics.getStats);

    await this.client.connect();
  }
  getStats(@Payload() stats: EmailStats) {
    this.client
      .emit(KafkaTopics.getStats, stats)
      .subscribe(() => console.log('Stats sended' + JSON.stringify(stats)));
  }
}
