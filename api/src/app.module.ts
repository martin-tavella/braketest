import { Module } from '@nestjs/common';
import { TelemetryGateway } from './telemetry/telemetry.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [TelemetryGateway],
})
export class AppModule {}
