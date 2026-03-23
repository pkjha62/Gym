import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import useScrollReveal from "../hooks/useScrollReveal";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const STATUS_DISPLAY_MS = 4000;

export default function ContactForm() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash || "";
    const [, query] = hash.split("?");
    const params = new URLSearchParams(query || "");
    const selectedPlan = params.get("plan");
    if (!selectedPlan) return;

    setForm((prev) => ({
      ...prev,
      message: prev.message || `I'm interested in the ${selectedPlan} plan. Please contact me with details.`,
    }));
  }, []);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), STATUS_DISPLAY_MS);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 px-4 bg-white section-soft">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Info side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-zinc-600 mb-8 leading-relaxed">
            Have questions about our programs or want to start your fitness journey?
            Fill out the form and our team will get back to you within 24 hours.
          </p>

          <ul className="space-y-5 text-zinc-700 text-sm">
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-orange-500" />
              </div>
              <div>
                <p className="font-semibold">Visit Us</p>
                <p className="text-zinc-500">123 Fitness Avenue, Sector 21, New Delhi — 110001</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-orange-500" />
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-zinc-500">+91 98765 43210</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-orange-500" />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-zinc-500">info@primefitness.in</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Form side */}
        <form onSubmit={handleSubmit} className="bg-orange-50 rounded-2xl p-5 md:p-8 border border-orange-100 space-y-5" aria-busy={loading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
                name="name"
              value={form.name}
              onChange={update}
              placeholder="Full Name"
              required
                aria-required="true"
              className="bg-white border border-orange-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-300"
            />
            <input
                name="email"
              type="email"
              value={form.email}
              onChange={update}
              placeholder="Email Address"
              required
                aria-required="true"
              className="bg-white border border-orange-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-300"
            />
          </div>
          <input
            name="phone"
            value={form.phone}
            onChange={update}
            placeholder="Phone Number"
            className="w-full bg-white border border-orange-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-300"
          />
          <textarea
                name="message"
            value={form.message}
            onChange={update}
            placeholder="Your Message"
            required
                aria-required="true"
            rows={4}
            className="w-full bg-white border border-orange-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-300"
          />
          <button
            type="submit"
            disabled={loading}
            aria-live="polite"
            className="btn-smooth w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <FaPaperPlane className="text-sm" />
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p role="status" className="text-emerald-700 text-sm font-medium text-center">
              Thank you! We&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-red-700 text-sm font-medium text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
