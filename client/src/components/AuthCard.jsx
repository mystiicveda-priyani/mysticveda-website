function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer
}) {
  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-2xl rounded-[36px] bg-gradient-to-br from-white via-[#FBF7FF] to-[#FFF6EC] p-[1px] shadow-aura">
        <div className="glass-panel rounded-[36px] p-8 md:p-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-mystic-gold">
              {eyebrow}
            </p>
            <h1 className="font-display text-4xl font-semibold text-mystic-plum md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 text-mystic-plum/75">
              {description}
            </p>
          </div>

          <div className="mt-10">{children}</div>
          {footer ? <div className="mt-6">{footer}</div> : null}
        </div>
      </div>
    </section>
  );
}

export default AuthCard;
