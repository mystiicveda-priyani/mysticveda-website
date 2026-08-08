import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAdmin, isUser, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const visibleLinks = [
    { label: "Home", to: "/", type: "route" },
    { label: "Services", to: "/services", type: "route" },
    { label: "About", to: "/about", type: "route" },
    { label: "Contact", to: "/contact", type: "route" }
  ];

  const moreLinks = [
    { label: "Programs", to: "#programs", type: "hash" },
    { label: "Testimonials", to: "#testimonials", type: "hash" },
    { label: "Blog", to: "/blog", type: "route" }
  ];

  const mobileLinks = [...visibleLinks, ...moreLinks];

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleNavSelect = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/70 backdrop-blur-xl">
      <div className="section-shell py-4">
        <div className="relative flex items-center justify-between gap-3">
          <BrandLogo compact />

          <div className="flex items-center gap-2 md:gap-3">
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-3 rounded-full border border-mystic-plum/10 bg-white/80 p-1 shadow-sm md:flex"
            >
              {visibleLinks.map((link) => (
                <div key={link.to}>
                  {link.type === "route" ? (
                    <NavLink
                      to={link.to}
                      onClick={handleNavSelect}
                      className={({ isActive }) =>
                        `rounded-full px-4 py-2 text-sm font-semibold transition ${
                          isActive
                            ? "bg-mystic-plum text-white shadow-md"
                            : "text-mystic-plum hover:bg-mystic-plum/5"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <a
                      href={link.to}
                      onClick={handleNavSelect}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-mystic-plum transition hover:bg-mystic-plum/5"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((v) => !v)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-mystic-plum inline-flex items-center gap-2 hover:bg-mystic-plum/5"
                  aria-expanded={isMoreOpen}
                  aria-haspopup="menu"
                >
                  More
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M6 8l4 4 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isMoreOpen ? (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-mystic-plum/10 bg-white/90 shadow-md">
                    <nav className="flex flex-col p-2">
                      {moreLinks.map((link) => (
                        link.type === "route" ? (
                          <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={handleNavSelect}
                            className="rounded-2xl px-4 py-3 text-sm font-semibold text-mystic-plum hover:bg-mystic-plum/5"
                          >
                            {link.label}
                          </NavLink>
                        ) : (
                          <a
                            key={link.to}
                            href={link.to}
                            onClick={handleNavSelect}
                            className="rounded-2xl px-4 py-3 text-sm font-semibold text-mystic-plum hover:bg-mystic-plum/5"
                          >
                            {link.label}
                          </a>
                        )
                      ))}
                    </nav>
                  </div>
                ) : null}
              </div>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://wa.me/919075137505?text=Hi%20MysticVeda%2C%20I%27d%20like%20to%20book%20a%20session."
                className="primary-button"
                onClick={handleNavSelect}
              >
                Book a Session
              </a>
              {isUser ? (
                <div className="rounded-full border border-mystic-plum/10 bg-white/80 px-4 py-2 text-sm font-semibold text-mystic-plum">
                  {user?.name}
                </div>
              ) : null}
              {isAdmin || isUser ? (
                <button type="button" className="secondary-button" onClick={logout}>
                  Logout
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <a
                href="https://wa.me/919075137505?text=Hi%20MysticVeda%2C%20I%27d%20like%20to%20book%20a%20session."
                className="primary-button px-4 py-2.5"
                onClick={handleNavSelect}
              >
                Book a Session
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mystic-plum/10 bg-white/90 text-mystic-plum shadow-sm transition hover:bg-mystic-plum/5"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label="Toggle mobile navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-navigation-menu"
          aria-label="Mobile navigation"
          aria-hidden={!isMenuOpen}
          className={`mt-3 overflow-hidden rounded-[28px] border border-mystic-plum/10 bg-white/90 shadow-xl transition-all duration-300 md:hidden ${
            isMenuOpen ? "max-h-[38rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-3">
            <nav className="flex flex-col gap-1">
              {mobileLinks.map((link) => (
                <div key={link.to}>
                  {link.type === "route" ? (
                    <NavLink
                      to={link.to}
                      onClick={handleNavSelect}
                      className={({ isActive }) =>
                        `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? "bg-mystic-plum text-white shadow-sm"
                            : "text-mystic-plum hover:bg-mystic-plum/5"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <a
                      href={link.to}
                      onClick={handleNavSelect}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-mystic-plum transition hover:bg-mystic-plum/5"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}

              {(isAdmin || isUser) && (
                <div className="mt-2 flex flex-col gap-2 border-t border-mystic-plum/10 pt-3">
                  {isUser ? (
                    <div className="rounded-2xl border border-mystic-plum/10 bg-mystic-cream/50 px-4 py-3 text-sm font-semibold text-mystic-plum">
                      {user?.name}
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className="secondary-button justify-center"
                    onClick={() => {
                      logout();
                      handleNavSelect();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
