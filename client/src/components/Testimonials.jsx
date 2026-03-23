import { FaStar } from "react-icons/fa";
import useScrollReveal from "../hooks/useScrollReveal";

const reviews = [
  {
    name: "Arjun Mehta",
    role: "Competitive Bodybuilder",
    text: "PrimeFitness changed the game for me. The equipment quality and trainer support are unmatched!",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Marathon Runner",
    text: "I love the cardio section and the friendly atmosphere. It truly feels like a second home.",
    stars: 5,
  },
  {
    name: "Rohit Verma",
    role: "Corporate Professional",
    text: "Flexible timings and multiple locations make it easy to stay consistent even with a busy schedule.",
    stars: 4,
  },
  {
    name: "Sneha Patel",
    role: "Yoga Practitioner",
    text: "The yoga and stretching area is peaceful and well-maintained. Highly recommend for beginners.",
    stars: 5,
  },
];

export default function Testimonials() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="py-16 md:py-20 px-4 bg-orange-50/70 section-soft">
      <div ref={ref} className={`max-w-7xl mx-auto text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-3xl md:text-4xl font-bold">
          What Our <span className="text-orange-500">Members</span> Say
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {reviews.map((r, idx) => (
          <div
            key={r.name}
            className={`bg-white/90 backdrop-blur border border-orange-100 rounded-xl p-5 md:p-6 flex flex-col lift-hover transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: `${idx * 90}ms` }}
          >
            <div className="flex gap-1 mb-4" aria-label={`${r.stars} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={i < r.stars ? "text-orange-500" : "text-zinc-300"}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed flex-1 mb-4">
              "{r.text}"
            </p>
            <div>
              <p className="font-bold text-sm text-zinc-900">{r.name}</p>
              <p className="text-zinc-500 text-xs">{r.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
