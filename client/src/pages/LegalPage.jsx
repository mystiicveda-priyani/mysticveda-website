import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";

function LegalPage({ title, description, content }) {
  return (
    <section className="section-shell py-16 md:py-20">
      <SEO
        title={`${title} | MysticVeda Holistic Studio`}
        description={description}
        path="/legal"
      />
      <div className="glass-panel rounded-[36px] p-8 shadow-card md:p-12">
        <SectionHeading eyebrow="Legal" title={title} description={description} />
        <div className="mx-auto mt-8 max-w-3xl space-y-5 rounded-[28px] border border-mystic-plum/10 bg-white/80 p-6 text-sm leading-8 text-mystic-plum/75">
          {content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link to="/" className="mt-8 inline-flex text-sm font-semibold text-mystic-plum underline decoration-mystic-gold/40 underline-offset-4">
          Return to Home
        </Link>
      </div>
    </section>
  );
}

export default LegalPage;
