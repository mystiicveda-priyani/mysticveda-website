import { Link } from "react-router-dom";
import FAQAccordion from "../components/FAQAccordion";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import { studioHighlights } from "../lib/constants";

function HomePage() {
  const socialLinks = [
    { label: "X", href: "https://x.com/mystiicveda" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/mysticveda-holistic-studio-1650343b4/?skipRedirect=true"
    },
    { label: "Instagram", href: "https://www.instagram.com/mysticveda_p/" },
    { label: "Pinterest", href: "https://in.pinterest.com/MysticVedaPriyani/" }
  ];

  return (
    <div>
      <SEO
        title="Online Astrology, Numerology, Tarot & YPV Healing | Mystic Veda"
        description="Get online astrology, numerology, tarot readings & YPV healing. Personalized guidance for clarity, career, relationships & energy healing worldwide."
        path="/"
        keywords="online astrology reading, numerology reading online, tarot reading online, YPV healing, energy healing, chakra balancing, manifestation coaching, mystic veda holistic studio"
      />
      <section className="section-shell grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex rounded-full border border-mystic-gold/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
            Holistic support for modern life
          </p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-mystic-plum md:text-6xl">
            Gentle guidance for clarity, healing, and aligned decisions.
          </h1>
          <p className="mt-3 text-sm font-medium tracking-wide text-mystic-gold">
            Tarot Guidance · YPV Energy Healing · Counselling Psychology
          </p>
          <p className="mt-5 max-w-xl text-lg leading-8 text-mystic-plum/75">
            Experience calm, private, one-to-one sessions designed to help you feel supported, understood, and more connected to your next step.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/services" className="primary-button">
              Book Your Session
            </Link>
            <Link to="/about" className="secondary-button">
              Learn More
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {studioHighlights.map((highlight) => (
              <div key={highlight} className="glass-panel rounded-[24px] p-4 text-sm font-medium text-mystic-plum shadow-card">
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-mystic-gold/20 blur-3xl" />
          <div className="glass-panel relative w-full max-w-md animate-float rounded-[36px] p-8 shadow-aura">
            <div className="rounded-[28px] bg-gradient-to-br from-mystic-plum via-mystic-iris to-[#F4E4B9] p-[1px]">
              <div className="rounded-[28px] bg-white/90 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-mystic-gold">
                  Why clients choose MysticVeda
                </p>
                <h2 className="mt-4 font-display text-4xl text-mystic-plum">
                  Calm, private, and deeply personal support
                </h2>
                <p className="mt-4 text-sm leading-7 text-mystic-plum/75">
                  Every session is created with intention, warmth, and respect for your emotional, spiritual, and personal journey.
                </p>
                <div className="mt-6 rounded-[24px] bg-mystic-lilac/60 p-5">
                  <p className="text-sm font-semibold text-mystic-plum">Includes</p>
                  <ul className="mt-3 space-y-2 text-sm text-mystic-plum/70">
                    <li>Thoughtful preparation before the session</li>
                    <li>Gentle guidance throughout the experience</li>
                    <li>Practical next-step support after the session</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="rounded-[36px] border border-mystic-plum/10 bg-white/70 p-8 shadow-card md:p-10">
          <SectionHeading
            eyebrow="Why Choose MysticVeda"
            title="A safer, calmer path to clarity and support"
            description="The studio combines professional care, compassionate presence, and personalised guidance to help you feel grounded and understood."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Personalized One-to-One Sessions",
              "Confidential & Compassionate Support",
              "Online Sessions Worldwide",
              "Professional & Ethical Practice",
              "Personalized Guidance",
              "A Premium, Calm Client Experience"
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-mystic-plum/10 bg-white/80 p-5 text-sm font-semibold text-mystic-plum">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-shell py-16">
        <SectionHeading
          eyebrow="About"
          title="A soulful space for healing, clarity, and inner alignment"
          description="MysticVeda Holistic Studio was created for people seeking more than just answers. It is a nurturing space where spiritual guidance meets emotional support, helping you reconnect with your energy, trust your intuition, and move forward with greater peace."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-[32px] p-7 shadow-card md:p-8">
            <p className="text-sm leading-8 text-mystic-plum/75">
              At MysticVeda, every offering is designed to support your journey
              in a gentle and meaningful way. Whether you are feeling
              emotionally heavy, spiritually disconnected, curious about your
              life path, or ready to call in a new chapter, each session and
              report is created with intention, compassion, and care.
            </p>
            <p className="mt-5 text-sm leading-8 text-mystic-plum/75">
              Through energy healing, tarot, chakra balancing, manifestation
              coaching, numerology, and astrology, the studio offers both
              intuitive insight and grounded guidance. The purpose is not only
              to reveal what is happening around you, but to help you understand
              what is happening within you.
            </p>
            <p className="mt-5 text-sm leading-8 text-mystic-plum/75">
              This is a space where healing is approached with softness,
              clarity, and deep respect for your personal path. Every client is
              welcomed as they are, with the intention of creating an experience
              that feels safe, uplifting, and spiritually aligned.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                title: "Personalized healing support",
                text: "Every service is offered with individual care so the guidance feels relevant to your emotions, energy, and current life season."
              },
              {
                title: "Insight with spiritual depth",
                text: "From tarot and astrology to numerology and chakra work, each offering is intended to bring awareness, reassurance, and direction."
              },
              {
                title: "A calm and trusted experience",
                text: "From the first click to the final follow-up, the studio is designed to feel peaceful, professional, and deeply supportive."
              }
            ].map((item) => (
              <article
                key={item.title}
                className="glass-panel rounded-[28px] p-6 shadow-card"
              >
                <h3 className="font-display text-3xl text-mystic-plum">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mystic-plum/75">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "For clarity",
              text: "Ideal when you are seeking direction in love, career, purpose, or personal decision-making."
            },
            {
              title: "For healing",
              text: "Supportive for emotional release, energetic balance, and reconnecting with your inner calm."
            },
            {
              title: "For alignment",
              text: "Helpful when you want to understand your spiritual path and take your next steps with confidence."
            }
          ].map((item) => (
            <article
              key={item.title}
              className="glass-panel rounded-[28px] p-6 shadow-card"
            >
              <h3 className="font-display text-3xl text-mystic-plum">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-mystic-plum/75">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Services"
          title="Three core services, each designed with care"
          description="Choose the support that feels most aligned for you right now, whether you are seeking insight, emotional support, or energetic healing."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "☾",
              title: "Tarot Guidance",
              text: "Gain clear, intuitive insight for relationships, career decisions, life direction, and emotional clarity."
            },
            {
              icon: "✦",
              title: "YPV Energy Healing",
              text: "Experience a restorative healing session created to support emotional release, inner balance, and energetic calm."
            },
            {
              icon: "✿",
              title: "Counselling Psychology",
              text: "Receive compassionate support for emotional well-being, reflective processing, and grounded personal growth."
            }
          ].map((item) => (
            <article
              key={item.title}
              className="glass-panel flex gap-5 rounded-[28px] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-aura"
            >
              <span className="text-4xl leading-none">{item.icon}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-mystic-plum">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-mystic-plum/75">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/services" className="primary-button">
            Book Your Session
          </Link>
        </div>
      </section>

      <section className="section-shell py-16">
        <TestimonialsCarousel />
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[32px] p-8 shadow-card md:p-10">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions before you begin?"
              description="A few answers to help you feel informed and comfortable before booking."
              align="left"
            />
            <div className="mt-8">
              <FAQAccordion />
            </div>
          </div>
          <div className="glass-panel rounded-[32px] p-8 shadow-aura md:p-10">
            <SectionHeading
              eyebrow="Contact"
              title="Ready to begin your healing journey?"
              description="Reach out for questions, private guidance, or to reserve your preferred time."
              align="left"
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                Email
              </p>
              <p className="mt-3 text-sm text-mystic-plum">
                MysticVeda@outlook.com
              </p>
            </div>
            <div className="rounded-[24px] bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                WhatsApp
              </p>
              <p className="mt-3 text-sm text-mystic-plum">+91 9075137505</p>
            </div>
            <div className="rounded-[24px] bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                Availability
              </p>
              <p className="mt-3 text-sm text-mystic-plum">
                Online sessions from 10:00 AM to 6:00 PM
              </p>
            </div>
              <div className="rounded-[24px] bg-white/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                  Follow MysticVeda
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-mystic-plum/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-mystic-plum transition hover:border-mystic-gold/40 hover:text-mystic-gold"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/919075137505" target="_blank" rel="noreferrer" className="primary-button">
                WhatsApp
              </a>
              <Link to="/contact" className="secondary-button">
                Contact Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
