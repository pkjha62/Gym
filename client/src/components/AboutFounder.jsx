import useScrollReveal from "../hooks/useScrollReveal";

export default function AboutFounder() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="about" className="py-20 px-4 bg-amber-50 section-soft">
      <div ref={ref} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <img
            src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=700&q=80"
            alt="Founder"
            loading="lazy"
            className="rounded-2xl shadow-xl w-full object-cover max-h-[500px]"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-600 text-white rounded-full hidden lg:flex items-center justify-center text-xs font-bold leading-tight text-center">
            10+<br />Years
          </div>
        </div>

        {/* Text */}
        <div className={`transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-orange-500">Founder</span>
          </h2>
          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-zinc-700 text-lg mb-6">
            "Healthy India, Wealthy India — that is the mission we live and
            breathe every single day."
          </blockquote>
          <p className="text-zinc-700 leading-relaxed mb-4">
            With over a decade of experience in sports science and competitive
            bodybuilding, our founder established PrimeFitness to democratise
            access to world-class gym facilities at an affordable price.
          </p>
          <p className="text-zinc-700 leading-relaxed mb-6">
            From a single location to multiple centres across the country, the
            vision remains unchanged — empower people to become the strongest
            version of themselves.
          </p>
          <a
            href="#contact"
            className="inline-block btn-smooth bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-md font-semibold text-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
