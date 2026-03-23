import { FaDumbbell, FaChalkboardTeacher, FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import useScrollReveal from "../hooks/useScrollReveal";

const features = [
  {
    icon: <FaDumbbell className="text-3xl md:text-4xl text-orange-500" aria-hidden="true" />,
    title: "Premium Equipment",
    desc: "Top-tier brands like Hammer Strength, Life Fitness, and Technogym.",
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl md:text-4xl text-orange-500" aria-hidden="true" />,
    title: "Expert Instructors",
    desc: "Certified coaches with 5+ years of competitive & coaching experience.",
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl md:text-4xl text-orange-500" aria-hidden="true" />,
    title: "Multiple Locations",
    desc: "Conveniently located centres so your workout is never far from home.",
  },
  {
    icon: <FaClipboardList className="text-3xl md:text-4xl text-orange-500" aria-hidden="true" />,
    title: "Flexible Plans",
    desc: "Monthly, quarterly, and annual memberships to fit every budget.",
  },
];

export default function Features() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="py-16 md:py-20 px-4 bg-white section-soft">
      <div ref={ref} className={`max-w-7xl mx-auto text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Choose <span className="text-orange-500">PrimeFitness</span>?
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {features.map((f, idx) => (
          <div
            key={f.title}
            className={`bg-orange-50 border border-orange-100 rounded-xl p-5 md:p-8 text-center hover:border-orange-300 lift-hover transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-lg font-bold mb-2 text-zinc-900">{f.title}</h3>
            <p className="text-zinc-600 text-sm text-left sm:text-center">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
