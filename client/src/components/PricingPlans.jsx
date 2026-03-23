import { FaCheck } from "react-icons/fa";
import useScrollReveal from "../hooks/useScrollReveal";

const plans = [
  {
    name: "Starter",
    price: "999",
    duration: "/month",
    features: ["Access to gym floor", "Locker facility", "1 fitness assessment", "Open 6 AM – 10 PM"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "2,499",
    duration: "/quarter",
    features: ["Everything in Starter", "Personal trainer (2x/week)", "Diet consultation", "Access to group classes", "Steam & sauna"],
    highlighted: true,
  },
  {
    name: "Elite",
    price: "7,999",
    duration: "/year",
    features: ["Everything in Pro", "Unlimited PT sessions", "Priority booking", "Supplement discounts", "Guest passes (4/year)", "24/7 access"],
    highlighted: false,
  },
];

export default function PricingPlans() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="plans" className="py-16 md:py-20 px-4 bg-white section-soft">
      <div ref={ref} className={`max-w-7xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Membership <span className="text-orange-500">Plans</span>
          </h2>
          <p className="text-zinc-600 mt-3 max-w-xl mx-auto">
            Choose a plan that fits your goals. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-6 md:p-8 flex flex-col border transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${
                p.highlighted
                  ? "bg-orange-600 text-white border-orange-600 md:scale-[1.03] shadow-2xl"
                  : "bg-orange-50 border-orange-100 hover:border-orange-300 lift-hover"
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-xs font-bold px-4 py-1 rounded-full shadow">
                  MOST POPULAR
                </span>
              )}

              <h3 className={`text-xl font-bold mb-1 ${p.highlighted ? "" : "text-zinc-900"}`}>{p.name}</h3>
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-black">₹{p.price}</span>
                <span className={`text-sm ${p.highlighted ? "text-orange-100" : "text-zinc-500"}`}>{p.duration}</span>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <FaCheck className={`mt-0.5 shrink-0 ${p.highlighted ? "text-orange-200" : "text-orange-500"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`#contact?plan=${encodeURIComponent(p.name)}`}
                aria-label={`Get started with ${p.name} plan`}
                className={`btn-smooth block text-center py-3 rounded-lg font-semibold ${
                  p.highlighted
                    ? "bg-white text-orange-600 hover:bg-orange-50"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
