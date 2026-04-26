import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

function ConfirmationPage() {
  const { bookingId } = useParams();
  const { isAdmin, isUser } = useAuth();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAppointment() {
      try {
        const data = await api.getAppointment(bookingId);
        setAppointment(data.appointment);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAppointment();
  }, [bookingId]);

  if (loading) {
    return (
      <section className="section-shell py-16">
        <div className="h-[420px] animate-pulse rounded-[32px] bg-white/70 shadow-card" />
      </section>
    );
  }

  if (error || !appointment) {
    return (
      <section className="section-shell py-16">
        <div className="glass-panel rounded-[32px] p-8 shadow-card">
          <h1 className="font-display text-4xl text-mystic-plum">
            Unable to load confirmation
          </h1>
          <p className="mt-3 text-sm text-mystic-plum/75">{error}</p>
        </div>
      </section>
    );
  }

  const hasRealMeetingLink =
    appointment.requiresMeeting !== false &&
    appointment.meetingLink &&
    appointment.meetingProvider === "google-meet";
  const hasFallbackMeetingLink =
    appointment.requiresMeeting !== false &&
    appointment.meetingLink &&
    appointment.meetingProvider !== "google-meet";
  const hasRealEmail = appointment.emailStatus === "Sent (smtp)";

  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-3xl rounded-[36px] bg-gradient-to-br from-white via-[#FBF7FF] to-[#FFF6EC] p-[1px] shadow-aura">
        <div className="glass-panel rounded-[36px] p-8 md:p-10">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Booking Confirmed
          </div>
          <h1 className="mt-5 font-display text-5xl text-mystic-plum">
            Your slot has been reserved
          </h1>
          <p className="mt-4 text-base leading-7 text-mystic-plum/75">
            Your booking details are saved successfully. Live sessions show a
            real Google Meet link only after Google Calendar is connected, while
            report sessions are scheduled for email delivery without a meeting link.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Name", appointment.name],
              ["Email", appointment.email],
              ["Phone", appointment.phone],
              ["Service", appointment.serviceName],
              ["Date", appointment.date],
              [
                "Time",
                appointment.requiresMeeting !== false
                  ? appointment.timeSlot
                  : "Report by email"
              ],
              ["Booking Status", appointment.bookingStatus],
              ["Email Status", appointment.emailStatus]
            ].map(([label, value]) => (
              <div key={label} className="rounded-[24px] bg-white/75 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-mystic-plum/45">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold text-mystic-plum">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {appointment.serviceItems?.length ? (
            <div className="mt-6 rounded-[28px] bg-white/75 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-mystic-gold">
                Included Services
              </p>
              <div className="mt-4 space-y-3">
                {appointment.serviceItems.map((item) => (
                  <div
                    key={item.serviceId}
                    className="flex items-start justify-between gap-4 rounded-[20px] bg-mystic-lilac/35 p-4"
                  >
                    <div>
                      <p className="font-semibold text-mystic-plum">{item.name}</p>
                      <p className="mt-1 text-sm text-mystic-plum/60">
                        {item.duration} x {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-mystic-plum">
                      ${item.lineTotal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {appointment.requiresMeeting !== false ? (
            <div className="mt-6 rounded-[28px] bg-mystic-plum p-6 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                Meeting Link
              </p>
              <p className="mt-3 text-sm leading-7 text-white/85">
                {hasRealMeetingLink
                  ? "Your Google Meet link is ready."
                  : hasFallbackMeetingLink
                    ? "Google Meet is not connected yet, so this booking is still using a placeholder link."
                    : "Meeting link is not available for this booking."}
              </p>
              {hasRealMeetingLink ? (
                <a
                  href={appointment.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block break-all text-lg font-semibold text-white underline decoration-white/40 underline-offset-4"
                >
                  {appointment.meetingLink}
                </a>
              ) : null}
              {hasFallbackMeetingLink ? (
                <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/85">
                  Connect `mystiicveda@gmail.com` Google Calendar credentials in
                  the backend to generate a real Meet link for future bookings.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-6 rounded-[28px] bg-mystic-plum p-6 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                Report Delivery
              </p>
              <p className="mt-3 text-sm leading-7 text-white/85">
                This booking is for report delivery only, so no meeting link is
                needed. Your report details are scheduled for email delivery.
              </p>
            </div>
          )}

          {!hasRealEmail ? (
            <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
              Real email was not sent for this booking yet. The current status is
              `{appointment.emailStatus}`.
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/services" className="primary-button">
              Book Another Session
            </Link>
            {isAdmin ? (
              <Link to="/admin" className="secondary-button">
                View Admin Panel
              </Link>
            ) : isUser ? (
              <Link to="/profile" className="secondary-button">
                View My Bookings
              </Link>
            ) : (
              <Link to="/" className="secondary-button">
                Return Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmationPage;
