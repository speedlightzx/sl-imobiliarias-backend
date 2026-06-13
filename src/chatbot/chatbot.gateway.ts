import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { messageDTO } from './dto/message.dto';
import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import * as cookie from 'cookie';

//cors com qualquer origin por se tratar de teste técnico rodando localmente
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
@Injectable()
export class ChatbotGateway {
  constructor(private readonly authService: AuthService) {}

  private processingMessages = new Map<string, boolean>();

  @SubscribeMessage('message')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async handleMessage(
    @MessageBody() dto: messageDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const userProcessingMessage = this.processingMessages.get(client.id);
    if (userProcessingMessage) return;

    this.processingMessages.set(client.id, true);

    try {
      const res = await fetch(
        `${process.env.LLM_MICROSERVICE_URL}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: dto.message }),
        },
      );

      const llmResponse = await res.json();
      client.emit('response', llmResponse.message);
    } catch (e) {
      client.emit(
        'response',
        'Algum erro aconteceu durante a comunicação com a IA. Tente novamente mais tarde.',
      );
      return;
    } finally {
      this.processingMessages.delete(client.id);
    }
  }

  async handleConnection(client: Socket) {
    const cookies = cookie.parse(client.handshake.headers.cookie || '');
    const token = cookies.session_token;

    if (!token || !(await this.authService.isValidToken(token)))
      client.disconnect();
  }
}
