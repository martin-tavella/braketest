// src/telemetry/telemetry.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class TelemetryGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  constructor(private configService: ConfigService) {}

  afterInit(server: Server) {
    console.log('BrakeTest: WebSocket Gateway inicializado');
    this.startSimulation();
  }

  async startSimulation() {
    const apiUrl = this.configService.get<string>('OPENF1_URL');
    const sessionKey = this.configService.get<string>('SESSION_KEY');
    const url = `${apiUrl}/car_data?driver_number=44&session_key=${sessionKey}`;
    let i = 0;
    try {
      const response = await axios.get(url);
      const data = response.data;

      setInterval(() => {
        if (i < data.length) {
          this.server.emit('telemetry_update', data[i]);
          console.log('hola');
          console.log(`Emiting: ${data[i].speed} km/h - RPM: ${data[i].rpm}`);
          i++;
        } else {
          i = 0;
        }
      }, 200);
    } catch (error) {
      console.error('Error conectando con OpenF1', error.message);
    }
  }
}
