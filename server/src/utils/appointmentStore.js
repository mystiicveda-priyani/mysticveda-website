import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Appointment } from "../models/Appointment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../../data/appointments.json");

async function ensureFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

async function readAppointmentsFile() {
  await ensureFile();
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

async function writeAppointmentsFile(appointments) {
  await ensureFile();
  await fs.writeFile(filePath, JSON.stringify(appointments, null, 2), "utf-8");
}

export function createAppointmentStore(useMongo) {
  return {
    async getAll() {
      if (useMongo) {
        return Appointment.find().sort({ createdAt: -1 }).lean();
      }

      const appointments = await readAppointmentsFile();
      return appointments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },

    async getById(id) {
      if (useMongo) {
        return Appointment.findOne({ id }).lean();
      }

      const appointments = await readAppointmentsFile();
      return appointments.find((appointment) => appointment.id === id) || null;
    },

    async findByDateAndTime(date, timeSlot) {
      if (useMongo) {
        return Appointment.findOne({
          date,
          timeSlot,
          requiresMeeting: { $ne: false }
        }).lean();
      }

      const appointments = await readAppointmentsFile();
      return (
        appointments.find(
          (appointment) =>
            appointment.requiresMeeting !== false &&
            appointment.date === date &&
            appointment.timeSlot === timeSlot
        ) || null
      );
    },

    async create(appointment) {
      if (useMongo) {
        const created = await Appointment.create(appointment);
        return created.toObject();
      }

      const appointments = await readAppointmentsFile();
      appointments.unshift(appointment);
      await writeAppointmentsFile(appointments);
      return appointment;
    },

    async update(id, updates) {
      if (useMongo) {
        return Appointment.findOneAndUpdate({ id }, updates, {
          new: true
        }).lean();
      }

      const appointments = await readAppointmentsFile();
      const appointmentIndex = appointments.findIndex(
        (appointment) => appointment.id === id
      );

      if (appointmentIndex === -1) {
        return null;
      }

      appointments[appointmentIndex] = {
        ...appointments[appointmentIndex],
        ...updates
      };

      await writeAppointmentsFile(appointments);
      return appointments[appointmentIndex];
    }
  };
}
