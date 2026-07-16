import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";

function AboutPage() {
  return (
    <section className="section-shell py-16 md:py-20">
      <SEO
        title="Meet Your Practitioner | MysticVeda Holistic Studio"
        description="Meet Priyanka Pungaonkar, founder of MysticVeda Holistic Studio, and learn about her background in counselling psychology, tarot guidance, and YPV energy healing."
        path="/about"
        keywords="priyanka pungaonkar, counsellor, tarot reader, energy healing practitioner"
      />
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[36px] p-8 shadow-aura md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">About the practitioner</p>
          <h1 className="mt-4 font-display text-4xl text-mystic-plum md:text-5xl">Meet Your Practitioner</h1>
          <p className="mt-4 text-lg font-semibold text-mystic-plum">Priyanka Pungaonkar</p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-mystic-plum/60">Founder of MysticVeda Holistic Studio</p>
          <p className="mt-6 text-sm leading-8 text-mystic-plum/75">
            Priyanka offers a nurturing blend of counselling psychology, tarot guidance, and YPV energy healing to help clients feel seen, supported, and more aligned in their personal journey.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-[24px] border border-mystic-plum/10 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mystic-gold">Qualifications</p>
              <ul className="mt-3 space-y-2 text-sm text-mystic-plum/75">
                <li>• M.A. in Counselling Psychology (IGNOU)</li>
                <li>• Certified Tarot Reader</li>
                <li>• YPV Energy Healing Practitioner</li>
                <li>• Future certifications will be featured here</li>
              </ul>
            </div>
          </div>
          <Link to="/qualifications" className="mt-8 inline-flex text-sm font-semibold text-mystic-plum underline decoration-mystic-gold/40 underline-offset-4">
            View qualifications and certificates
          </Link>
        </div>

        <div className="glass-panel rounded-[36px] p-8 shadow-card md:p-10">
          <SectionHeading
            eyebrow="Approach"
            title="A calm, professional, and deeply compassionate practice"
            description="Each session is shaped with empathy, ethical care, and a strong respect for your personal pace and boundaries."
            align="left"
          />
          <div className="mt-8 grid gap-4">
            {[
              "Personalized one-to-one support",
              "Confidential and compassionate guidance",
              "Online sessions available worldwide",
              "Professional and ethical practice"
            ].map((item) => (
              <div key={item} className="rounded-[24px] bg-white/80 p-4 text-sm font-semibold text-mystic-plum">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
