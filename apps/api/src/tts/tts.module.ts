import { Module } from '@nestjs/common';
import { TtsController } from './tts.controller';
import { GoogleCloudModule } from '../google-cloud/google-cloud.module';

@Module({
  imports: [GoogleCloudModule],
  controllers: [TtsController],
})
export class TtsModule {}
