export function createAvailabilityController(store) {
  return {
    async getAvailability(_request, response) {
      try {
        const slots = await store.getSlots();
        response.json({ slots });
      } catch (error) {
        console.error(error);
        response.status(500).json({
          message: "Unable to load availability right now."
        });
      }
    },

    async updateAvailability(request, response) {
      try {
        const { slots } = request.body;

        if (!Array.isArray(slots) || slots.length === 0) {
          return response.status(400).json({
            message: "Please provide at least one available slot."
          });
        }

        const updatedSlots = await store.saveSlots(slots);
        response.json({ slots: updatedSlots });
      } catch (error) {
        console.error(error);
        response.status(500).json({
          message: "Unable to update availability right now."
        });
      }
    }
  };
}
