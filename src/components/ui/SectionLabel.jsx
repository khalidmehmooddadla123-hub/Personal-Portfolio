import { Sparkles } from "lucide-react";
import { useInView } from "../../hooks";
import { useDarkModeContext } from "../../context/DarkModeContext";

export default function SectionLabel({ tag, title, accent, sub }) {
  const [ref, inView] = useInView();
  const { dark } = useDarkModeContext();
  return (
    <div
      ref={ref}
      className={`text-center mb-12 sm:mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.3em] uppercase text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-4 py-2 rounded-full mb-4 sm:mb-5">
        <Sparkles className="w-3 h-3" />{tag}
      </span>
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight ${dark ? "text-white" : "text-gray-900"}`}>
        {title}{" "}
        <span className="bg-linear-to-r from-fuchsia-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
          {accent}
        </span>
      </h2>
      {sub && <p className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4 ${dark ? "text-slate-400" : "text-gray-500"}`}>{sub}</p>}
    </div>
  );
}
