import { GiWeightLiftingUp, GiRunningShoe } from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa";
import useScrollReveal from "../hooks/useScrollReveal";

const programs = [
  {
    icon: <GiWeightLiftingUp className="text-5xl text-orange-500" />,
    title: "Lifting Weight",
    desc: "Build raw strength with our professional powerlifting setups and guided barbell programs.",
    image:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
  },
  {
    icon: <FaDumbbell className="text-5xl text-orange-500" />,
    title: "Dumbbells",
    desc: "From 5 lb to 150 lb — a full dumbbell range for isolation work and functional training.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80",
  },
  {
    icon: <GiRunningShoe className="text-5xl text-orange-500" />,
    title: "Randomised Workouts",
    desc: "Never get bored again. Our AI-free curated routines keep your muscles guessing every session.",
    image:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80",
  },
];

export default function ProgramHighlights() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="facilities" className="py-20 px-4 bg-white section-soft">
      <div ref={ref} className={`max-w-7xl mx-auto text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-3xl md:text-4xl font-bold">
          Our <span className="text-orange-500">Programs</span>
        </h2>
        <p className="text-zinc-600 mt-3 max-w-xl mx-auto">
          Explore our core training programs designed to suit every fitness level.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {programs.map((p, idx) => (
          <div
            key={p.title}
            className={`group relative overflow-hidden rounded-2xl bg-orange-50 border border-orange-100 hover:border-orange-300 lift-hover transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6">
              <div className="mb-3">{p.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900">{p.title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
