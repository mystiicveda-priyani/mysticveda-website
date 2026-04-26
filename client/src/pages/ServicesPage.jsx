import { useEffect, useState } from "react";
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

  return (
    <section className="section-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="Services"
        title="Choose the experience that meets you where you are"
        description="All sessions are intentionally paced, warmly guided, and designed to support clarity and energetic balance."
      />

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
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ServicesPage;
