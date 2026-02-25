import { useInView } from "../../hooks";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { EXPERIENCES } from "../../data";
import SectionLabel from "../ui/SectionLabel";

export default function Experience() {
  const [ref, inView] = useInView(0.02);
  const { dark } = useDarkModeContext();

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: dark ? "#08071e" : "#f8fafc" }}
    >
      <div className="absolute top-0 -right-48 w-100 h-100 bg-emerald-700/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionLabel tag="Career Path" title="Work" accent="Experience" />
        <div ref={ref} className="relative">
          <div className="absolute left-4 sm:left-5 md:left-6 top-0 bottom-0 w-px bg-linear-to-b from-fuchsia-500/50 via-violet-500/25 to-transparent" />
          <div className="space-y-4 sm:space-y-5">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="relative pl-11 sm:pl-14 md:pl-16"
                style={{ opacity: inView?1:0, transform: inView?"translateX(0)":"translateX(-36px)", transition:`opacity .6s ${i*0.12}s ease-out, transform .6s ${i*0.12}s ease-out` }}
              >
                <div
                  className={`absolute left-3 sm:left-3.5 md:left-4.25 top-5 w-3.5 h-3.5 rounded-full border-[3px] ${exp.dot}`}
                  style={{ borderColor: dark ? "#08071e" : "#f8fafc" }}
                />
                <div
                  className="rounded-xl sm:rounded-2xl p-4 sm:p-6 group transition-all duration-300"
                  style={{
                    background: dark ? "rgba(255,255,255,0.025)" : "#ffffff",
                    border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-1">
                    <h3 className={`text-sm sm:text-base font-black ${dark ? "text-white" : "text-gray-900"}`}>{exp.title}</h3>
                    <span className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full border ${exp.badge} w-fit`}>{exp.company}</span>
                  </div>
                  <p className={`text-[10px] sm:text-[11px] mb-2 font-mono tracking-wider ${dark ? "text-slate-600" : "text-gray-400"}`}>{exp.period}</p>
                  <p className={`text-xs sm:text-sm leading-relaxed ${dark ? "text-slate-400" : "text-gray-600"}`}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
