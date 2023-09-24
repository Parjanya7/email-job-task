import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { KafkaTopics, microserviceEmailConfig } from 'src/const';

@Injectable()
export class EmailService {
  @Client(microserviceEmailConfig)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KafkaTopics.sendNewEmail);

    await this.client.connect();
  }
  sendEmail(@Payload() amount: number) {
    const id = randomUUID();
    this.client.emit(KafkaTopics.sendNewEmail, { amount, id });
    return id;
  }
}
