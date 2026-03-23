import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Schedule", href: "#schedule" },
  { label: "Plans", href: "#plans" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#home" className="text-2xl font-extrabold tracking-tight text-zinc-900 transition-colors duration-300">
          <span className="text-orange-500">PRIME</span>FITNESS
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="hover:text-orange-600 transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn-smooth bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-md text-white font-semibold"
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl text-zinc-900 transition-transform duration-300 hover:scale-105"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-white border-t border-orange-100 px-4 pb-4 space-y-3 text-sm font-medium text-zinc-700 animate-fadeSlideUp">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="block py-2 hover:text-orange-600 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="block btn-smooth bg-orange-600 text-white text-center py-2 rounded-md font-semibold"
              onClick={() => setOpen(false)}
            >
              Join Now
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
