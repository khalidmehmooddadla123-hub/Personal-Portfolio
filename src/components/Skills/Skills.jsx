import { Code2, Globe, Database, Cpu, Boxes } from "lucide-react";
import { useInView } from "../../hooks";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { SKILLS } from "../../data";
import SectionLabel from "../ui/SectionLabel";
const ICON_MAP = { Code2, Globe, Database, Cpu, Boxes };

export default function Skills() {
  const [ref, inView] = useInView(0.03);
  const { dark } = useDarkModeContext();

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: dark ? "#06051a" : "#ffffff" }}
    >
      <div className="absolute -top-32 -left-48 w-100 h-100 bg-violet-700/10 rounded-full blur-3xl pulse-slow pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel tag="Tech Stack" title="My" accent="Skills" sub="Technologies and tools I use to build outstanding web experiences." />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILLS.map((skill, i) => {
            const Icon = ICON_MAP[skill.icon] || Code2;
            return (
              <div
                key={i}
                className="group rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300 cursor-default"
                style={{
                  background: dark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                  border: dark ? `1px solid rgba(255,255,255,0.07)` : "1px solid #e2e8f0",
                  opacity: inView?1:0,
                  transform: inView?"translateY(0)":"translateY(32px)",
                  transition: `opacity .6s ${i*0.1}s ease-out, transform .6s ${i*0.1}s ease-out, box-shadow .3s`,
                }}
              >
                <div
                  className="flex items-center gap-3 mb-4 pb-3"
                  style={{ borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" }}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${skill.col}`}
                    style={{ background: dark ? "rgba(255,255,255,0.04)" : "#eef2ff" }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.18em] ${dark ? "text-white" : "text-gray-900"}`}>{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className={`text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full transition-colors cursor-default ${dark ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-fuchsia-700"}`}
                      style={{ background: dark ? "rgba(255,255,255,0.04)" : "#f1f5f9", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #e2e8f0" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
