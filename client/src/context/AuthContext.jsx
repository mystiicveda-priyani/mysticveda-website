import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const ADMIN_EMAIL = "admin@mysticveda.com";
const ADMIN_PASSWORD = "MysticVeda@Admin123";
const SESSION_STORAGE_KEY = "mysticveda-auth";
const USERS_STORAGE_KEY = "mysticveda-users";
const STORAGE_VERSION_KEY = "mysticveda-storage-version";
const STORAGE_VERSION = "2";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentVersion = localStorage.getItem(STORAGE_VERSION_KEY);

    if (currentVersion !== STORAGE_VERSION) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(USERS_STORAGE_KEY);
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
    }

    const savedUser = localStorage.getItem(SESSION_STORAGE_KEY);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }, []);

  function readUsers() {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

    if (!savedUsers) {
      return [];
    }

    try {
      return JSON.parse(savedUsers);
    } catch {
      localStorage.removeItem(USERS_STORAGE_KEY);
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  function persistSession(sessionUser) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  }

  function loginAdmin(credentials) {
    const normalizedEmail = credentials.email.trim().toLowerCase();

    if (
      normalizedEmail !== ADMIN_EMAIL ||
      credentials.password !== ADMIN_PASSWORD
    ) {
      throw new Error("Invalid admin credentials.");
    }

    const adminUser = {
      email: ADMIN_EMAIL,
      name: "MysticVeda Admin",
      role: "admin"
    };

    persistSession(adminUser);
    return adminUser;
  }

  async function signupUser(details) {
    const name = details.name.trim();
    const email = details.email.trim().toLowerCase();
    const password = details.password;
    const phone = details.phone.trim();

    if (!name || !email || !password || !phone) {
      throw new Error("Please complete all sign up fields.");
    }

    if (email === ADMIN_EMAIL) {
      throw new Error("This email is reserved for admin access.");
    }

    const users = readUsers();
    const existingUser = users.find((item) => item.email === email);

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      password,
      role: "user"
    };

    await api.sendWelcomeEmail({
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email
    });

    saveUsers([...users, newUser]);
    persistSession({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role
    });

    return newUser;
  }

  function loginUser(credentials) {
    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;
    const users = readUsers();
    const existingUser = users.find(
      (item) => item.email === email && item.password === password
    );

    if (!existingUser) {
      throw new Error("Invalid email or password.");
    }

    const sessionUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      role: existingUser.role
    };

    persistSession(sessionUser);
    return sessionUser;
  }

  function logout() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isUser: user?.role === "user",
      isAdmin: user?.role === "admin",
      loginAdmin,
      loginUser,
      signupUser,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
