function TestimonialCard({ item }) {
  return (
    <article className="glass-panel rounded-[28px] p-6 shadow-card">
      <p className="font-display text-3xl leading-none text-mystic-gold">"</p>
      <p className="mt-3 text-sm leading-7 text-mystic-plum/75">{item.quote}</p>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-mystic-plum">
        {item.name}
      </p>
    </article>
  );
}

export default TestimonialCard;
