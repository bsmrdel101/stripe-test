import { attachRoutes } from "./attach-routes.js";
import cors from 'cors';

/**
 * 
 * @param {import("express").Application} app
 */
export function configureServer(app) {
  app.use(cors({
    origin: ['http://localhost:3001','http://localhost:8001', 'https://checkout.stripe.com'],
    credentials: true
  }));
  attachRoutes(app);
}
