import LegalPage from "./LegalPage";

const content = [
  "Tarot guidance is intended for personal insight and self-reflection. It is not medical, legal, financial, or psychological advice.",
  "YPV Energy Healing is a complementary wellness practice and is not a substitute for medical diagnosis, treatment, or professional healthcare. Individual results may vary.",
  "Counselling services support emotional well-being and personal growth. If you are experiencing a mental health emergency, please seek immediate assistance from local emergency services or a qualified healthcare provider."
];

function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Important information about the scope and limitations of the services offered through MysticVeda Holistic Studio."
      content={content}
    />
  );
}

export default DisclaimerPage;
