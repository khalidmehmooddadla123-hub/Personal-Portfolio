import { useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { useInView } from "../../hooks";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { toast } from "../../utils/toast";
import { INITIAL_PROJECTS } from "../../data";
import SectionLabel from "../ui/SectionLabel";
import ProjectCard from "./ProjectCard";
import PasswordModal from "./PasswordModal";
import AddProjectModal from "./AddProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [showPW,  setShowPW]  = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ref, inView] = useInView(0.02);
  const { dark } = useDarkModeContext();

  const handleAdminClick = () => isAdmin ? setShowAdd(true) : setShowPW(true);
  const handlePWOK       = () => { setIsAdmin(true); setShowPW(false); setShowAdd(true); };
  const handleAdd        = p  => setProjects(prev => [p, ...prev]);
  const handleDelete     = id => { setProjects(p => p.filter(x => x.id !== id)); toast.info("Project removed."); };

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: dark ? "#06051a" : "#f8fafc" }}
    >
      <div className="absolute top-0 -right-64 w-125 h-125 bg-fuchsia-700/8 rounded-full blur-3xl pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-100 h-100 bg-cyan-700/8 rounded-full blur-3xl pulse-slow pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center mb-10 sm:mb-14">
          <SectionLabel tag="My Work" title="Featured" accent="Projects" sub="Real-world applications built with the modern React ecosystem." />
          <button
            onClick={handleAdminClick}
            className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-black text-sm transition-all duration-300 hover:scale-105 ${
              isAdmin
                ? "bg-linear-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
                : dark
                  ? "border border-white/10 text-slate-300 hover:bg-white/4"
                  : "border border-gray-200 text-gray-600 bg-white hover:border-violet-300"
            }`}
          >
            {isAdmin ? <><Sparkles className="w-4 h-4" />Add New Project</> : <><Lock className="w-4 h-4" />Add Project (Admin)</>}
          </button>
          {isAdmin && <p className="text-xs text-fuchsia-400/50 font-mono mt-2">🔐 Admin — hover cards to delete</p>}
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} isAdmin={isAdmin} onDelete={handleDelete} dark={dark} />
          ))}
        </div>
      </div>
      {showPW  && <PasswordModal   onSuccess={handlePWOK} onClose={() => setShowPW(false)} />}
      {showAdd && <AddProjectModal onAdd={handleAdd}      onClose={() => setShowAdd(false)} />}
    </section>
  );
}
