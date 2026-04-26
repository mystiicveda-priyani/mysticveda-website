import { services } from "../data/services.js";

export function getServices(_request, response) {
  response.json({ services });
}
