// src/telemetry/telemetry.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from './telemetry.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class TelemetryGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  constructor(
    private configService: ConfigService,
    private telemetryService: TelemetryService,
  ) {}

  async afterInit() {
    console.log('BrakeTest: WebSocket Gateway inicializado');

    // const telemetryArray = await this.telemetryService.getFastF1Data(
    //   2025,
    //   'Austria',
    //   'LEC',
    // );

    // if (telemetryArray.length === 0) {
    //   this.server.emit('error', 'No se pudieron cargar datos de F1');
    //   return;
    // }

    // let index = 0;
    // const interval = setInterval(() => {
    //   if (index < telemetryArray.length) {
    //     this.server.emit('telemetry_update', telemetryArray[index]);
    //     console.log(
    //       `Emiting: ${Math.ceil(telemetryArray[index].Speed)} km/h - RPM: ${Math.ceil(telemetryArray[index].RPM)}`,
    //     );
    //     index++;
    //   } else {
    //     clearInterval(interval);
    //     console.log('Simulación finalizada');
    //   }
    // }, 100);
  }
}
