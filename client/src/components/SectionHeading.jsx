function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`mx-auto max-w-3xl ${alignment}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-mystic-gold">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-semibold text-mystic-plum md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-mystic-plum/75 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
