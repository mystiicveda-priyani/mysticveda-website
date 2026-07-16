import LegalPage from "./LegalPage";

const content = [
  "Refunds are evaluated on a case-by-case basis in accordance with the nature of the service, timing of the request, and the specific booking arrangements made.",
  "Sessions that have already been completed or delivered may not be eligible for refund, while bookings cancelled in advance may be considered for review.",
  "For questions about refund eligibility, please contact the studio directly before completing your booking."
];

function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      description="The refund policy for bookings and services offered by MysticVeda Holistic Studio."
      content={content}
    />
  );
}

export default RefundPage;
