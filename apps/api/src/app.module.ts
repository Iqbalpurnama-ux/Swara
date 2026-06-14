import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoogleCloudModule } from './google-cloud/google-cloud.module';
import { SttModule } from './stt/stt.module';
import { TtsModule } from './tts/tts.module';

@Module({
  imports: [AuthModule, GoogleCloudModule, SttModule, TtsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
