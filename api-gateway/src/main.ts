import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceStatsConfig } from './const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice(microserviceStatsConfig);
  await app.startAllMicroservices();
  await app.listen(3100).then(() => {
    console.log(`API Listen to you ...`);
  });
}
bootstrap();
