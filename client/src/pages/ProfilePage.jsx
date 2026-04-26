import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

function ProfilePage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await api.getAppointments();
        setAppointments(data.appointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  const userAppointments = useMemo(() => {
    const normalizedEmail = user?.email?.trim().toLowerCase();

    return appointments.filter(
      (appointment) => appointment.email?.trim().toLowerCase() === normalizedEmail
    );
  }, [appointments, user?.email]);

  function renderMeetingCard(appointment) {
    const hasRealMeetingLink =
      appointment.requiresMeeting !== false &&
      appointment.meetingLink &&
      appointment.meetingProvider === "google-meet";
    const hasFallbackMeetingLink =
      appointment.requiresMeeting !== false &&
      appointment.meetingLink &&
      appointment.meetingProvider !== "google-meet";

    if (appointment.requiresMeeting === false) {
      return (
        <p className="mt-3 text-sm leading-7 text-white/85">
          This report booking does not require a meeting link. Your report will be
          emailed as a delivery-only booking.
        </p>
      );
    }

    if (hasRealMeetingLink) {
      return (
        <a
          href={appointment.meetingLink}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block break-all text-sm font-semibold underline decoration-white/40 underline-offset-4"
        >
          {appointment.meetingLink}
        </a>
      );
    }

    if (hasFallbackMeetingLink) {
      return (
        <p className="mt-3 text-sm leading-7 text-white/85">
          Google Meet is not connected yet for this booking, so no real Meet link
          is available.
        </p>
      );
    }

    return (
      <p className="mt-3 text-sm leading-7 text-white/85">
        Meeting details are not available for this booking yet.
      </p>
    );
  }

  return (
    <section className="section-shell py-16">
      <SectionHeading
        eyebrow="My Profile"
        title="Your booking details"
        description="View your confirmed bookings, package details, scheduled times, and meeting links or report delivery notes in one place."
        align="left"
      />

      <div className="mt-8 rounded-[28px] bg-white/75 p-6 shadow-card">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
              Name
            </p>
            <p className="mt-2 text-sm font-semibold text-mystic-plum">
              {user?.name}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
              Email
            </p>
            <p className="mt-2 text-sm font-semibold text-mystic-plum">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
              Phone
            </p>
            <p className="mt-2 text-sm font-semibold text-mystic-plum">
              {user?.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="h-64 animate-pulse rounded-[32px] bg-white/70 shadow-card" />
        ) : error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        ) : userAppointments.length === 0 ? (
          <div className="glass-panel rounded-[32px] p-8 shadow-card">
            <h2 className="font-display text-4xl text-mystic-plum">
              No bookings yet
            </h2>
            <p className="mt-3 text-sm leading-7 text-mystic-plum/70">
              Once you book a service, your appointment details will appear here.
            </p>
            <Link to="/services" className="primary-button mt-6">
              Explore Services
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {userAppointments.map((appointment) => (
              <article
                key={appointment.id}
                className="glass-panel rounded-[32px] p-7 shadow-card"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                      Booking ID
                    </p>
                    <h2 className="mt-2 font-display text-4xl text-mystic-plum">
                      {appointment.serviceName}
                    </h2>
                    <p className="mt-3 text-sm text-mystic-plum/65">
                      {appointment.date} at{" "}
                      {appointment.requiresMeeting !== false
                        ? appointment.timeSlot
                        : "Report by email"}
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                    {appointment.bookingStatus}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[24px] bg-white/75 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
                      Package
                    </p>
                    <p className="mt-2 text-sm font-semibold text-mystic-plum">
                      {appointment.serviceDuration}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-white/75 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
                      Total
                    </p>
                    <p className="mt-2 text-sm font-semibold text-mystic-plum">
                      {appointment.servicePrice}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-white/75 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
                      Email Status
                    </p>
                    <p className="mt-2 text-sm font-semibold text-mystic-plum">
                      {appointment.emailStatus}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-white/75 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
                      Booking Status
                    </p>
                    <p className="mt-2 text-sm font-semibold text-mystic-plum">
                      {appointment.bookingStatus}
                    </p>
                  </div>
                </div>

                {appointment.serviceItems?.length ? (
                  <div className="mt-6 rounded-[28px] bg-mystic-lilac/35 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-mystic-gold">
                      Included Services
                    </p>
                    <div className="mt-4 space-y-3">
                      {appointment.serviceItems.map((item) => (
                        <div
                          key={`${appointment.id}-${item.serviceId}`}
                          className="flex items-start justify-between gap-4 rounded-[20px] bg-white/85 p-4"
                        >
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
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 rounded-[24px] bg-mystic-plum p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    {appointment.requiresMeeting !== false
                      ? "Meeting Link"
                      : "Report Delivery"}
                  </p>
                  {renderMeetingCard(appointment)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfilePage;
