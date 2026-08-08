export const services = [
  {
    id: "energy-healing-session",
    name: "Energy Healing Session",
    type: "live",
    duration: "30 min",
    price: 15,
    description:
      "A focused energetic reset to ease emotional heaviness, clear stagnant energy, and restore inner calm."
  },
  {
    id: "tarot-reading",
    name: "Tarot Reading",
    type: "live",
    duration: "45 min",
    price: 20,
    description:
      "Receive intuitive card guidance for relationships, purpose, clarity, and aligned next steps."
  },
  {
    id: "chakra-balancing",
    name: "Chakra Balancing",
    type: "live",
    duration: "60 min",
    price: 25,
    description:
      "A restorative chakra alignment session to support flow, grounding, and emotional balance."
  },
  {
    id: "manifestation-coaching",
    name: "Manifestation Coaching",
    type: "live",
    duration: "60 min",
    price: 30,
    description:
      "Blend mindset support, energetic alignment, and practical strategy to call in your next chapter."
  },
  {
    id: "astrology-mini-session",
    name: "Astrology Mini Session",
    type: "live",
    duration: "45 min",
    price: 28,
    description:
      "A focused astrology discussion to understand key transits and insights relevant to your present concerns."
  }
];

export function findServiceById(serviceId) {
  return services.find((service) => service.id === serviceId);
}
