import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useScrollLock } from "../../hooks";
import { toast } from "../../utils/toast";
import { COLOR_MAP, EMOJI_OPTIONS, COLOR_OPTIONS } from "../../data";
export default function AddProjectModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ title:"", description:"", tech:"", emoji:"🚀", color:"fuchsia", liveLink:"", githubLink:"" });
  useScrollLock(true);
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submit=e=>{
    e.preventDefault();
    if(!form.title||!form.description){toast.error("Title & description required.");return;}
    onAdd({...form,tech:form.tech.split(",").map(t=>t.trim()).filter(Boolean),id:Date.now()});
    toast.success(`"${form.title}" added! 🎉`);onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-3 sm:px-4 py-4 sm:py-8 overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-[#06051a]/85 backdrop-blur-2xl"/>
      <div className="relative bg-[#0f0c30] border border-violet-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 w-full max-w-lg shadow-2xl shadow-violet-500/10 mt-4 sm:my-auto slide-up" onClick={e=>e.stopPropagation()}>
        <div className="h-1 w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-t-2xl sm:rounded-t-3xl -mt-5 sm:-mt-8 mb-5 sm:mb-8 -mx-5 sm:-mx-8"/>
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"><Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white"/></div>
            <div><h3 className="text-white font-black text-base sm:text-lg">Add New Project</h3><p className="text-slate-500 text-xs">Admin only</p></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center text-slate-400 hover:text-white transition-all"><X className="w-4 h-4"/></button>
        </div>
        <form onSubmit={submit} className="space-y-3 sm:space-y-4">
          {[{k:"title",l:"Project Title *",ph:"My Project"},{k:"liveLink",l:"Live URL",ph:"https://"},{k:"githubLink",l:"GitHub URL",ph:"https://github.com/..."}].map(({k,l,ph})=>(
            <div key={k}>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{l}</label>
              <input type="text" value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={ph}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/4 border border-white/8 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm transition-all"/>
            </div>
          ))}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Description *</label>
            <textarea value={form.description} onChange={e=>set("description",e.target.value)} rows={2} placeholder="Describe what this project does..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/4 border border-white/8 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm resize-none transition-all"/>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Tech Stack (comma separated)</label>
            <input type="text" value={form.tech} onChange={e=>set("tech",e.target.value)} placeholder="React, TypeScript, Tailwind"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/4 border border-white/8 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm transition-all"/>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Emoji Icon</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {EMOJI_OPTIONS.map(em=>(
                <button type="button" key={em} onClick={()=>set("emoji",em)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 text-base sm:text-lg rounded-lg sm:rounded-xl transition-all ${form.emoji===em?"bg-violet-500/30 border-2 border-violet-400 scale-110":"bg-white/4 border border-white/6 hover:bg-white/10"}`}>
                  {em}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Card Color</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {COLOR_OPTIONS.map(c=>(
                <button type="button" key={c} onClick={()=>set("color",c)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-linear-to-br ${COLOR_MAP[c]?.grad||"from-violet-500 to-purple-700"} transition-all ${form.color===c?"ring-2 ring-white scale-110 shadow-lg":"opacity-50 hover:opacity-90"}`}/>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-1 sm:pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 sm:py-3 border border-white/10 text-slate-300 font-black rounded-xl hover:bg-white/4 transition-all text-sm">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 sm:py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all text-sm">Add Project ✦</button>
          </div>
        </form>
      </div>
    </div>
  );
}
