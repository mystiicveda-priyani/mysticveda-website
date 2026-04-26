const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

export const api = {
  getAvailability: () => request("/availability"),
  getServices: () => request("/services"),
  getAppointments: () => request("/appointments"),
  getAppointment: (bookingId) => request(`/appointments/${bookingId}`),
  sendWelcomeEmail: (payload) =>
    request("/email/welcome", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  updateAvailability: (slots) =>
    request("/availability", {
      method: "PUT",
      body: JSON.stringify({ slots })
    }),
  createAppointment: (payload) =>
    request("/book-appointment", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
