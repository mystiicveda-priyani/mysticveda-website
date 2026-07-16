import { AnimatePresence, motion } from "framer-motion";

const placeholderImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <rect width="1200" height="800" fill="#f9f2ea"/>
    <rect x="90" y="90" width="1020" height="620" rx="34" fill="white" stroke="#d9c6a5" stroke-width="3"/>
    <rect x="178" y="190" width="844" height="120" rx="18" fill="#f4e6d3"/>
    <rect x="178" y="352" width="610" height="34" rx="17" fill="#e6d2b2"/>
    <rect x="178" y="412" width="500" height="28" rx="14" fill="#eadfcf"/>
    <rect x="178" y="470" width="420" height="28" rx="14" fill="#eadfcf"/>
    <circle cx="930" cy="470" r="96" fill="#d8b878" fill-opacity="0.28"/>
    <text x="600" y="650" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="#6d4b3a">Certificate preview</text>
  </svg>
`)}`;

function CertificatePreviewModal({ certificate, onClose }) {
  if (!certificate) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-mystic-plum/80 px-4 py-4 sm:px-6 sm:py-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 12, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl rounded-[32px] border border-white/40 bg-white/95 p-4 shadow-2xl sm:p-6"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-10 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-mystic-plum/20 bg-mystic-plum text-white shadow-lg ring-4 ring-white/70 transition hover:bg-mystic-plum/90 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
            aria-label="Close certificate preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
              Certificate Preview
            </p>
            <h3 id="certificate-modal-title" className="mt-2 font-display text-3xl text-mystic-plum">
              {certificate.title}
            </h3>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-mystic-plum/10 bg-mystic-cream/60">
            <img
              src={certificate.image || placeholderImage}
              alt={`${certificate.title} certificate preview`}
              className="max-h-[70vh] w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-mystic-plum/75">
            <span className="rounded-full bg-mystic-plum/5 px-3 py-2">{certificate.issuer}</span>
            <span className="rounded-full bg-mystic-plum/5 px-3 py-2">{certificate.year}</span>
            {certificate.focus ? (
              <span className="rounded-full bg-mystic-gold/10 px-3 py-2">{certificate.focus}</span>
            ) : null}
          </div>

          {certificate.description ? (
            <p className="mt-5 text-sm leading-7 text-mystic-plum/75">{certificate.description}</p>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CertificatePreviewModal;
