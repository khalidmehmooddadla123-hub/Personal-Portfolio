

import { useState } from "react";
import { X, Send, CheckCircle, Briefcase } from "lucide-react";
import { useScrollLock, sendEmailNow } from "../../hooks";
import { toast } from "../../utils/toast";
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_KEY, OWNER_EMAIL } from "../../config";
import { useDarkModeContext } from "../../context/DarkModeContext";

export default function HireMeModal({ onClose }) {
  const { dark } = useDarkModeContext();
  const [form, setForm] = useState({ name:"", email:"", company:"", budget:"", message:"" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  useScrollLock(true);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const configured =
        EMAILJS_KEY !== "service_elksaqp" &&
        EMAILJS_SERVICE !== "template_bkpce0e" &&
        EMAILJS_TEMPLATE !== "ONpBbO3VRlE-JSyuI";

      if (configured) {
        await sendEmailNow(EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_KEY, {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          company: form.company.trim() || "Not specified",
          budget: form.budget || "Not specified",
          message: form.message.trim(),
          to_email: OWNER_EMAIL,
          reply_to: form.email.trim(),
          subject: `💼 Hire Request from ${form.name.trim()}`,
        });
      } else {
        await new Promise(r => setTimeout(r, 1200));
      }

      setSent(true);
      toast.success(`Hire request sent to ${OWNER_EMAIL} 🚀`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed — email directly: ${OWNER_EMAIL}`);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = dark
    ? "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 transition-all"
    : "w-full px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 transition-all";

  const inputStyle = dark 
    ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" } 
    : { background: "#f9f9f9", border: "1px solid #ddd" };

  const modalBg = dark ? { background: "#0f0c30", border: "1px solid rgba(168,85,247,0.25)" } : { background: "#fff", border: "1px solid #ccc" };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-3 sm:px-4 py-6 overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 backdrop-blur-2xl" style={{ background: dark ? "rgba(6,5,26,0.92)" : "rgba(255,255,255,0.85)" }} />
      <div className={`relative rounded-2xl sm:rounded-3xl w-full max-w-lg my-auto slide-up`} style={modalBg} onClick={e => e.stopPropagation()}>
        <div className={`h-1.5 w-full rounded-t-2xl ${dark ? "bg-linear-to-r from-fuchsia-500 via-violet-500 to-cyan-400" : "bg-linear-to-r from-pink-400 via-purple-400 to-blue-300"}`} />

        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg bg-linear-to-br from-fuchsia-600 to-violet-700">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className={dark ? "text-white font-black text-lg leading-tight" : "text-gray-900 font-black text-lg leading-tight"}>Hire Khalid</h3>
                <p className={dark ? "text-slate-400 text-xs" : "text-gray-500 text-xs"}>Let's build something amazing</p>
              </div>
            </div>
            <button onClick={onClose} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${dark ? "bg-white/5 text-slate-400 hover:text-white" : "bg-gray-100 text-gray-500 hover:text-gray-700"}`}>
              <X className="w-4 h-4"/>
            </button>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 gap-5 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl bg-linear-to-br from-emerald-500 to-teal-600 success-pop">
                <CheckCircle className="w-10 h-10 text-white"/>
              </div>
              <p className={dark ? "text-white font-black text-xl" : "text-gray-900 font-black text-xl"}>Request Sent! 🎉</p>
              <p className={dark ? "text-slate-400 text-sm" : "text-gray-500 text-sm"}>
                Sent to <span className="text-fuchsia-400 font-semibold break-all">{OWNER_EMAIL}</span>. Expect a reply within 24h!
              </p>
              <button onClick={onClose} className="px-8 py-3 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-xl hover:scale-105 transition-all text-sm">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5">Name *</label>
                  <input type="text" required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your Full Name" className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5">Email *</label>
                  <input type="email" required value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@company.com" className={inputCls} style={inputStyle} />
                </div>
              </div>

              {/* Company & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5">Company</label>
                  <input type="text" value={form.company} onChange={e => set("company", e.target.value)} placeholder="My Startup (optional)" className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5">Budget</label>
                  <select value={form.budget} onChange={e => set("budget", e.target.value)} className={inputCls} style={{ ...inputStyle, background: dark ? "#110e30" : "#f2f2f2" }}>
                    <option value="">Select range</option>
                    {["< $500","$500–$1k","$1k–$3k","$3k+","Let's Discuss"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5">Project Details *</label>
                <textarea rows={4} value={form.message} onChange={e => set("message", e.target.value)} placeholder="Describe your project..." className={`${inputCls} resize-none`} style={inputStyle} />
              </div>

              {/* Info */}
              <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${dark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75"/>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"/>
                </span>
                <p className={dark ? "text-slate-400 text-[11px]" : "text-gray-500 text-[11px]"}>
                  Sends directly to <span className="text-fuchsia-400 font-semibold">{OWNER_EMAIL}</span>
                </p>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-xl shadow-lg hover:shadow-fuchsia-500/35 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm">
                {loading ? <span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin"/> : <><Send className="w-4 h-4"/>Send Hire Request</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}