// src/telemetry/telemetry.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import axios from 'axios';
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

  async afterInit(server: Server) {
    console.log('BrakeTest: WebSocket Gateway inicializado');
    const sessionKey = this.configService.get<string>('SESSION_KEY');

    await this.startGridSimulation(sessionKey!);

    // this.startSimulation();
  }

  async handleStartEvent(sessionKey: string) {
    const start = await this.telemetryService.getSessionStart(sessionKey);

    const data = await this.telemetryService.getDrivers(sessionKey);

    this.server.emit('data', data);
  }

  async startGridSimulation(sessionKey: string) {
    const drivers: number[] =
      await this.telemetryService.getDrivers(sessionKey);
    const currentTime = await this.telemetryService.getSessionStart(sessionKey);
    if (!currentTime) {
      throw new Error('Current session time not found');
    }
    setInterval(() => {
      const gridSnapshot = this.telemetryService.getAllDriversData(
        sessionKey,
        currentTime.toString(),
        drivers,
      );
      this.server.emit('grid_update', gridSnapshot);
      console.log(gridSnapshot);
      currentTime.setSeconds(currentTime.getSeconds() + 1);
    }, 1000);
  }

  //   async startSimulation(start: string) {
  //     const apiUrl = this.configService.get<string>('OPENF1_URL');
  //     const sessionKey = this.configService.get<string>('SESSION_KEY');
  //     const url = `${apiUrl}/car_data?driver_number=44&session_key=${sessionKey}`;
  //     let i = 0;
  //     try {
  //       const response = await axios.get(url);
  //       const data = response.data;

  //       await this.telemetryService.getSessionStart(sessionKey!);

  //       setInterval(() => {
  //         if (i < data.length) {
  //           this.server.emit('telemetry_update', data[i]);
  //           console.log('hola');
  //           console.log(`Emiting: ${data[i].speed} km/h - RPM: ${data[i].rpm}`);
  //           i++;
  //         } else {
  //           i = 0;
  //         }
  //       }, 200);
  //     } catch (error) {
  //       console.error('Error conectando con OpenF1', error.message);
  //     }
  //   }
}
