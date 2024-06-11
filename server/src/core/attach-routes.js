import express from "express";
import stripeRouter from "../controllers/stripe.controller.js";

/**
 * 
 * @param {express.Application} app
 */
export function attachRoutes(app) {
  const router = express.Router();
  router.use("/stripe", stripeRouter);

  app.use("/api", router);

  app.get("/", (_, res) => {
    return res.status(200).json({ text: "Hello world" });
  });
}
