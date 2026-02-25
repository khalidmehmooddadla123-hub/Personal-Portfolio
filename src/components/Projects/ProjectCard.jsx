import { ExternalLink, Github, Trash2 } from "lucide-react";
import { COLOR_MAP } from "../../data";

export default function ProjectCard({ project, index, inView, isAdmin, onDelete, dark }) {
  const cm = COLOR_MAP[project.color] || COLOR_MAP.violet;

  return (
    <div
      className={`group relative rounded-xl sm:rounded-2xl overflow-hidden hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl ${cm.glow} transition-all duration-400`}
      style={{
        background: dark ? "#0d0b28" : "#ffffff",
        border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
        opacity: inView?1:0,
        transform: inView?"translateY(0)":"translateY(52px)",
        transition: `opacity .6s ${Math.min(index*0.07,0.55)}s ease-out, transform .6s ${Math.min(index*0.07,0.55)}s ease-out, box-shadow .3s`,
      }}
    >
      <div className={`relative h-32 sm:h-36 bg-linear-to-br ${cm.grad} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.18),transparent_65%)]" />
        <span className="text-5xl sm:text-6xl drop-shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 select-none">
          {project.emoji}
        </span>
        <div className={`absolute inset-0 bg-linear-to-t ${dark?"from-[#0d0b28]/70":"from-white/20"} via-transparent to-transparent`} />
        {isAdmin && (
          <button
            onClick={() => onDelete(project.id)}
            className="absolute top-3 right-3 w-7 h-7 bg-red-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:scale-110 shadow-lg"
          >
            <Trash2 className="w-3.5 h-3.5 text-white" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className={`text-sm sm:text-base font-black mb-1.5 transition-colors duration-300 ${dark ? "text-white group-hover:text-fuchsia-300" : "text-gray-900 group-hover:text-fuchsia-600"}`}>
          {project.title}
        </h3>
        <p className={`text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3 ${dark ? "text-slate-400" : "text-gray-500"}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
          {project.tech.map((t, j) => (
            <span key={j} className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${cm.badge}`}>{t}</span>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-2.5">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 bg-linear-to-r ${cm.grad} text-white text-[11px] sm:text-xs font-black rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300`}>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />Live
          </a>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-black rounded-lg sm:rounded-xl transition-all duration-300 ${dark ? "border border-white/8 text-white hover:bg-white/4 hover:border-fuchsia-500/25" : "border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-fuchsia-300"}`}>
            <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />Code
          </a>
        </div>
      </div>
    </div>
  );
}
