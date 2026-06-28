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
    try {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        this.logger.log('Initializing GCP Clients using environment variable');
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        this.speechClient = new speech.SpeechClient({ credentials });
        this.ttsClient = new textToSpeech.TextToSpeechClient({ credentials });
      } else {
        const keyFilename = path.resolve(process.cwd(), 'gcp-key.json');
        this.logger.log(`Initializing GCP Clients using key: ${keyFilename}`);
        this.speechClient = new speech.SpeechClient({ keyFilename });
        this.ttsClient = new textToSpeech.TextToSpeechClient({ keyFilename });
      }
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
