import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Payload } from '@nestjs/microservices';
import { EmailJob } from 'src/interfaces/email-job.interface';
import { KafkaTopics, microserviceStatsConfig, mockedSending } from '../const';

@Injectable()
export class SenderService {
  @Client(microserviceStatsConfig)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KafkaTopics.sendStats);

    await this.client.connect();
  }

  async sendEmail(@Payload() job: EmailJob) {
    const { amount, id } = job;
    for (let counter = 1; counter <= +amount; counter++) {
      const emailCountOrder = await mockedSending(counter);
      this.client
        .send(KafkaTopics.sendStats, {
          jobId: id,
          timestamp: Date.now(),
          amount,
          status: `${emailCountOrder} of ${amount}`,
        })
        .subscribe(() => console.log(`Sended ${emailCountOrder} of ${amount}`));
    }
  }
}
