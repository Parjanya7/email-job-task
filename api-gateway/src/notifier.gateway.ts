import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class NotifierGateway {
  @WebSocketServer()
  server;

  handleMessage(message: any): void {
    this.server.emit('message', JSON.stringify(message));
  }
}
