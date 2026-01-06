import { Module } from '@nestjs/common';
import { TelemetryGateway } from './telemetry/telemetry.gateway';
import { ConfigModule } from '@nestjs/config';
import { TelemetryService } from './telemetry/telemetry.service';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SessionModule,
  ],
  providers: [TelemetryGateway, TelemetryService],
})
export class AppModule {}
