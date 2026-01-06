import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelemetryService {
  constructor() {}

  private pythonApiUrl = 'http://localhost:8000';

  async getLap1Data(year: number, gp: string) {
    try {
      const response = await axios.get(
        `${this.pythonApiUrl}/telemetry/lap1/${year}/${gp}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error llamando a la API de Python:', error.message);
      return [];
    }
  }
}
