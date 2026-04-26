import { findServiceById } from "../data/services.js";
import { sendBookingConfirmationEmail } from "../utils/email.js";
import { generateMeetingDetails } from "../utils/meeting.js";

const bookingLocks = new Set();

function createAppointmentId() {
  return `mv-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function buildSelectedServices(serviceId, serviceItems = []) {
  if (Array.isArray(serviceItems) && serviceItems.length > 0) {
    const normalizedItems = serviceItems
      .map((item) => {
        const service = findServiceById(item.serviceId);
        const quantity = Number(item.quantity);

        if (!service || !Number.isInteger(quantity) || quantity < 1) {
          return null;
        }

        return {
          serviceId: service.id,
          name: service.name,
          duration: service.duration,
          type: service.type,
          price: service.price,
          quantity,
          lineTotal: service.price * quantity
        };
      })
      .filter(Boolean);

    return normalizedItems;
  }

  const service = findServiceById(serviceId);

  if (!service) {
    return [];
  }

  return [
    {
      serviceId: service.id,
      name: service.name,
      duration: service.duration,
      type: service.type,
      price: service.price,
      quantity: 1,
      lineTotal: service.price
    }
  ];
}

export function createAppointmentsController(store) {
  return {
    async getAppointments(_request, response) {
      try {
        const appointments = await store.getAll();
        response.json({ appointments });
      } catch (error) {
        console.error(error);
        response.status(500).json({
          message: "Unable to load appointments right now."
        });
      }
    },

    async getAppointmentById(request, response) {
      try {
        const appointment = await store.getById(request.params.id);

        if (!appointment) {
          return response.status(404).json({ message: "Appointment not found." });
        }

        return response.json({ appointment });
      } catch (error) {
        console.error(error);
        return response.status(500).json({
          message: "Unable to load the appointment right now."
        });
      }
    },

    async bookAppointment(request, response) {
      try {
        const {
          name,
          email,
          phone,
          date,
          timeSlot,
          serviceId,
          serviceItems
        } = request.body;

        if (!name || !email || !phone || !date) {
          return response
            .status(400)
            .json({ message: "All booking fields are required." });
        }

        const selectedServices = buildSelectedServices(serviceId, serviceItems);

        if (selectedServices.length === 0) {
          return response.status(404).json({
            message: "Please choose at least one valid service."
          });
        }

        const requiresMeeting = selectedServices.some(
          (service) => service.type === "live"
        );
        const normalizedTimeSlot = requiresMeeting
          ? timeSlot
          : "Report Delivery";

        if (requiresMeeting && !normalizedTimeSlot) {
          return response.status(400).json({
            message: "Please choose a time slot for live sessions."
          });
        }

        const slotKey = requiresMeeting ? `${date}-${normalizedTimeSlot}` : null;

        if (slotKey && bookingLocks.has(slotKey)) {
          return response.status(409).json({
            message:
              "Another booking is being processed for that slot right now. Please try again in a moment."
          });
        }

        if (slotKey) {
          bookingLocks.add(slotKey);
        }

        try {
          if (requiresMeeting) {
            const existingAppointment = await store.findByDateAndTime(
              date,
              normalizedTimeSlot
            );
            if (existingAppointment) {
              return response.status(409).json({
                message:
                  "That time slot has already been booked. Please choose a different time."
              });
            }
          }

          const appointmentId = createAppointmentId();
          const now = new Date().toISOString();
          const totalPrice = selectedServices.reduce(
            (sum, item) => sum + item.lineTotal,
            0
          );
          const serviceLabel =
            selectedServices.length === 1 && selectedServices[0].quantity === 1
              ? selectedServices[0].name
              : `Custom Session (${selectedServices.length} services)`;
          const durationLabel =
            selectedServices.length === 1 && selectedServices[0].quantity === 1
              ? selectedServices[0].duration
              : "Customized package";
          const baseAppointment = {
            id: appointmentId,
            name,
            email,
            phone,
            date,
            timeSlot: normalizedTimeSlot,
            requiresMeeting,
            serviceItems: selectedServices,
            serviceId:
              selectedServices.length === 1 && selectedServices[0].quantity === 1
                ? selectedServices[0].serviceId
                : "custom-session",
            serviceName: serviceLabel,
            serviceDuration: durationLabel,
            servicePrice: totalPrice,
            paymentStatus: "Confirmed",
            bookingStatus: requiresMeeting ? "Confirmed" : "Report Scheduled",
            emailStatus: "Pending",
            paymentReference: "",
            meetingLink: "",
            meetingProvider: requiresMeeting ? "pending" : "none",
            calendarEventId: "",
            createdAt: now,
            updatedAt: now
          };
          const meetingDetails = requiresMeeting
            ? await generateMeetingDetails(baseAppointment)
            : {
                meetingLink: "",
                provider: "none",
                eventId: ""
              };
          const appointment = {
            ...baseAppointment,
            meetingLink: meetingDetails.meetingLink,
            meetingProvider: meetingDetails.provider,
            calendarEventId: meetingDetails.eventId
          };

          const createdAppointment = await store.create(appointment);
          const emailResult = await sendBookingConfirmationEmail(createdAppointment);
          const finalizedAppointment = await store.update(createdAppointment.id, {
            emailStatus: emailResult.status,
            updatedAt: new Date().toISOString()
          });

          return response.status(201).json({
            message: "Booking confirmed and email sent.",
            appointment: finalizedAppointment
          });
        } finally {
          if (slotKey) {
            bookingLocks.delete(slotKey);
          }
        }
      } catch (error) {
        console.error(error);
        return response.status(500).json({
          message: "Unable to complete the booking right now."
        });
      }
    }
  };
}
