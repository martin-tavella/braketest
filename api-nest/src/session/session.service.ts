import { Injectable } from '@nestjs/common';
import api from 'src/config/api.config';

@Injectable()
export class SessionService {
  async getSession(year: number, gp: string) {
    try {
      const response = await api.get(`/session-info/${year}/${gp}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        'An error occurred while calling the Python API:',
        error.message,
      );
      return [];
    }
  }
}
