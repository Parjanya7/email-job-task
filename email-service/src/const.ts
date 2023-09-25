import { KafkaOptions, Transport } from '@nestjs/microservices';

export const mockedSending = (emailIndex) =>
  new Promise((res, rej) => {
    console.log('Promise pending .... ');
    setTimeout(() => res(emailIndex), 1000);
  });

export enum KafkaTopics {
  sendStats = 'send.email.stats',
  sendNewEmail = 'send.new.email',
}

export const microserviceEmailConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'email',
    },
  },
};

export const microserviceStatsConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'stats',
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'stats',
    },
  },
};
