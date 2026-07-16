import LegalPage from "./LegalPage";

const content = [
  "By using this website and booking a session with MysticVeda Holistic Studio, you agree to engage with the services in a respectful, lawful, and ethical manner.",
  "All services provided are offered for personal insight, wellness support, or spiritual guidance and are not intended to replace medical, legal, financial, or emergency advice.",
  "MysticVeda Holistic Studio reserves the right to update these terms at any time and may adjust offerings or policies in accordance with client needs and operational requirements."
];

function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The terms and conditions for using the MysticVeda Holistic Studio website and services."
      content={content}
    />
  );
}

export default TermsPage;
