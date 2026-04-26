function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919075137505?text=Hi%20MysticVeda%2C%20I%27d%20like%20to%20book%20a%20session."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
      aria-label="Contact on WhatsApp"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        WA
      </span>
      WhatsApp
    </a>
  );
}

export default WhatsAppButton;
