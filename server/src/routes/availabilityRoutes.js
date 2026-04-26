import { Router } from "express";
import { createAvailabilityController } from "../controllers/availabilityController.js";

export function createAvailabilityRouter(store) {
  const router = Router();
  const controller = createAvailabilityController(store);

  router.get("/", controller.getAvailability);
  router.put("/", controller.updateAvailability);

  return router;
}
