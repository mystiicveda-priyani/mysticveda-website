import { sendWelcomeEmail } from "../utils/email.js";

export function createEmailController() {
  return {
    async sendWelcome(request, response) {
      try {
        const { name, email, userId } = request.body;

        if (!name || !email) {
          return response.status(400).json({
            message: "Name and email are required for welcome email."
          });
        }

        const result = await sendWelcomeEmail({
          id: userId,
          name,
          email
        });

        return response.status(201).json({
          message: "Welcome email logged successfully.",
          emailStatus: result.status
        });
      } catch (error) {
        console.error(error);
        return response.status(500).json({
          message: "Unable to send the welcome email right now."
        });
      }
    }
  };
}
