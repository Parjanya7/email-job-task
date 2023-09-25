import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from 'src/const';
import { EmailJob } from 'src/interfaces/email-job.interface';
import { SenderService } from './sender.service';

@Controller()
export class SenderController {
  constructor(private emailService: SenderService) {}

  @MessagePattern(KafkaTopics.sendNewEmail)
  sendEmail(@Payload() message: { value: EmailJob }) {
    const { value } = message;
    return this.emailService.sendEmail(value);
  }
}
