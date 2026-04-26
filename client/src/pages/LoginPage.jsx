import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({
    email: "",
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

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      loginUser(form);
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
      eyebrow="User Login"
      title="Welcome back to your healing space"
      description="Sign in to continue your booking and manage your wellness journey."
      footer={
        <p className="text-center text-sm text-mystic-plum/70">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            state={location.state}
            className="font-semibold text-mystic-plum underline decoration-mystic-gold/60 underline-offset-4"
          >
            Create your profile
          </Link>
        </p>
      }
    >
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] bg-white/70 p-5">
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
              placeholder="Enter your password"
            />
          </label>

          <button type="submit" className="primary-button">
            Login with Email
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

export default LoginPage;
