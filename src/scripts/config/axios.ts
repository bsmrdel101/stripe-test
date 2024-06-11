import axios from 'axios';

const baseURL = 'http://localhost:8001';
const api = axios.create({
  baseURL,
});

export default api;
