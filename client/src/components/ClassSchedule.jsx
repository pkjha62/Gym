import useScrollReveal from "../hooks/useScrollReveal";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const schedule = {
  Monday:    [{ time: "6:00 AM",  cls: "Power Yoga" },    { time: "8:00 AM",  cls: "Strength Training" }, { time: "5:00 PM", cls: "HIIT Cardio" },     { time: "7:00 PM", cls: "Zumba" }],
  Tuesday:   [{ time: "6:00 AM",  cls: "CrossFit" },      { time: "9:00 AM",  cls: "Pilates" },           { time: "5:00 PM", cls: "Boxing" },          { time: "7:00 PM", cls: "Spin Class" }],
  Wednesday: [{ time: "6:00 AM",  cls: "Power Yoga" },    { time: "8:00 AM",  cls: "Functional Training" },{ time: "5:00 PM", cls: "HIIT Cardio" },    { time: "7:00 PM", cls: "Dance Fitness" }],
  Thursday:  [{ time: "6:00 AM",  cls: "CrossFit" },      { time: "9:00 AM",  cls: "Strength Training" }, { time: "5:00 PM", cls: "Kickboxing" },     { time: "7:00 PM", cls: "Zumba" }],
  Friday:    [{ time: "6:00 AM",  cls: "Mobility Flow" }, { time: "8:00 AM",  cls: "Strength Training" }, { time: "5:00 PM", cls: "HIIT Cardio" },    { time: "7:00 PM", cls: "Spin Class" }],
  Saturday:  [{ time: "7:00 AM",  cls: "Open Gym" },      { time: "9:00 AM",  cls: "Boot Camp" },         { time: "11:00 AM", cls: "Yoga & Stretch" },{ time: "4:00 PM", cls: "Fun Fitness" }],
  Sunday:    [{ time: "8:00 AM",  cls: "Open Gym" },      { time: "10:00 AM", cls: "Recovery Yoga" }],
};

export default function ClassSchedule() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="schedule" className="py-16 md:py-20 px-4 bg-amber-50 section-soft">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Weekly <span className="text-orange-500">Schedule</span>
          </h2>
          <p className="text-zinc-600 mt-3 max-w-xl mx-auto">
            Plan your week with our structured class timetable.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-orange-100 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="py-3 px-4 text-left font-semibold">Day</th>
                <th className="py-3 px-4 text-left font-semibold">6 – 9 AM</th>
                <th className="py-3 px-4 text-left font-semibold">9 – 12 PM</th>
                <th className="py-3 px-4 text-left font-semibold">5 – 6 PM</th>
                <th className="py-3 px-4 text-left font-semibold">7 – 8 PM</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d, i) => {
                const slots = schedule[d];
                return (
                  <tr
                    key={d}
                    className={`border-t border-orange-50 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} ${i % 2 === 0 ? "bg-orange-50/40" : ""}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <td className="py-3 px-4 font-bold text-orange-600">{d}</td>
                    {[0, 1, 2, 3].map((si) => (
                      <td key={si} className="py-3 px-4 text-zinc-700">
                        {slots[si] ? (
                          <>
                            <span className="font-medium">{slots[si].cls}</span>
                            <span className="block text-xs text-zinc-500">{slots[si].time}</span>
                          </>
                        ) : (
                          <span className="text-zinc-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {days.map((d, i) => (
            <div
              key={d}
              className={`bg-white rounded-xl border border-orange-100 p-4 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <h4 className="font-bold text-orange-600 mb-2">{d}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {schedule[d].map((s) => (
                  <div key={s.time} className="bg-orange-50 rounded-lg p-2 text-xs">
                    <p className="font-semibold text-zinc-800">{s.cls}</p>
                    <p className="text-zinc-500">{s.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
