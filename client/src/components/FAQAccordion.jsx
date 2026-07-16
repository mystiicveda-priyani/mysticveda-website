import { useState } from "react";

const faqs = [
  {
    question: "How does an online Tarot session work?",
    answer: "You will book a private session, and I will guide you through the reading in a calm, supportive setting. The session is designed to offer intuitive insight and practical reflection for your current life questions."
  },
  {
    question: "How long is an Energy Healing session?",
    answer: "Energy healing sessions are typically offered in a focused 30-minute or 60-minute format, depending on the support you need and your preferred experience."
  },
  {
    question: "How do I book?",
    answer: "You can select your preferred service, choose a date and time, and complete your booking securely through the online booking flow."
  },
  {
    question: "Can international clients book?",
    answer: "Yes. All sessions are available online, and international clients are warmly welcome."
  },
  {
    question: "Is everything confidential?",
    answer: "Yes. Client confidentiality is treated with the utmost care, respect, and professionalism throughout the session process."
  }
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="rounded-[24px] border border-mystic-plum/10 bg-white/80 p-4 shadow-sm">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="text-sm font-semibold text-mystic-plum">{item.question}</span>
              <span className="text-xl text-mystic-gold">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <p className="mt-3 text-sm leading-7 text-mystic-plum/75">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
