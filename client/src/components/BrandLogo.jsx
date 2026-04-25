import { Link } from "react-router-dom";
import logoImage from "../assets/mysticveda-logo.png";

function BrandLogo({ compact = false }) {
  return (
    <Link to="/" className={`flex items-center ${compact ? "gap-3" : "gap-4"}`}>
      <img
        src={logoImage}
        alt="MysticVeda Holistic Studio logo"
        className={compact ? "h-14 w-14 rounded-2xl object-cover" : "h-20 w-20 rounded-[28px] object-cover"}
      />
      <div>
        <p
          className={`font-display font-semibold text-mystic-plum ${
            compact ? "text-2xl" : "text-3xl"
          }`}
        >
          MysticVeda
        </p>
        <p
          className={`uppercase tracking-[0.35em] text-mystic-plum/60 ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          Holistic Studio
        </p>
      </div>
    </Link>
  );
}

export default BrandLogo;
