import BrandLogo from "./BrandLogo";

function Footer() {
  const socialLinks = [
    { label: "X", href: "https://x.com/mystiicveda" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/mysticveda-holistic-studio-1650343b4/?skipRedirect=true"
    },
    { label: "Instagram", href: "https://www.instagram.com/mysticveda_p/" },
    { label: "Pinterest", href: "https://in.pinterest.com/MysticVedaPriyani/" }
  ];

  return (
    <footer className="border-t border-mystic-plum/10 bg-white/60">
      <div className="section-shell flex flex-col gap-6 py-8 text-sm text-mystic-plum/75 md:flex-row md:items-center md:justify-between">
        <div>
          <BrandLogo />
          <p>Heal Your Energy, Transform Your Life</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-mystic-plum/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mystic-plum transition hover:border-mystic-gold/40 hover:text-mystic-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-1 text-left md:text-right">
          <p>MysticVeda@outlook.com</p>
          <p>+91 9637513736</p>
          <p>Virtual sessions worldwide</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
