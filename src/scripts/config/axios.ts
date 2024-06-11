import axios from 'axios';

const baseURL = window.location.origin;
const api = axios.create({
  baseURL,
});

export default api;
