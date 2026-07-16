import { Helmet } from "react-helmet-async";

const SITE_URL = "https://mysticvedaholisticstudio.netlify.app";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80";

function SEO({
  title = "Online Astrology, Numerology, Tarot & YPV Healing | MysticVeda Holistic Studio",
  description = "Get online astrology, numerology, tarot readings & YPV healing. Personalized guidance for clarity, career, relationships & energy healing worldwide.",
  path = "/",
  image = DEFAULT_IMAGE,
  keywords = "online astrology reading, numerology reading online, tarot reading online, YPV healing, energy healing, chakra balancing, manifestation coaching, mystic veda holistic studio"
}) {
  const canonical = `${SITE_URL}${path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MysticVeda Holistic Studio",
    url: SITE_URL,
    description,
    telephone: "+91-9075137505",
    email: "MysticVeda@outlook.com",
    areaServed: ["US", "UK", "Canada", "Australia", "Europe", "India"],
    sameAs: [
      "https://x.com/mystiicveda",
      "https://www.instagram.com/mysticveda_p/",
      "https://in.pinterest.com/MysticVedaPriyani/"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="MysticVeda Holistic Studio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@mystiicveda" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}

export default SEO;
