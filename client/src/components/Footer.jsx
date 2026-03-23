import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // In production this would POST to the backend
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer id="contact" className="bg-white border-t border-orange-100 section-soft">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand & address */}
        <div>
          <h3 className="text-xl font-extrabold mb-4 text-zinc-900">
            <span className="text-orange-500">PRIME</span>FITNESS
          </h3>
          <ul className="space-y-3 text-zinc-600 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-orange-500" />
              123 Fitness Avenue, Sector 21, New Delhi — 110001
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-500" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-500" />
              info@primefitness.in
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-bold mb-4 text-zinc-900">Quick Links</h4>
          <ul className="space-y-2 text-zinc-600 text-sm">
            {["Home", "About", "Facilities", "Schedule", "Plans", "Contact"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="hover:text-orange-600 transition-colors duration-300"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-4 text-zinc-900">Stay Updated</h4>
          <p className="text-zinc-600 text-sm mb-4">
            Subscribe to our newsletter for fitness tips and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="flex-1 bg-orange-50 border border-orange-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors duration-300"
            />
            <button
              type="submit"
              className="btn-smooth bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-semibold text-white"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="text-emerald-400 text-xs mt-2">
              Thank you for subscribing!
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-orange-100 text-center py-5 text-zinc-500 text-xs">
        &copy; {new Date().getFullYear()} PrimeFitness. All rights reserved.
      </div>
    </footer>
  );
}
