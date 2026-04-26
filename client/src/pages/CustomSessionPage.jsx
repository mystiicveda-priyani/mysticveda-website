import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { api } from "../lib/api";

function CustomSessionPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});

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

  const selectedItems = useMemo(
    () =>
      services
        .filter((service) => Number(quantities[service.id]) > 0)
        .map((service) => ({
          serviceId: service.id,
          name: service.name,
          duration: service.duration,
          type: service.type,
          price: service.price,
          quantity: Number(quantities[service.id]),
          lineTotal: service.price * Number(quantities[service.id])
        })),
    [services, quantities]
  );

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.lineTotal, 0);

  function updateQuantity(serviceId, nextValue) {
    const safeValue = Math.max(0, Number(nextValue) || 0);
    setQuantities((current) => ({
      ...current,
      [serviceId]: safeValue
    }));
  }

  function handleContinue() {
    if (selectedItems.length === 0) {
      setError("Please add at least one service to build your custom session.");
      return;
    }

    navigate("/book/custom-session", {
      state: {
        customSelection: selectedItems
      }
    });
  }

  return (
    <section className="section-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="Custom Session"
        title="Create your own healing package"
        description="Combine multiple services in one booking. Add the sessions or reports you want, then continue to choose your date and available slot."
      />

      {loading ? (
        <div className="mt-12 h-80 animate-pulse rounded-[32px] bg-white/70 shadow-card" />
      ) : error && services.length === 0 ? (
        <div className="mt-12 rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5">
            {services.map((service) => (
              <article
                key={service.id}
                className="glass-panel rounded-[28px] p-6 shadow-card"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                      {service.duration}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-mystic-plum">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-mystic-plum/75">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex min-w-[160px] flex-col items-start gap-3 sm:items-end">
                    <div className="rounded-full bg-mystic-plum px-4 py-2 text-sm font-semibold text-white">
                      {service.price}
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-mystic-plum/10 bg-white/90 px-3 py-2">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full bg-mystic-lilac text-lg font-semibold text-mystic-plum"
                        onClick={() =>
                          updateQuantity(
                            service.id,
                            Number(quantities[service.id] || 0) - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-mystic-plum">
                        {quantities[service.id] || 0}
                      </span>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full bg-mystic-plum text-lg font-semibold text-white"
                        onClick={() =>
                          updateQuantity(
                            service.id,
                            Number(quantities[service.id] || 0) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="glass-panel h-fit rounded-[32px] p-8 shadow-aura">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
              Your Custom Package
            </p>
            <h2 className="mt-3 font-display text-4xl text-mystic-plum">
              Build your session
            </h2>

            {selectedItems.length === 0 ? (
              <p className="mt-5 text-sm leading-7 text-mystic-plum/70">
                Add one or more services to create a personalized booking.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.serviceId}
                    className="rounded-[24px] bg-white/75 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-mystic-plum">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-mystic-plum/60">
                          {item.duration} x {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-mystic-plum">
                        {item.lineTotal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-[24px] bg-mystic-plum p-5 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Total
              </p>
              <p className="mt-2 font-display text-4xl">{totalPrice}</p>
            </div>

            {error && selectedItems.length > 0 ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3">
              <button type="button" className="primary-button" onClick={handleContinue}>
                Continue to Booking
              </button>
              <Link to="/services" className="secondary-button">
                Back to Services
              </Link>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

export default CustomSessionPage;
