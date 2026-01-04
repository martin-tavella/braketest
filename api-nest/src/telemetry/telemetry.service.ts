import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelemetryService {
  constructor() {}

  private pythonApiUrl = 'http://localhost:8000';

  async getFastF1Data(year: number, gp: string, driver: string) {
    try {
      const response = await axios.get(
        `${this.pythonApiUrl}/telemetry/${year}/${gp}/${driver}`,
      );
      return response.data.data;
    } catch (error) {
      console.error('Error llamando a la API de Python:', error.message);
      return [];
    }
  }
}
