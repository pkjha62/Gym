import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function BMICalculator() {
  const [ref, visible] = useScrollReveal();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);
  const [inputError, setInputError] = useState("");

  const calculate = (e) => {
    e.preventDefault();
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      setInputError("Please enter valid positive values for height and weight.");
      setResult(null);
      return;
    }
    setInputError("");
    const bmi = (w / (h * h)).toFixed(1);

    let category, color;
    if (bmi < 18.5) { category = "Underweight"; color = "text-sky-600"; }
    else if (bmi < 25) { category = "Normal"; color = "text-emerald-600"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-amber-600"; }
    else { category = "Obese"; color = "text-red-600"; }

    setResult({ bmi, category, color });
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-orange-50/70 section-soft">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            BMI <span className="text-orange-500">Calculator</span>
          </h2>
          <p className="text-zinc-600 mt-3">
            Check your Body Mass Index and start your journey.
          </p>
        </div>

        <form onSubmit={calculate} className="bg-white rounded-2xl border border-orange-100 p-5 md:p-8 shadow-sm" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Height (cm)</label>
              <input
                type="number"
                min="1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                required
                className="w-full border border-orange-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                min="1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                required
                className="w-full border border-orange-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-300"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-smooth w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg"
          >
            Calculate BMI
          </button>

          {inputError && (
            <p role="alert" className="mt-4 text-sm font-medium text-red-700 text-center">
              {inputError}
            </p>
          )}

          {result && (
            <div className="mt-6 text-center" aria-live="polite">
              <p className="text-4xl md:text-5xl font-black text-zinc-900">{result.bmi}</p>
              <p className={`text-base md:text-lg font-bold mt-1 ${result.color}`}>
                Category: {result.category}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
