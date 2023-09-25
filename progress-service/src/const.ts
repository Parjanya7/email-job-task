import { KafkaOptions, Transport } from '@nestjs/microservices';

export enum KafkaTopics {
  sendStats = 'send.email.stats',
  getStats = 'get.stats',
}

export const microserviceStatsRecieverConfig: KafkaOptions = {
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

export const microserviceStatsConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'stats',
    },
  },
};
