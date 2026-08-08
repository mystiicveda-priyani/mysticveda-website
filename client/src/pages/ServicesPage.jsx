import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import { api } from "../lib/api";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await api.getServices();
        setServices(data.services);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const filteredServices = services.filter(
    (s) => s.id !== "numerology-report" && s.id !== "astrology-report"
  );

  const serviceGroups = [
    {
      title: "Guidance",
      description: "For life direction, relationship clarity, career decisions, and confident next steps.",
      services: filteredServices.filter((service) => /tarot|astrology|numerology|clarity|direction|relationship|career/i.test(service.name))
    },
    {
      title: "Healing",
      description: "For emotional release, energetic reset, stress reduction, and inner calm.",
      services: filteredServices.filter((service) => /healing|chakra|energy|balance|stress/i.test(service.name))
    },
    {
      title: "Learning",
      description: "For reflective growth, practical insight, and a deeper connection to your intuition.",
      services: filteredServices.filter((service) => /manifest|coaching|report|course|workshop|meditation/i.test(service.name))
    }
  ];

  return (
    <section className="section-shell py-16 md:py-20">
      <SEO
        title="Astrology, Numerology, Tarot & Healing Services | Mystic Veda"
        description="Explore our online services — astrology readings, numerology reports, tarot guidance, chakra balancing, YPV healing & manifestation coaching."
        path="/services"
        keywords="astrology reading online, numerology report, tarot reading, chakra balancing, YPV healing, energy healing sessions, manifestation coaching"
      />
      <SectionHeading
        eyebrow="Services"
        title="Support that fits your current season of life"
        description="Each offering is designed to help you move from confusion into clarity, from pressure into calm, and from uncertainty into aligned action."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          { title: "Who it is for", text: "Clients seeking calm, thoughtful guidance for real life questions and emotional transitions." },
          { title: "What to expect", text: "Private, respectful sessions that feel grounded, intuitive, and deeply supportive." },
          { title: "How to choose", text: "Select the experience that best matches your current challenge, whether it is clarity, healing, or growth." }
        ].map((item) => (
          <div key={item.title} className="rounded-[28px] border border-mystic-plum/10 bg-white/80 p-6 shadow-card">
            <h3 className="font-display text-2xl text-mystic-plum">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-mystic-plum/70">{item.text}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-[28px] bg-white/70 shadow-card"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mt-12 rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <div className="mt-12 space-y-10">
          {serviceGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">{group.title}</p>
                  <h3 className="mt-2 font-display text-3xl text-mystic-plum">{group.title}</h3>
                </div>
                <p className="max-w-xl text-sm leading-7 text-mystic-plum/70">{group.description}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {group.services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-[30px] border border-mystic-plum/10 bg-white/80 p-8 shadow-card">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">Next step</p>
                <h3 className="mt-2 font-display text-3xl text-mystic-plum">Ready to begin?</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-mystic-plum/70">
                  Reach out for a personalised recommendation or book a session that feels right for your current chapter.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="primary-button">Book a Session</Link>
                <Link to="/about" className="secondary-button">Learn the approach</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ServicesPage;
