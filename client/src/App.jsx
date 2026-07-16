import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import CustomSessionPage from "./pages/CustomSessionPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicesPage";
import NumerologyPage from "./pages/NumerologyPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import QualificationsPage from "./pages/QualificationsPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import RefundPage from "./pages/RefundPage";
import CancellationPage from "./pages/CancellationPage";
import DisclaimerPage from "./pages/DisclaimerPage";

function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[440px] bg-hero-glow" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/qualifications" element={<QualificationsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/refund-policy" element={<RefundPage />} />
          <Route path="/cancellation-policy" element={<CancellationPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/numerology" element={<NumerologyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route
            path="/custom-session"
            element={
              <ProtectedRoute allow={["user"]}>
                <CustomSessionPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allow={["user"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:serviceId"
            element={
              <ProtectedRoute allow={["user"]}>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
