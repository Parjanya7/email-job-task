import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { StatsModule } from './stats/stats.module';
@Module({
  imports: [EmailModule, StatsModule],
})
export class AppModule {}
