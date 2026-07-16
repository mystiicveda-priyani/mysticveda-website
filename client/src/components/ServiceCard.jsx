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

  const benefits =
    name.includes("tarot")
      ? ["Intuitive insight", "Clarity for life decisions", "Gentle reflection"]
      : name.includes("healing") || name.includes("energy")
        ? ["Energetic reset", "Emotional grounding", "Calm support"]
        : name.includes("chakra")
          ? ["Energy flow", "Inner balance", "Restorative support"]
          : name.includes("manifest")
            ? ["Focused intention", "Goal clarity", "Practical next steps"]
            : name.includes("numer")
              ? ["Life pattern insight", "Personal direction", "Clear reflection"]
              : ["Personalised guidance", "Private support", "Online access"];

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

      <div className="mt-5 rounded-[24px] border border-mystic-plum/10 bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mystic-gold">
          Benefits
        </p>
        <ul className="mt-3 space-y-2 text-sm text-mystic-plum/75">
          {benefits.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
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
          Learn More
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
