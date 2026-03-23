import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    headline: "Transform Your Body",
    sub: "World-class equipment & expert trainers to help you reach your goals.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&q=80",
    headline: "Strength Starts Here",
    sub: "Join a community that pushes limits every single day.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80",
    headline: "Commit to Be Fit",
    sub: "Your journey to a healthier life begins with one step.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background image with crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-orange-50/70 to-amber-100/75" />

      {/* Content — key forces re-mount for entrance animation */}
      <div key={current} className="relative z-10 text-center px-4 max-w-3xl animate-fadeSlideUp">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 text-zinc-900 drop-shadow-sm">
          {slide.headline}
        </h1>
        <p className="text-lg md:text-xl text-zinc-700 mb-8">{slide.sub}</p>
        <a
          href="#contact"
          className="inline-block btn-smooth bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-md text-lg font-bold text-white"
        >
          Contact Us
        </a>
      </div>

      {/* Arrow controls */}
      <button onClick={prev} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-zinc-800 transition-all duration-300 hover:scale-110">
        <FaChevronLeft />
      </button>
      <button onClick={next} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-zinc-800 transition-all duration-300 hover:scale-110">
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-orange-500" : "bg-zinc-400/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
