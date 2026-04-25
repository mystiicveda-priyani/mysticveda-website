import { promises as fs } from "fs";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../../data/email-log.json");

async function ensureFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
  }
}

async function appendEmailLog(entry) {
  await ensureFile();

  const content = await fs.readFile(filePath, "utf-8");
  const entries = JSON.parse(content);
  entries.push(entry);
  await fs.writeFile(filePath, JSON.stringify(entries, null, 2), "utf-8");
}

function getTransportConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
    auth: {
      user,
      pass
    }
  };
}

async function deliverEmail({ to, subject, text, html, logEntry }) {
  const transportConfig = getTransportConfig();

  if (!transportConfig) {
    await appendEmailLog({
      ...logEntry,
      delivery: "logged-fallback"
    });

    return {
      status: "Sent (logged fallback)"
    };
  }

  const transporter = nodemailer.createTransport(transportConfig);
  const fromAddress =
    process.env.SMTP_FROM || process.env.SMTP_USER || "mystiicveda@gmail.com";

  await transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    text,
    html
  });

  await appendEmailLog({
    ...logEntry,
    delivery: "smtp"
  });

  return {
    status: "Sent (smtp)"
  };
}

export async function sendBookingConfirmationEmail(appointment) {
  const subject = `MysticVeda Booking Confirmed: ${appointment.serviceName}`;
  const requiresMeeting = appointment.requiresMeeting !== false;
  const serviceSummary = appointment.serviceItems
    .map((item) => `${item.name} x${item.quantity}`)
    .join(", ");
  const text = requiresMeeting
    ? [
        `Hello ${appointment.name},`,
        "",
        `Your MysticVeda booking is confirmed.`,
        `Session: ${appointment.serviceName}`,
        `Services: ${serviceSummary}`,
        `Date: ${appointment.date}`,
        `Time: ${appointment.timeSlot}`,
        `Phone: ${appointment.phone}`,
        `Meeting link: ${appointment.meetingLink}`
      ].join("\n")
    : [
        `Hello ${appointment.name},`,
        "",
        `Your MysticVeda booking is confirmed.`,
        `Session: ${appointment.serviceName}`,
        `Services: ${serviceSummary}`,
        `Preferred date: ${appointment.date}`,
        `Phone: ${appointment.phone}`,
        "This is a report booking, so no meeting link is required."
      ].join("\n");
  const html = requiresMeeting
    ? `<p>Hello ${appointment.name},</p><p>Your MysticVeda booking is confirmed.</p><p><strong>Session:</strong> ${appointment.serviceName}<br /><strong>Services:</strong> ${serviceSummary}<br /><strong>Date:</strong> ${appointment.date}<br /><strong>Time:</strong> ${appointment.timeSlot}<br /><strong>Phone:</strong> ${appointment.phone}</p><p><strong>Google Meet link:</strong><br /><a href="${appointment.meetingLink}">${appointment.meetingLink}</a></p>`
    : `<p>Hello ${appointment.name},</p><p>Your MysticVeda booking is confirmed.</p><p><strong>Session:</strong> ${appointment.serviceName}<br /><strong>Services:</strong> ${serviceSummary}<br /><strong>Preferred date:</strong> ${appointment.date}<br /><strong>Phone:</strong> ${appointment.phone}</p><p>This is a report booking, so no meeting link is required.</p>`;

  return deliverEmail({
    to: appointment.email,
    subject,
    text,
    html,
    logEntry: {
      appointmentId: appointment.id,
      to: appointment.email,
      subject,
      sentAt: new Date().toISOString(),
      meetingLink: appointment.meetingLink || "",
      type: requiresMeeting ? "live-session" : "report-delivery",
      template: "booking-confirmation"
    }
  });
}

export async function sendWelcomeEmail(user) {
  const subject = "Welcome to MysticVeda Holistic Studio";
  const text = `Hello ${user.name}, welcome to MysticVeda Holistic Studio. Your account is ready and you can now explore services, reserve your session, and begin your healing journey with us.`;
  const html = `<p>Hello ${user.name},</p><p>Welcome to <strong>MysticVeda Holistic Studio</strong>.</p><p>Your account is ready and you can now explore services, reserve your session, and begin your healing journey with us.</p>`;

  return deliverEmail({
    to: user.email,
    subject,
    text,
    html,
    logEntry: {
      userId: user.id || "",
      to: user.email,
      subject,
      sentAt: new Date().toISOString(),
      meetingLink: "",
      type: "welcome",
      template: "welcome-email",
      recipientName: user.name
    }
  });
}
