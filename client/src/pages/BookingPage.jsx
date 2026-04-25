import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { timeSlots } from "../lib/constants";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  timeSlot: ""
};

function getLocalToday() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split("T")[0];
}

function BookingPage() {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState(timeSlots);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || ""
    }));
  }, [user]);

  useEffect(() => {
    async function loadBookingContext() {
      try {
        const [servicesData, appointmentsData, availabilityData] = await Promise.all([
          api.getServices(),
          api.getAppointments(),
          api.getAvailability()
        ]);
        setServices(servicesData.services);
        setAppointments(appointmentsData.appointments);
        setAvailableSlots(
          availabilityData.slots?.length ? availabilityData.slots : timeSlots
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBookingContext();
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
  const requiresMeeting = selectedItems.some((item) => item.type === "live");

  const bookedSlots = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.requiresMeeting !== false &&
          appointment.date === form.date &&
          appointment.bookingStatus !== "Cancelled"
      )
      .map((appointment) => appointment.timeSlot);
  }, [appointments, form.date]);

  const slotOptions = useMemo(
    () => (availableSlots.length ? availableSlots : timeSlots),
    [availableSlots]
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "date" ? { timeSlot: "" } : {})
    }));
  }

  function validateDetails() {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.date ||
      (requiresMeeting && !form.timeSlot)
    ) {
      setError("Please complete all booking details before confirming.");
      return false;
    }

    setError("");
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateDetails()) {
      return;
    }

    if (selectedItems.length === 0) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const data = await api.createAppointment({
        ...form,
        serviceId: selectedService?.id,
        serviceItems: selectedItems.map((item) => ({
          serviceId: item.serviceId,
          quantity: item.quantity
        })),
        timeSlot: requiresMeeting ? form.timeSlot : ""
      });

      setAppointments((current) => [...current, data.appointment]);
      navigate(`/confirmation/${data.appointment.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

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
          <h1 className="font-display text-4xl text-mystic-plum">
            Service not found
          </h1>
          <p className="mt-3 text-sm text-mystic-plum/70">
            The selected service could not be loaded. Please return to the
            services page and try again.
          </p>
          <Link to="/services" className="primary-button mt-6">
            Back to Services
          </Link>
        </div>
      </section>
    );
  }

  if (serviceId === "custom-session" && selectedItems.length === 0) {
    return (
      <section className="section-shell py-16">
        <div className="glass-panel rounded-[32px] p-8 shadow-card">
          <h1 className="font-display text-4xl text-mystic-plum">
            Custom session is empty
          </h1>
          <p className="mt-3 text-sm text-mystic-plum/70">
            Please select the services you want in your custom package before
            continuing to booking.
          </p>
          <Link to="/custom-session" className="primary-button mt-6">
            Build Custom Session
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-16">
      <SectionHeading
        eyebrow="Booking"
        title="Reserve your session"
        description="Choose your date and available time, confirm your details, and reserve your slot. Once booked, that time shows as unavailable to the next client."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="glass-panel h-fit rounded-[32px] p-8 shadow-aura">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
            {serviceId === "custom-session" ? "Selected Services" : "Selected Service"}
          </p>
          <h2 className="mt-3 font-display text-4xl text-mystic-plum">
            {bookingTitle}
          </h2>
          <div className="mt-6 space-y-4">
            {selectedItems.map((item) => (
              <div key={item.serviceId} className="rounded-[24px] bg-white/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-mystic-plum">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-mystic-plum/55">
                      {item.duration} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-mystic-plum">
                    ${item.lineTotal}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[24px] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
                Package Type
              </p>
              <p className="mt-2 text-lg font-semibold text-mystic-plum">
                {serviceId === "custom-session" ? "Customized package" : "Single service"}
              </p>
            </div>
            <div className="rounded-[24px] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
                Total
              </p>
              <p className="mt-2 text-lg font-semibold text-mystic-plum">
                ${totalAmount}
              </p>
            </div>
          </div>
        </aside>

        <div className="glass-panel rounded-[32px] p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-semibold text-mystic-plum">
                  Name
                </span>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-semibold text-mystic-plum">
                  Email
                </span>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-semibold text-mystic-plum">
                  Phone
                </span>
                <input
                  className="input-field"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9637513736"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-semibold text-mystic-plum">
                  {requiresMeeting ? "Select Date" : "Preferred Delivery Date"}
                </span>
                <input
                  className="input-field"
                  type="date"
                  name="date"
                  min={getLocalToday()}
                  value={form.date}
                  onChange={handleChange}
                />
              </label>
            </div>

            {requiresMeeting ? (
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-mystic-plum">
                    Select Time Slot
                  </span>
                  <div className="flex gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                      Available
                    </span>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-700">
                      Booked
                    </span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {slotOptions.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = form.timeSlot === slot;

                    return (
                      <label
                        key={slot}
                        className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${
                          isBooked
                            ? "cursor-not-allowed border-rose-200 bg-rose-50 text-rose-400"
                            : isSelected
                              ? "border-mystic-plum bg-mystic-plum text-white shadow-md"
                              : "cursor-pointer border-mystic-plum/10 bg-white/80 text-mystic-plum hover:border-mystic-plum/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          value={slot}
                          checked={isSelected}
                          onChange={handleChange}
                          className="sr-only"
                          disabled={isBooked}
                        />
                        <span className="block">{slot}</span>
                        <span className="mt-1 block text-[10px] uppercase tracking-[0.25em]">
                          {isBooked ? "Booked" : "Available"}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-mystic-plum/55">
                  Admin controls the available daily slots. When a client books a
                  time on your selected date, that slot becomes unavailable for
                  others.
                </p>
              </div>
            ) : (
              <div className="rounded-[24px] bg-mystic-lilac/35 p-5 text-sm leading-7 text-mystic-plum/75">
                This booking contains report-only services, so no live meeting
                time is required. Your report request is scheduled as an email
                delivery service.
              </div>
            )}

            <div className="rounded-[24px] bg-white/70 p-5 text-sm leading-7 text-mystic-plum/75">
              Your booking is confirmed as soon as the slot is available and
              saved. The system also marks a confirmation email for your booking
              record.
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Booking..." : "Book Slot"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
