import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import FAQAccordion from "../components/FAQAccordion";

function FAQPage() {
  return (
    <section className="section-shell py-16 md:py-20">
      <SEO
        title="Frequently Asked Questions | MysticVeda Holistic Studio"
        description="Get answers to common questions about online tarot sessions, energy healing, bookings, and confidentiality at MysticVeda Holistic Studio."
        path="/faq"
        keywords="faq tarot session, energy healing faq, online booking faq, holistic studio questions"
      />
      <div className="glass-panel rounded-[36px] p-8 shadow-card md:p-12">
        <SectionHeading
          eyebrow="FAQ"
          title="Helpful answers before you book"
          description="A gentle overview of the booking experience, session structure, and the kind of support offered through the studio."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
