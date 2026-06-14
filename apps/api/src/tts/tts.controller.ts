import { Controller, Post, Body, Res, Logger, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { GoogleCloudService } from '../google-cloud/google-cloud.service';

@Controller('tts')
export class TtsController {
  private readonly logger = new Logger(TtsController.name);

  constructor(private readonly googleCloudService: GoogleCloudService) {}

  @Post('synthesize')
  async synthesizeSpeech(
    @Body('text') text: string,
    @Body('languageCode') languageCode: string = 'id-ID',
    @Body('voiceName') voiceName: string = 'id-ID-Wavenet-A', // default to standard Indonesian female voice
    @Body('gender') gender: 'MALE' | 'FEMALE' | 'NEUTRAL' = 'FEMALE',
    @Res() res: Response,
  ) {
    if (!text) {
      throw new HttpException('Text is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const ttsClient = this.googleCloudService.getTtsClient();

      const request = {
        input: { text },
        // Select the language and SSML voice gender (optional)
        voice: { 
          languageCode, 
          name: voiceName,
          ssmlGender: gender as any, 
        },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' as const },
      };

      // Performs the text-to-speech request
      const [response] = await ttsClient.synthesizeSpeech(request);
      
      const audioContent = response.audioContent;
      
      if (!audioContent) {
        throw new HttpException('No audio generated', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Send the audio buffer as response
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioContent.length,
      });

      res.end(audioContent);
    } catch (error) {
      this.logger.error(`Error synthesizing speech: ${error.message}`, error.stack);
      throw new HttpException('Failed to synthesize speech', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
