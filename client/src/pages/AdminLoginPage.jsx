import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";

function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAdmin, isAdmin } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

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
      loginAdmin(form);
      const redirectPath = location.state?.from?.pathname || "/admin";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <AuthCard
      eyebrow="Admin Login"
      title="Private studio dashboard access"
      description="Only admin users can access bookings and client details."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-mystic-plum">
            Admin Email
          </span>
          <input
            className="input-field"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@mysticveda.com"
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
            placeholder="Enter admin password"
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="primary-button">
            Login as Admin
          </button>
        </div>
      </form>
    </AuthCard>
  );
}

export default AdminLoginPage;
