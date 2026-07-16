import LegalPage from "./LegalPage";

const content = [
  "If you need to cancel or reschedule a session, please contact the studio as soon as possible so arrangements can be made with care and consideration.",
  "Advance notice allows for better scheduling flexibility and helps the studio preserve availability for other clients.",
  "Late cancellations may be subject to review and may affect the availability of future rescheduling options."
];

function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation Policy"
      description="The cancellation and rescheduling guidelines for sessions booked through MysticVeda Holistic Studio."
      content={content}
    />
  );
}

export default CancellationPage;
