import { Link } from "react-router-dom";
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

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
    { label: "Refund Policy", to: "/refund-policy" },
    { label: "Cancellation Policy", to: "/cancellation-policy" },
    { label: "Disclaimer", to: "/disclaimer" }
  ];

  return (
    <footer className="border-t border-mystic-plum/10 bg-white/60">
      <div className="section-shell grid gap-8 py-8 text-sm text-mystic-plum/75 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <BrandLogo />
          <p className="mt-3">Heal Your Energy, Transform Your Life</p>
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

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">Quick Links</p>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-mystic-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">Services</p>
          <ul className="mt-3 space-y-2">
            <li>Tarot Guidance</li>
            <li>YPV Energy Healing</li>
            <li>Counselling Psychology</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">Legal</p>
          <ul className="mt-3 space-y-2">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-mystic-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-mystic-plum/60">
            © 2026 MysticVeda Holistic Studio
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
