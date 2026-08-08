import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";

function ContactPage() {
  const contactDetails = [
    {
      title: "Phone",
      value: "+91 9075137505",
      href: "tel:+919075137505"
    },
    {
      title: "Email",
      value: "MysticVeda@outlook.com",
      href: "mailto:MysticVeda@outlook.com"
    },
    {
      title: "Website",
      value: "mysticvedaholisticstudio.netlify.app",
      href: "https://mysticvedaholisticstudio.netlify.app"
    }
  ];

  return (
    <section className="section-shell py-16 md:py-20">
      <SEO
        title="Contact MysticVeda Holistic Studio"
        description="Contact MysticVeda Holistic Studio to book a session, ask a question, or arrange an online consultation."
        path="/contact"
        keywords="contact mysticveda, book tarot session, book energy healing, holistic studio contact"
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="glass-panel rounded-[36px] p-8 shadow-aura md:p-10">
          <SectionHeading
            eyebrow="Contact"
            title="Book a calm, private consultation"
            description="Whether you are seeking clarity, healing, or a deeper sense of direction, the studio is here to welcome you with warmth and professionalism."
            align="left"
          />

          <div className="mt-8 space-y-4">
            {contactDetails.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-[24px] border border-mystic-plum/10 bg-white/80 px-5 py-4 transition hover:border-mystic-gold/40"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-mystic-plum">{item.value}</p>
                </div>
                <span className="text-sm font-semibold text-mystic-plum">→</span>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/919075137505" target="_blank" rel="noreferrer" className="primary-button">
              WhatsApp Now
            </a>
          </div>
        </div>

        <div className="glass-panel rounded-[36px] p-8 shadow-card md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">Business Hours</p>
          <h3 className="mt-3 font-display text-3xl text-mystic-plum">Available for online sessions worldwide</h3>
          <div className="mt-6 space-y-4 text-sm leading-7 text-mystic-plum/75">
            <p>Monday to Friday: 10:00 AM to 6:00 PM</p>
            <p>Saturday: By appointment</p>
            <p>Sunday: By appointment</p>
            <p>Flexible session times available for international clients.</p>
          </div>
          <Link to="/services" className="mt-8 inline-flex text-sm font-semibold text-mystic-plum underline decoration-mystic-gold/40 underline-offset-4">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
