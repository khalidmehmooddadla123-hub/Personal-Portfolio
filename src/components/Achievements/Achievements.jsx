import { Rocket, Code2, Medal, Star, Award, Zap } from "lucide-react";
import { useInView } from "../../hooks";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { ACHIEVEMENTS } from "../../data";
import SectionLabel from "../ui/SectionLabel";
const ICON_MAP = { Rocket, Code2, Medal, Star, Award, Zap };

export default function Achievements() {
  const [ref, inView] = useInView(0.03);
  const { dark } = useDarkModeContext();

  return (
    <section
      id="achievements"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: dark ? "#08071e" : "#f8fafc" }}
    >
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-amber-700/8 rounded-full blur-3xl pulse-slow pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel tag="Milestones" title="My" accent="Achievements" />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Zap;
            return (
              <div
                key={i}
                className="group rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-400 overflow-hidden cursor-default relative"
                style={{
                  background: dark ? "rgba(255,255,255,0.025)" : "#ffffff",
                  border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                  opacity: inView?1:0,
                  transform: inView?"translateY(0)":"translateY(36px)",
                  transition: `opacity .6s ${i*0.1}s ease-out, transform .6s ${i*0.1}s ease-out, box-shadow .4s`,
                }}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${item.grad} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br ${item.grad} mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xs sm:text-sm font-black mb-1.5 ${dark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                <p className={`text-[11px] sm:text-xs leading-relaxed mb-3 ${dark ? "text-slate-500" : "text-gray-500"}`}>{item.desc}</p>
                <span
                  className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full ${dark ? "text-slate-500" : "text-gray-400"}`}
                  style={{ background: dark ? "rgba(255,255,255,0.04)" : "#f1f5f9", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0" }}
                >
                  {item.year}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
