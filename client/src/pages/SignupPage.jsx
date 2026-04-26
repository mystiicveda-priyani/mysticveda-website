import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signupUser, isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");

  const redirectPath = location.state?.from?.pathname || "/";

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await signupUser(form);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  if (isAuthenticated && user?.role === "user") {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <AuthCard
      eyebrow="Sign Up"
      title="Create your MysticVeda account"
      description="Make booking smoother by saving your details before reserving a session."
      footer={
        <p className="text-center text-sm text-mystic-plum/70">
          Already have an account?{" "}
          <Link
            to="/login"
            state={location.state}
            className="font-semibold text-mystic-plum underline decoration-mystic-gold/60 underline-offset-4"
          >
            Log in here
          </Link>
        </p>
      }
    >
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] bg-white/70 p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-mystic-plum">
                Full Name
              </span>
              <input
                className="input-field"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-mystic-plum">
                Phone
              </span>
              <input
                className="input-field"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9075137505"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-mystic-plum">
              Email
            </span>
            <input
              className="input-field"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-mystic-plum">
              Password
            </span>
            <input
              className="input-field"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </label>

          <button type="submit" className="primary-button">
            Sign Up with Email
          </button>
        </form>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}
      </div>
    </AuthCard>
  );
}

export default SignupPage;
