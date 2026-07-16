import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAdmin, isUser, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryLinks = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" }
  ];

  const overflowLinks = [
    { label: "Qualifications", to: "/qualifications" },
    { label: "FAQ", to: "/faq" },
    { label: "Numerology", to: "/numerology" },
    { label: "Blog", to: "/blog" }
  ];

  const mobileLinks = [...primaryLinks, ...overflowLinks];

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
              className="hidden items-center gap-2 rounded-full border border-mystic-plum/10 bg-white/80 p-1 shadow-sm md:flex"
            >
              {primaryLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
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
              ))}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-mystic-plum transition hover:bg-mystic-plum/5"
                  aria-expanded={isMenuOpen}
                  aria-controls="more-navigation-menu"
                  aria-label="Open more navigation links"
                >
                  <span>More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  id="more-navigation-menu"
                  role="menu"
                  aria-label="Additional pages"
                  aria-hidden={!isMenuOpen}
                  className={`absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-[24px] border border-mystic-plum/10 bg-white/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                    isMenuOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  {overflowLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={handleNavSelect}
                      className={({ isActive }) =>
                        `block rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                          isActive
                            ? "bg-mystic-plum text-white shadow-sm"
                            : "text-mystic-plum hover:bg-mystic-plum/5"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <NavLink to="/contact" className="primary-button" onClick={handleNavSelect}>
                Book a Session
              </NavLink>
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
              <NavLink to="/contact" className="primary-button px-4 py-2.5" onClick={handleNavSelect}>
                Book a Session
              </NavLink>
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
            isMenuOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-3">
            <nav className="flex flex-col gap-1">
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.to}
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
