import { Module } from '@nestjs/common';
import { SttGateway } from './stt.gateway';
import { GoogleCloudModule } from '../google-cloud/google-cloud.module';

@Module({
  imports: [GoogleCloudModule],
  providers: [SttGateway],
})
export class SttModule {}
