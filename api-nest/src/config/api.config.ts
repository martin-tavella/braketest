import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: process.env.FASTF1_API_URL ?? 'http://localhost:8000',
});

export default api;
