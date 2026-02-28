

import { useState } from "react";
import { X, Plus, Image } from "lucide-react";
import { useScrollLock } from "../../hooks";
import { toast } from "../../utils/toast";
import { COLOR_MAP, EMOJI_OPTIONS, COLOR_OPTIONS, getProjectImage } from "../../data";
import { useDarkModeContext } from "../../context/DarkModeContext";

export default function AddProjectModal({ onAdd, onClose, editProject }) {
  const { dark } = useDarkModeContext(); // ✅ get dark mode state
  const isEdit = !!editProject;
  const [form, setForm] = useState(editProject ? {
    ...editProject,
    tech: Array.isArray(editProject.tech) ? editProject.tech.join(", ") : editProject.tech
  } : {
    title: "",
    description: "",
    tech: "",
    emoji: "🚀",
    color: "violet",
    liveLink: "",
    githubLink: "",
    imageUrl: ""
  });

  useScrollLock(true);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const suggestImage = () => {
    if (!form.title.trim()) { 
      toast.error("Enter a title first to suggest an image."); 
      return; 
    }
    const suggested = getProjectImage(form.title, form.emoji);
    set("imageUrl", suggested);
    toast.info("Image suggested based on your project title!");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) { 
      toast.error("Title & description required."); 
      return; 
    }

    const techArray = typeof form.tech === "string"
      ? form.tech.split(",").map(t => t.trim()).filter(Boolean)
      : form.tech;

    const imageUrl = form.imageUrl.trim() || getProjectImage(form.title, form.emoji);

    onAdd({ 
      ...form, 
      tech: techArray, 
      imageUrl, 
      id: editProject?.id || Date.now() 
    });
    onClose();
  };

  const backdropClass = dark ? "bg-[#06051a]/85" : "bg-white/80";
  const modalBgClass = dark ? "bg-[#0f0c30] border border-violet-500/20 shadow-2xl shadow-violet-500/10" 
                            : "bg-white border border-gray-200 shadow-lg shadow-gray-200/10";

  const inputBg = dark ? "bg-white/5 border border-white/10 placeholder-slate-600 text-white focus:ring-violet-500/40"
                       : "bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-violet-500/40";

  const buttonCancel = dark ? "border border-white/10 text-slate-300 hover:bg-white/5" 
                            : "border border-gray-300 text-gray-700 hover:bg-gray-100";

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-3 sm:px-4 py-4 sm:py-8 overflow-y-auto" onClick={onClose}>
      <div className={`${backdropClass} backdrop-blur-2xl absolute inset-0`} />
      <div className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 w-full max-w-lg mt-4 sm:my-auto slide-up ${modalBgClass}`} onClick={e => e.stopPropagation()}>
        <div className={`h-1 w-full rounded-t-2xl -mt-5 sm:-mt-8 mb-5 sm:mb-8 -mx-5 sm:-mx-8 ${dark ? 'bg-linear-to-r from-violet-500 via-fuchsia-500 to-cyan-500' : 'bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400'}`} />
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg bg-linear-to-br from-violet-600 to-fuchsia-600">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className={`font-black text-base sm:text-lg ${dark ? 'text-white' : 'text-gray-900'}`}>{isEdit ? "Edit Project" : "Add New Project"}</h3>
              <p className={`${dark ? 'text-slate-400' : 'text-gray-500'} text-xs`}>Admin only</p>
            </div>
          </div>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'} transition-all`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3 sm:space-y-4">
          {[{ k: "title", l: "Project Title *", ph: "My Project" }, { k: "liveLink", l: "Live URL", ph: "https://" }, { k: "githubLink", l: "GitHub URL", ph: "https://github.com/..." }].map(({ k, l, ph }) => (
            <div key={k}>
              <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>{l}</label>
              <input type="text" value={form[k] || ""} onChange={e => set(k, e.target.value)} placeholder={ph}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm transition-all ${inputBg}`} />
            </div>
          ))}

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>Description *</label>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={2} placeholder="Describe what this project does..."
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm resize-none transition-all ${inputBg}`} />
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>Tech Stack (comma separated)</label>
            <input type="text" value={typeof form.tech === "string" ? form.tech : form.tech?.join(", ") || ""} onChange={e => set("tech", e.target.value)} placeholder="React, TypeScript, Tailwind"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm transition-all ${inputBg}`} />
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>Project Image URL</label>
            <div className="flex gap-2">
              <input type="text" value={form.imageUrl || ""} onChange={e => set("imageUrl", e.target.value)} placeholder="https://images.unsplash.com/..."
                className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm transition-all ${inputBg}`} />
              <button type="button" onClick={suggestImage}
                className="px-3 py-2.5 bg-violet-500/20 border border-violet-500/30 rounded-xl text-violet-300 hover:bg-violet-500/30 transition-all text-xs font-black flex items-center gap-1 whitespace-nowrap">
                <Image className="w-3.5 h-3.5" /> Auto
              </button>
            </div>
            <p className={`text-[10px] mt-1 ${dark ? 'text-slate-500' : 'text-gray-400'}`}>Leave blank to auto-select based on project title</p>
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>Emoji Icon</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {EMOJI_OPTIONS.map(em => (
                <button type="button" key={em} onClick={() => set("emoji", em)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 text-base sm:text-lg rounded-lg transition-all ${form.emoji === em ? "bg-violet-500/30 border-2 border-violet-400 scale-110" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}>
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>Card Color</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {COLOR_OPTIONS.map(c => (
                <button type="button" key={c} onClick={() => set("color", c)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-linear-to-br ${COLOR_MAP[c]?.grad || "from-violet-500 to-purple-700"} transition-all ${form.color === c ? "ring-2 ring-white scale-110 shadow-lg" : "opacity-50 hover:opacity-90"}`} />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1 sm:pt-2">
            <button type="button" onClick={onClose} className={`flex-1 py-2.5 sm:py-3 rounded-xl text-sm font-black transition-all ${buttonCancel}`}>Cancel</button>
            <button type="submit" className="flex-1 py-2.5 sm:py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all text-sm">
              {isEdit ? "Update Project ✦" : "Add Project ✦"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}