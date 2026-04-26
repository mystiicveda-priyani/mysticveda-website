import { Router } from "express";
import { createAppointmentsController } from "../controllers/appointmentsController.js";

export function createAppointmentsRouter(store) {
  const router = Router();
  const controller = createAppointmentsController(store);

  router.get("/", controller.getAppointments);
  router.get("/:id", controller.getAppointmentById);

  return router;
}
