import { KafkaOptions, Transport } from '@nestjs/microservices';

export const microserviceStatsConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'stats',
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'stats-reciever',
    },
  },
};

export const microserviceEmailConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'email',
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'email',
    },
  },
};

export enum KafkaTopics {
  getStats = 'get.stats',
  sendNewEmail = 'send.new.email',
}
