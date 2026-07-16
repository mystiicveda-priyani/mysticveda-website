import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../lib/constants";

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const previous = () => setIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  const next = () => setIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));

  const item = testimonials[index];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-[32px] border border-mystic-plum/10 bg-white/80 p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">Client experiences</p>
            <h3 className="mt-2 font-display text-3xl text-mystic-plum">What clients say</h3>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={previous} className="rounded-full border border-mystic-plum/10 px-3 py-2 text-sm font-semibold text-mystic-plum" aria-label="Show previous testimonial">
              ←
            </button>
            <button type="button" onClick={next} className="rounded-full border border-mystic-plum/10 px-3 py-2 text-sm font-semibold text-mystic-plum" aria-label="Show next testimonial">
              →
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mt-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-mystic-plum/10 bg-mystic-cream text-lg font-semibold text-mystic-plum">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-mystic-plum">{item.name}</p>
                <p className="text-sm text-mystic-plum/60">{item.country}</p>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 text-mystic-plum/80">“{item.quote}”</p>
            <div className="mt-6 flex items-center gap-1 text-mystic-gold" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span key={starIndex}>★</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
