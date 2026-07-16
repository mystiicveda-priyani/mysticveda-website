import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CertificatePreviewModal from "../components/CertificatePreviewModal";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import counsellingPsychologyImage from "../assets/certificates/counselling-psychology-ignou.jpg";
import tarotImage from "../assets/certificates/certified-tarot-reader.jpg";
import ypvArhatImage from "../assets/certificates/ypv-arhat.jpg";
import ypvAtmaImage from "../assets/certificates/ypv-atma.jpg";
import ypvCrystalsImage from "../assets/certificates/ypv-crystals.jpg";
import ypvLevel1Image from "../assets/certificates/ypv-level-1.jpg";
import ypvLevel2Image from "../assets/certificates/ypv-level-2.jpg";
import ypvLevel3Image from "../assets/certificates/ypv-level-3.jpg";
import ypvManifestationImage from "../assets/certificates/ypv-manifestation.jpg";
import ypvWeightLossImage from "../assets/certificates/ypv-weight-loss.jpg";

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

const certificateGroups = [
  {
    id: "counselling-psychology",
    title: "Counselling Psychology",
    heading: "Therapeutic grounding with ethical, compassionate care",
    description:
      "A strong foundation in counselling psychology supports a calm, reflective, and client-centred experience for emotional clarity and personal growth.",
    items: [
      {
        id: 1,
        title: "M.A. in Counselling Psychology",
        issuer: "IGNOU",
        year: "2025",
        focus: "Counselling psychology & therapeutic practice",
        description:
          "Advanced studies in counselling approaches, emotional support, and structured guidance for clients navigating change and self-discovery.",
        image: counsellingPsychologyImage
      }
    ]
  },
  {
    id: "tarot",
    title: "Tarot",
    heading: "Intuitive guidance shaped with clarity and professionalism",
    description:
      "Tarot work is offered as a reflective and supportive practice, focused on clarity, perspective, and mindful decision-making.",
    items: [
      {
        id: 2,
        title: "Certified Tarot Reader",
        issuer: "Shree Maharshi College of Vedic Astrology",
        year: "2024",
        focus: "Intuitive reading practice",
        description:
          "A certification focused on spiritual insight, symbolic interpretation, and a grounded, respectful reading experience and remedial guidance for clients.",
        image: tarotImage
      }
    ]
  },
  {
    id: "ypv",
    title: "YPV Healing",
    heading: "Energy-based wellness practices with a holistic foundation",
    description:
      "YPV healing disciplines are presented as complementary wellness practices that support balance, calm, and energetic clarity.",
    items: [
      {
        id: 3,
        title: "Yoga Prana Vidya (YPV) Level 1",
        issuer: "YPV Training Programme",
        year: "2023",
        focus: "Foundational healing practice",
        description:
          "This course is an introduction into the world of spirituality, meditation, pranayama, and energy healing.",
        image: ypvLevel1Image
      },
      {
        id: 4,
        title: "Yoga Prana Vidya (YPV) Level 2",
        issuer: "YPV Training Programme",
        year: "2023",
        focus: "Energy healing progression",
        description:
          "This course builds upon the teachings of Level 1 to equip the student with specialised healing skills that combine colour and energy therapy.",
        image: ypvLevel2Image
      },
      {
        id: 5,
        title: "Yoga Prana Vidya (YPV) Level 3",
        issuer: "YPV Training Programme",
        year: "2023",
        focus: "Advanced healing practice",
        description:
          "Level 3 techniques offer the healer the ability to produce behavioural and emotional changes in significantly shorter time periods (months) than traditional psychological procedures (years).",
        image: ypvLevel3Image
      },
      {
        id: 6,
        title: "Yoga Prana Vidya (YPV) Crystal Healing",
        issuer: "YPV Training Programme",
        year: "2023",
        focus: "Crystal & energy alignment",
        description:
          "This course provides the healer with the ability to effectively use crystals for better and faster healing results.",
        image: ypvCrystalsImage
      },
      {
        id: 7,
        title: "Yoga Prana Vidya (YPV) Atma",
        issuer: "YPV Training Programme",
        year: "2024",
        focus: "Inner alignment practice",
        description:
          "The ‘Achieving Union with the Atma’ course is one of the foundation courses that explores human life, the purpose of religion, and the magnitude of human existence.",
        image: ypvAtmaImage
      },
      {
        id: 8,
        title: "Yoga Prana Vidya (YPV) Arhat Yoga Preliminary",
        issuer: "YPV Training Programme",
        year: "2024",
        focus: "Spiritual healing path",
        description:
          "The preparatory level of the Arhat Yoga course is a structured and synthesised pathway for spiritual evolution.",
        image: ypvArhatImage
      },
      {
        id: 9,
        title: "Yoga Prana Vidya (YPV) Manifestation",
        issuer: "YPV Training Programme",
        year: "2024",
        focus: "Manifestation & intention",
        description:
          " Combine energy science with the laws of manifestation to create a life full of greater abundance, success and wellness.",
        image: ypvManifestationImage
      },
      {
        id: 10,
        title: "Yoga Prana Vidya (YPV) Weight Loss",
        issuer: "YPV Training Programme",
        year: "2023",
        focus: "Wellness & transformation",
        description:
          "This workshop teaches you how to create a physical appearance that aligns with the radiance of your inner self. Look as beautiful as you feel!",
        image: ypvWeightLossImage
      }
    ]
  }
];

function QualificationsPage() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const heroStats = useMemo(
    () => [
      { label: "Verified Training", value: "5+" },
      { label: "Professional Approach", value: "Confidential" },
      { label: "Support Style", value: "Compassionate" }
    ],
    []
  );

  return (
    <section className="section-shell py-16 md:py-20">
      <SEO
        title="Qualifications & Certifications | MysticVeda Holistic Studio"
        description="Learn about Priyanka Pungaonkar’s qualifications, certifications, and professional background in counselling psychology, tarot guidance, and YPV energy healing."
        path="/qualifications"
        keywords="counselling psychology qualification, tarot certification, YPV healing practitioner, holistic studio certifications"
      />

      <div className="glass-panel rounded-[36px] p-8 shadow-aura md:p-12">
        <SectionHeading
          eyebrow="Qualifications"
          title="Professional training rooted in care, ethics, and guidance"
          description="Priyanka Pungaonkar brings together counselling psychology, tarot guidance, and energy healing in a grounded, client-centred practice designed to feel calm, safe, and trustworthy."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {heroStats.map((item) => (
            <div key={item.label} className="rounded-[24px] border border-mystic-plum/10 bg-white/80 p-5 text-center">
              <p className="text-3xl font-semibold text-mystic-plum">{item.value}</p>
              <p className="mt-2 text-sm text-mystic-plum/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-8">
        {certificateGroups.map((group) => (
          <section
            key={group.id}
            className="rounded-[32px] border border-mystic-plum/10 bg-white/70 p-6 shadow-card md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">
                  {group.title}
                </p>
                <h2 className="mt-2 font-display text-3xl text-mystic-plum">{group.heading}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-mystic-plum/75">
                  {group.description}
                </p>
              </div>
              <div className="inline-flex w-fit rounded-full border border-mystic-plum/10 bg-mystic-cream/70 px-4 py-2 text-sm font-semibold text-mystic-plum">
                {group.items.length} credential{group.items.length > 1 ? "s" : ""}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {group.items.map((certificate) => (
                <article
                  key={certificate.id}
                  className="group overflow-hidden rounded-[28px] border border-mystic-plum/10 bg-white shadow-card"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={certificate.image || placeholderImage}
                      alt={`${certificate.title} certificate preview`}
                      className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mystic-plum/85 to-transparent p-4">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-mystic-plum">
                        {certificate.issuer}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-2xl text-mystic-plum">{certificate.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-mystic-plum/75">{certificate.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-mystic-plum/5 px-3 py-1 text-sm text-mystic-plum/80">
                        {certificate.year}
                      </span>
                      <span className="rounded-full bg-mystic-gold/10 px-3 py-1 text-sm text-mystic-plum/80">
                        {certificate.focus}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(certificate)}
                      className="mt-6 inline-flex rounded-full border border-mystic-plum/15 bg-white px-4 py-2 text-sm font-semibold text-mystic-plum transition hover:border-mystic-gold/40 hover:text-mystic-gold"
                    >
                      View Certificate
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-[28px] border border-mystic-plum/10 bg-white/70 p-6 text-sm leading-7 text-mystic-plum/75">
        <p>
          Certificates are shared with transparency and care, and new qualifications will be added here as the practice continues to grow.
        </p>
        <Link to="/" className="mt-4 inline-flex text-sm font-semibold text-mystic-plum underline decoration-mystic-gold/40 underline-offset-4">
          Return to Home
        </Link>
      </div>

      <CertificatePreviewModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}

export default QualificationsPage;
