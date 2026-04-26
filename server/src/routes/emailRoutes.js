import { Router } from "express";
import { createEmailController } from "../controllers/emailController.js";

export function createEmailRouter() {
  const router = Router();
  const controller = createEmailController();

  router.post("/welcome", controller.sendWelcome);

  return router;
}
