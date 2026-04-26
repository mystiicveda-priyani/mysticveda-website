import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    requiresMeeting: {
      type: Boolean,
      required: true
    },
    serviceItems: [
      {
        serviceId: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        duration: {
          type: String,
          required: true
        },
        type: {
          type: String,
          enum: ["live", "report"],
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        lineTotal: {
          type: Number,
          required: true
        }
      }
    ],
    serviceId: {
      type: String,
      required: true
    },
    serviceName: {
      type: String,
      required: true
    },
    serviceDuration: {
      type: String,
      required: true
    },
    servicePrice: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      default: "Awaiting Verification"
    },
    bookingStatus: {
      type: String,
      default: "Pending Payment"
    },
    emailStatus: {
      type: String,
      default: "Not Sent"
    },
    paymentReference: {
      type: String,
      default: ""
    },
    meetingLink: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

appointmentSchema.index(
  { date: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { requiresMeeting: true }
  }
);

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
