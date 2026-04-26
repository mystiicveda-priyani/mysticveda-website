import { google } from "googleapis";

function parseDurationMinutes(durationLabel) {
  const match = /(\d+)/.exec(durationLabel || "");
  return match ? Number(match[1]) : 0;
}

function getLiveDurationMinutes(serviceItems = []) {
  const totalMinutes = serviceItems.reduce((sum, item) => {
    if (item.type !== "live") {
      return sum;
    }

    return sum + parseDurationMinutes(item.duration) * (item.quantity || 1);
  }, 0);

  return totalMinutes || 60;
}

function getTimeParts(timeSlot) {
  const [time, meridiem] = timeSlot.split(" ");
  const [hourLabel, minuteLabel] = time.split(":");
  let hour = Number(hourLabel);
  const minute = Number(minuteLabel);

  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  }

  if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  return { hour, minute };
}

function buildDateTime(date, timeSlot, durationMinutes) {
  const utcOffset = process.env.CALENDAR_UTC_OFFSET || "+05:30";
  const { hour, minute } = getTimeParts(timeSlot);
  const offsetMinutes = getOffsetMinutes(utcOffset);
  const [year, month, day] = date.split("-").map(Number);
  const startUtcMs =
    Date.UTC(year, month - 1, day, hour, minute, 0, 0) -
    offsetMinutes * 60 * 1000;
  const startDate = new Date(startUtcMs);

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  return {
    startIso: toOffsetIso(date, hour, minute, utcOffset),
    endIso: toOffsetIsoFromDate(endDate, utcOffset)
  };
}

function toOffsetIso(date, hour, minute, utcOffset) {
  const paddedHour = String(hour).padStart(2, "0");
  const paddedMinute = String(minute).padStart(2, "0");
  return `${date}T${paddedHour}:${paddedMinute}:00${utcOffset}`;
}

function toOffsetIsoFromDate(date, utcOffset) {
  const offsetMinutes = getOffsetMinutes(utcOffset);
  const localDate = new Date(date.getTime() + offsetMinutes * 60 * 1000);
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const hour = String(localDate.getUTCHours()).padStart(2, "0");
  const minute = String(localDate.getUTCMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}:00${utcOffset}`;
}

function getOffsetMinutes(utcOffset) {
  const sign = utcOffset.startsWith("-") ? -1 : 1;
  const [hours, minutes] = utcOffset.slice(1).split(":").map(Number);
  return sign * (hours * 60 + minutes);
}

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

export async function generateMeetingDetails(appointment) {
  const oauth2Client = getOAuthClient();

  if (!oauth2Client) {
    return {
      meetingLink: `https://meet.mysticveda.com/session/${appointment.id}`,
      provider: "fallback"
    };
  }

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const durationMinutes = getLiveDurationMinutes(appointment.serviceItems);
  const timeZone = process.env.CALENDAR_TIME_ZONE || "Asia/Kolkata";
  const calendarId =
    process.env.GOOGLE_CALENDAR_ID || process.env.GMAIL_USER || "primary";
  const { startIso, endIso } = buildDateTime(
    appointment.date,
    appointment.timeSlot,
    durationMinutes
  );
  const serviceSummary = appointment.serviceItems
    .map((item) => `${item.name} x${item.quantity}`)
    .join(", ");

  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "none",
    requestBody: {
      summary: `MysticVeda Session: ${appointment.serviceName}`,
      description: [
        `Client: ${appointment.name}`,
        `Email: ${appointment.email}`,
        `Phone: ${appointment.phone}`,
        `Services: ${serviceSummary}`,
        `Booking ID: ${appointment.id}`
      ].join("\n"),
      start: {
        dateTime: startIso,
        timeZone
      },
      end: {
        dateTime: endIso,
        timeZone
      },
      attendees: [{ email: appointment.email }],
      conferenceData: {
        createRequest: {
          requestId: appointment.id,
          conferenceSolutionKey: {
            type: "hangoutsMeet"
          }
        }
      }
    }
  });

  const meetingLink =
    response.data.hangoutLink ||
    response.data.conferenceData?.entryPoints?.find(
      (entryPoint) => entryPoint.entryPointType === "video"
    )?.uri ||
    response.data.htmlLink ||
    `https://meet.mysticveda.com/session/${appointment.id}`;

  return {
    meetingLink,
    provider: "google-meet",
    eventId: response.data.id || ""
  };
}
