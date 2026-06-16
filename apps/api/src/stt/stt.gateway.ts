import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { GoogleCloudService } from '../google-cloud/google-cloud.service';
// import { WsAuthGuard } from '../auth/ws-auth.guard';

// @UseGuards(WsAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*', // In production, restrict this to frontend URL
  },
})
export class SttGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SttGateway.name);
  private recognizeStreams: Map<string, any> = new Map();

  constructor(private readonly googleCloudService: GoogleCloudService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.stopRecognition(client.id);
  }

  @SubscribeMessage('start_recognition')
  handleStartRecognition(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { languageCode?: string; sampleRate?: number },
  ) {
    this.logger.log(`Starting recognition for client ${client.id}`);
    
    // Stop any existing stream
    this.stopRecognition(client.id);

    const speechClient = this.googleCloudService.getSpeechClient();
    
    // Default to Indonesian if not provided
    const languageCode = payload?.languageCode || 'id-ID';
    // Default sample rate for WebM Opus from Chrome is usually 48000
    const sampleRateHertz = payload?.sampleRate || 48000;

    const request = {
      config: {
        encoding: 'WEBM_OPUS' as const,
        sampleRateHertz,
        languageCode,
        enableInterimResults: true,
        enableAutomaticPunctuation: true, // Improved formatting
        model: 'latest_long', // Tries to use the best long-form model
      },
      interimResults: true,
    };

    const recognizeStream = speechClient
      .streamingRecognize(request)
      .on('error', (error) => {
        this.logger.error(`Error from Google Speech API: ${error.message}`);
        client.emit('stt_error', { message: error.message });
      })
      .on('data', (data) => {
        if (data.results[0] && data.results[0].alternatives[0]) {
          const result = data.results[0];
          const transcript = result.alternatives[0].transcript;
          const isFinal = result.isFinal;
          
          client.emit('stt_result', {
            transcript,
            isFinal,
          });
        }
      });

    this.recognizeStreams.set(client.id, recognizeStream);
    client.emit('stt_ready');
  }

  @SubscribeMessage('audio_data')
  handleAudioData(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Buffer,
  ) {
    const recognizeStream = this.recognizeStreams.get(client.id);
    if (recognizeStream) {
      recognizeStream.write(data);
    }
  }

  @SubscribeMessage('stop_recognition')
  handleStopRecognition(@ConnectedSocket() client: Socket) {
    this.logger.log(`Stopping recognition for client ${client.id}`);
    this.stopRecognition(client.id);
    client.emit('stt_stopped');
  }

  private stopRecognition(clientId: string) {
    const recognizeStream = this.recognizeStreams.get(clientId);
    if (recognizeStream) {
      recognizeStream.end();
      this.recognizeStreams.delete(clientId);
    }
  }
}
