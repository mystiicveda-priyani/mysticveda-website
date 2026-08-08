import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  const name = service.name?.toLowerCase() || "";
  const icon = name.includes("tarot")
    ? "☾"
    : name.includes("healing") || name.includes("energy")
      ? "✦"
      : name.includes("chakra")
        ? "✿"
        : name.includes("manifest")
          ? "☼"
          : name.includes("numer")
            ? "☁"
            : "☽";

  const details =
    name.includes("tarot")
      ? {
          idealFor: "Best for clients seeking decision clarity in love, career, or life direction.",
          challenge: "Supports reflection when you feel uncertain or emotionally stuck.",
          expectation: "Expect intuitive insight, compassionate reflection, and practical next steps."
        }
      : name.includes("healing") || name.includes("energy")
        ? {
            idealFor: "Best for clients who feel emotionally heavy, drained, or energetically blocked.",
            challenge: "Helps release stress and restore calm when everything feels too full.",
            expectation: "Expect a soothing, grounding experience with gentle energetic support."
          }
        : name.includes("chakra")
          ? {
              idealFor: "Best for clients who want deeper energy alignment and emotional balance.",
              challenge: "Supports those feeling disconnected from their body or inner rhythm.",
              expectation: "Expect a restorative session focused on flow, grounding, and clarity."
            }
          : name.includes("manifest")
            ? {
                idealFor: "Best for clients who are ready to create momentum and shape their next chapter.",
                challenge: "Helps when motivation is low and priorities feel unclear.",
                expectation: "Expect guided reflection, practical strategy, and renewed direction."
              }
            : name.includes("numer")
              ? {
                  idealFor: "Best for clients who want insight into life patterns and personal growth.",
                  challenge: "Supports reflection on repeating cycles and deeper purpose.",
                  expectation: "Expect a thoughtful report with clear patterns and grounded guidance."
                }
              : {
                  idealFor: "Best for clients seeking personal insight and a calm, premium experience.",
                  challenge: "A thoughtful option when you want guidance without overwhelm.",
                  expectation: "Expect clear guidance, caring support, and a personalised approach."
                };

  return (
    <article className="group glass-panel flex h-full flex-col rounded-[28px] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-aura">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
            {service.duration}
          </p>
          <h3 className="font-display text-3xl font-semibold text-mystic-plum">
            {service.name}
          </h3>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-mystic-plum/10 bg-white/80 text-3xl text-mystic-plum">
          {icon}
        </div>
      </div>

      <p className="flex-1 text-sm leading-7 text-mystic-plum/75">
        {service.description}
      </p>

      <div className="mt-5 space-y-3 rounded-[24px] border border-mystic-plum/10 bg-white/70 p-4 text-sm text-mystic-plum/75">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mystic-gold">Who it is for</p>
          <p className="mt-2 leading-7">{details.idealFor}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mystic-gold">What it helps with</p>
          <p className="mt-2 leading-7">{details.challenge}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mystic-gold">What to expect</p>
          <p className="mt-2 leading-7">{details.expectation}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-mystic-plum/60">
        <span className="rounded-full bg-mystic-plum/5 px-3 py-2 font-semibold">
          Duration: {service.duration}
        </span>
        <span className="rounded-full bg-mystic-plum/5 px-3 py-2 font-semibold">
          Mode: Online
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to={`/book/${service.id}`} className="primary-button">
          Book Session
        </Link>
        <Link to="/contact" className="secondary-button">
          Ask a Question
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
