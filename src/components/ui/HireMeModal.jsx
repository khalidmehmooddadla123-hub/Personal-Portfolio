import { useState } from "react";
import { X, Send, CheckCircle, Briefcase } from "lucide-react";
import { useScrollLock, sendEmailNow } from "../../hooks";
import { toast } from "../../utils/toast";
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_KEY, OWNER_EMAIL } from "../../config";

export default function HireMeModal({ onClose }) {
  const [form, setForm] = useState({ name:"", email:"", company:"", budget:"", message:"" });
  const [loading, setLoad] = useState(false);
  const [sent,    setSent] = useState(false);
  useScrollLock(true);
  const set = (k, v) => setForm(p => ({ ...p, [k]:v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoad(true);
    try {
      const configured =
        EMAILJS_KEY      !== "service_elksaqp"      &&
        EMAILJS_SERVICE  !== "template_bkpce0e"      &&
        EMAILJS_TEMPLATE !== "ONpBbO3VRlE-JSyuI";
      
      if (configured) {
        await sendEmailNow(EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_KEY, {
          from_name:  form.name.trim(),
          from_email: form.email.trim(),
          company:    form.company.trim() || "Not specified",
          budget:     form.budget        || "Not specified",
          message:    form.message.trim(),
          to_email:   OWNER_EMAIL,
          reply_to:   form.email.trim(),
          subject:    `💼 Hire Request from ${form.name.trim()}`,
        });
      } else {
        await new Promise(r => setTimeout(r, 1200));
      }
      setSent(true);
      toast.success(`Hire request sent to ${OWNER_EMAIL} 🚀`);
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error(`Failed — email directly: ${OWNER_EMAIL}`);
    } finally {
      setLoad(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 transition-all";
  const inputStyle = { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center px-3 sm:px-4 py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-2xl" style={{ background:"rgba(6,5,26,0.92)" }} />

      <div
        className="relative rounded-2xl sm:rounded-3xl w-full max-w-lg shadow-2xl my-auto slide-up"
        style={{ background:"#0f0c30", border:"1px solid rgba(168,85,247,0.25)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-linear-to-r from-fuchsia-500 via-violet-500 to-cyan-400 rounded-t-2xl sm:rounded-t-3xl" />

        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-linear-to-br from-fuchsia-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-black text-lg leading-tight">Hire Khalid</h3>
                <p className="text-slate-500 text-xs">Let's build something amazing</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all"
              style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 gap-5 text-center">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 success-pop">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-xl mb-2">Request Sent! 🎉</p>
                <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                  Sent to <span className="text-fuchsia-400 font-semibold break-all">{OWNER_EMAIL}</span>. Expect a reply within 24h!
                </p>
              </div>
              <button onClick={onClose} className="px-8 py-3 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-xl hover:scale-105 transition-all text-sm">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Name *</label>
                  <input type="text" required value={form.name} onChange={e => set("name",e.target.value)} placeholder="Your Full Name" className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Email *</label>
                  <input type="email" required value={form.email} onChange={e => set("email",e.target.value)} placeholder="you@company.com" className={inputCls} style={inputStyle} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Company</label>
                  <input type="text" value={form.company} onChange={e => set("company",e.target.value)} placeholder="My Startup (optional)" className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Budget</label>
                  <select
                    value={form.budget} onChange={e => set("budget",e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 transition-all"
                    style={{ ...inputStyle, background:"#110e30" }}
                  >
                    <option value="" style={{background:"#110e30"}}>Select range</option>
                    {["< $500","$500–$1k","$1k–$3k","$3k+","Let's Discuss"].map(o => (
                      <option key={o} value={o} style={{background:"#110e30"}}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Project Details *</label>
                <textarea required rows={4} value={form.message} onChange={e => set("message",e.target.value)}
                  placeholder="Describe your project, timeline, and what you're looking for..."
                  className={`${inputCls} resize-none`} style={inputStyle} />
              </div>

              <div
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <p className="text-slate-500 text-[11px]">
                  Sends directly to <span className="text-fuchsia-400 font-semibold">{OWNER_EMAIL}</span>
                </p>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-xl shadow-lg hover:shadow-fuchsia-500/35 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm"
              >
                {loading
                  ? <span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                  : <><Send className="w-4 h-4" />Send Hire Request</>
                }
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
