import { Injectable, Logger } from '@nestjs/common';
import * as speech from '@google-cloud/speech';
import * as textToSpeech from '@google-cloud/text-to-speech';
import * as path from 'path';

@Injectable()
export class GoogleCloudService {
  private readonly logger = new Logger(GoogleCloudService.name);
  private speechClient: speech.SpeechClient;
  private ttsClient: textToSpeech.TextToSpeechClient;

  constructor() {
    // Determine the absolute path to the gcp-key.json
    // __dirname is usually dist/google-cloud, so we go up to the project root (apps/api)
    const keyFilename = path.resolve(__dirname, '../../gcp-key.json');

    this.logger.log(`Initializing GCP Clients using key: ${keyFilename}`);

    try {
      this.speechClient = new speech.SpeechClient({ keyFilename });
      this.ttsClient = new textToSpeech.TextToSpeechClient({ keyFilename });
      this.logger.log('Google Cloud Clients initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Google Cloud Clients', error);
    }
  }

  getSpeechClient(): speech.SpeechClient {
    return this.speechClient;
  }

  getTtsClient(): textToSpeech.TextToSpeechClient {
    return this.ttsClient;
  }
}
