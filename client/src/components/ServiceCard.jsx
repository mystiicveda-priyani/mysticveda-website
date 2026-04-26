function ServiceCard({ service }) {

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
        <div className="rounded-full bg-mystic-plum px-4 py-2 text-sm font-semibold text-white shadow-md">
          ${service.price}
        </div>
      </div>

      <p className="flex-1 text-sm leading-7 text-mystic-plum/75">
        {service.description}
      </p>

      <div className="mt-6">
        <span className="text-sm font-medium text-mystic-plum/55">
          Online guided experience
        </span>
      </div>
    </article>
  );
}

export default ServiceCard;
