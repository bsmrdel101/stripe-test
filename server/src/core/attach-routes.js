import express from "express";
import alertsRouter from "../controllers/alerts.controller.js";

/**
 * 
 * @param {express.Application} app
 */
export function attachRoutes(app) {
  const router = express.Router();
  router.use("/alerts", alertsRouter);

  app.use("/api", router);

  app.get("/", (_, res) => {
    return res.status(200).json({ text: "Hello world" });
  });
}
