import { Module } from '@nestjs/common';
import { TelemetryGateway } from './telemetry/telemetry.gateway';
import { ConfigModule } from '@nestjs/config';
import { TelemetryService } from './telemetry/telemetry.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [TelemetryGateway, TelemetryService],
})
export class AppModule {}
