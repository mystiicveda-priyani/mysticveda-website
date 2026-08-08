export async function generateMeetingDetails(appointment) {
  // Google Calendar integration removed for booking flow.
  // Return an internal meeting link that can be shared with clients.
  return {
    meetingLink: `https://meet.mysticveda.com/session/${appointment.id}`,
    provider: "internal",
    eventId: ""
  };
}
