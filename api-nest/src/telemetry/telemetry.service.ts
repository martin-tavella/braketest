import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelemetryService {
  constructor() {}

  private pythonApiUrl = 'http://localhost:8000';

  async getFastF1Data(year: number, gp: string, driver: string) {
    try {
      // Llamamos a nuestra propia API de Python
      const response = await axios.get(
        `${this.pythonApiUrl}/telemetry/${year}/${gp}/${driver}`,
      );
      return response.data.data; // Retornamos el array de telemetría
    } catch (error) {
      console.error('Error llamando a la API de Python:', error.message);
      return [];
    }
  }

  // async getSessionStart(sessionKey: string) {
  //   try {
  //     const response = await api.get(`/sessions?session_key=${sessionKey}`);
  //     console.log(response.data[0].date_start);
  //     return new Date(response.data[0].date_start);
  //   } catch (error) {
  //     console.error('Error conectando con OpenF1', error.message);
  //   }
  // }

  // async getDrivers(sessionKey: string) {
  //   const response = await api.get(`/drivers?session_key=${sessionKey}`);
  //   return response.data.map((driver) => driver.driver_number);
  // }

  // async getAllDriversData(
  //   sessionKey: string,
  //   startTime: string,
  //   drivers: number[],
  // ) {
  //   const requests = drivers.map((num) => {
  //     return api.get(
  //       `car_data?driver_number=${num}&session_key=${sessionKey}&date>=${startTime}`,
  //     );
  //   });

  //   const results = Promise.all(requests);

  //   const snapshot = {};
  //   (await results).forEach((res, index) => {
  //     const driverNum = drivers[index];
  //     snapshot[driverNum] = res.data[0];
  //   });
  //   return snapshot;
  // }
}
