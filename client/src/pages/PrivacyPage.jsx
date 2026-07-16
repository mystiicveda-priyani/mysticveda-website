import LegalPage from "./LegalPage";

const content = [
  "MysticVeda Holistic Studio respects your privacy and is committed to protecting the personal information you share when booking a session or contacting the studio.",
  "We collect only the information necessary to provide your requested services, communicate with you about bookings, and maintain a secure client experience.",
  "Any information provided will be handled with care and will not be shared with third parties except where required to deliver the service or comply with applicable legal obligations."
];

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How MysticVeda Holistic Studio handles personal information and your privacy preferences."
      content={content}
    />
  );
}

export default PrivacyPage;
