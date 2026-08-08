import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { api } from "../lib/api";

function getLocalToday() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split("T")[0];
}

function BookingPage() {
  const { serviceId } = useParams();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        const servicesData = await api.getServices();
        setServices(servicesData.services);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const customSelection = useMemo(
    () => location.state?.customSelection || [],
    [location.state]
  );

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId),
    [services, serviceId]
  );

  const selectedItems = useMemo(() => {
    if (serviceId === "custom-session") {
      return customSelection;
    }

    if (!selectedService) {
      return [];
    }

    return [
      {
        serviceId: selectedService.id,
        name: selectedService.name,
        duration: selectedService.duration,
        type: selectedService.type,
        price: selectedService.price,
        quantity: 1,
        lineTotal: selectedService.price
      }
    ];
  }, [customSelection, selectedService, serviceId]);

  const totalAmount = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [selectedItems]
  );

  const bookingTitle =
    serviceId === "custom-session" ? "Your custom session" : selectedService?.name;

  if (loading) {
    return (
      <section className="section-shell py-16">
        <div className="h-[420px] animate-pulse rounded-[32px] bg-white/70 shadow-card" />
      </section>
    );
  }

  if (!selectedService && serviceId !== "custom-session") {
    return (
      <section className="section-shell py-16">
        <div className="glass-panel rounded-[32px] p-8 shadow-card">
          <h1 className="font-display text-4xl text-mystic-plum">Service not found</h1>
          <p className="mt-3 text-sm text-mystic-plum/70">The selected service could not be loaded. Please return to the services page and try again.</p>
          <Link to="/services" className="primary-button mt-6">Back to Services</Link>
        </div>
      </section>
    );
  }

  if (serviceId === "custom-session" && selectedItems.length === 0) {
    return (
      <section className="section-shell py-16">
        <div className="glass-panel rounded-[32px] p-8 shadow-card">
          <h1 className="font-display text-4xl text-mystic-plum">Custom session is empty</h1>
          <p className="mt-3 text-sm text-mystic-plum/70">Please select the services you want in your custom package before continuing to booking.</p>
          <Link to="/custom-session" className="primary-button mt-6">Build Custom Session</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-16">
      <SectionHeading
        eyebrow="Booking"
        title="Reserve your session"
        description="Choose your service and click the WhatsApp button to request a booking. Add your preferred date and time in the WhatsApp message."
      />

      <div className="mt-8 grid gap-4 rounded-[32px] border border-mystic-plum/10 bg-white/80 p-4 shadow-card sm:grid-cols-2">
        {[
          "Choose Service",
          "Book via WhatsApp"
        ].map((step, index) => (
          <div key={step} className="rounded-[24px] border border-mystic-plum/10 bg-white/70 p-4 text-center text-sm font-semibold text-mystic-plum">
            <p className="text-[10px] uppercase tracking-[0.35em] text-mystic-gold">Step {index + 1}</p>
            <p className="mt-2">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="glass-panel h-fit rounded-[32px] p-8 shadow-aura">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">{serviceId === "custom-session" ? "Selected Services" : "Selected Service"}</p>
          <h2 className="mt-3 font-display text-4xl text-mystic-plum">{bookingTitle}</h2>
          <div className="mt-6 space-y-4">
            {selectedItems.map((item) => (
              <div key={item.serviceId} className="rounded-[24px] bg-white/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-mystic-plum">{item.name}</p>
                    <p className="mt-1 text-sm text-mystic-plum/55">{item.duration} x {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-mystic-plum">{item.lineTotal}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[24px] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">Package Type</p>
              <p className="mt-2 text-lg font-semibold text-mystic-plum">{serviceId === "custom-session" ? "Customized package" : "Single service"}</p>
            </div>
            <div className="rounded-[24px] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">Total</p>
              <p className="mt-2 text-lg font-semibold text-mystic-plum">{totalAmount}</p>
            </div>
          </div>
        </aside>

        <div className="glass-panel rounded-[32px] p-8 shadow-card">
          <div className="space-y-5">
            <p className="text-sm text-mystic-plum/75">To reserve this session, click the WhatsApp button below. A pre-filled message will open in WhatsApp where you can add your preferred date and time before sending.</p>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            ) : null}

            <a
              href={`https://wa.me/919075137505?text=${encodeURIComponent(`Hi MysticVeda, I'd like to book ${bookingTitle || "a session"}. Preferred date: [preferred date] Preferred time: [preferred time]`)}`}
              target="_blank"
              rel="noreferrer"
              className="primary-button"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
