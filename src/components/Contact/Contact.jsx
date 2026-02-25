/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Mail, MapPin, Linkedin, Twitter, Github, Instagram, Send, CheckCircle, MessageSquare } from "lucide-react";
import { useInView, sendEmailNow } from "../../hooks";
import { toast } from "../../utils/toast";
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_KEY, OWNER_EMAIL } from "../../config";
import { useDarkModeContext } from "../../context/DarkModeContext";
import SectionLabel from "../ui/SectionLabel";

const SOCIALS = [
  { Icon:Linkedin,  href:"https://www.linkedin.com/in/khalid-mehmood-667a82372/", grad:"from-blue-500 to-blue-700",    label:"LinkedIn" },
  { Icon:Github,    href:"https://github.com/Mahikhalid123",        grad:"from-slate-600 to-slate-800",  label:"GitHub" },
  { Icon:Twitter,   href:"https://twitter.com",                     grad:"from-sky-400 to-sky-600",      label:"Twitter" },
  { Icon:Instagram, href:"https://instagram.com",                   grad:"from-pink-500 to-purple-600",  label:"Instagram" },
];

export default function Contact() {
  const { dark } = useDarkModeContext();
  const [ref, inView] = useInView(0.04);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [loading, setLoad] = useState(false);
  const [sent, setSent]    = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]:v }));

 
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    toast.error("Please fill all required fields.");
    return;
  }

  setLoad(true);

  try {
    await sendEmailNow(
      EMAILJS_SERVICE,
      EMAILJS_TEMPLATE,
      EMAILJS_KEY,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        reply_to: form.email,
      }
    );

    setSent(true);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent successfully ✅");

    setTimeout(() => setSent(false), 5000);

  } catch (error) {
    console.error("EmailJS Error:", error);
    toast.error("Failed to send message. Please try again.");
  } finally {
    setLoad(false);
  }
};
  const cardStyle = {
    background: dark ? "rgba(255,255,255,0.025)" : "#ffffff",
    border:     dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
  };
  const inputStyle = {
    background: dark ? "rgba(255,255,255,0.04)" : "#f8fafc",
    border:     dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
    color:      dark ? "#ffffff" : "#111827",
    outline:    "none",
  };
  const labelCls = dark ? "text-slate-500" : "text-gray-500";
  const headCls  = dark ? "text-white" : "text-gray-900";
  const subCls   = dark ? "text-slate-400" : "text-gray-500";

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: dark ? "#06051a" : "#ffffff" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-fuchsia-700/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <SectionLabel tag="Let's Talk" title="Get in" accent="Touch" sub="Have a project in mind? I'd love to collaborate and build something amazing." />

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6"
          style={{ opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(36px)", transition:"opacity .7s, transform .7s" }}
        >
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8" style={cardStyle}>
            <h3 className={`text-lg sm:text-xl font-black mb-5 flex items-center gap-2 ${headCls}`}>
              <Send className="w-5 h-5 text-fuchsia-500" /> Send a Message
            </h3>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-14 gap-5 text-center">
                <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 success-pop">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className={`font-black text-xl mb-1 ${headCls}`}>Message Sent! 🎉</p>
                  <p className={`text-sm ${subCls}`}>I'll get back to you as soon as possible.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${labelCls}`}>Your Name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={e => set("name", e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 rounded-xl text-sm placeholder-slate-500 focus:ring-2 focus:ring-fuchsia-500/40 transition-all"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${labelCls}`}>Your Email *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={e => set("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm placeholder-slate-500 focus:ring-2 focus:ring-fuchsia-500/40 transition-all"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${labelCls}`}>Your Message *</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={e => set("message", e.target.value)}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3 rounded-xl text-sm placeholder-slate-500 resize-none focus:ring-2 focus:ring-fuchsia-500/40 transition-all"
                    style={inputStyle}
                  />
                </div>

                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f0fdf4", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #bbf7d0" }}
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <p className={`text-[11px] ${dark ? "text-slate-500" : "text-gray-500"}`}>
                    Sends directly to{" "}
                    <span className="text-fuchsia-500 font-bold">{OWNER_EMAIL}</span>
                  </p>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3.5 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-xl shadow-lg hover:shadow-fuchsia-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm"
                >
                  {loading
                    ? <span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                    : <><Send className="w-4 h-4" />Send Message</>
                  }
                </button>
              </form>
            )}
          </div>

          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col gap-6" style={cardStyle}>
            <div>
              <h3 className={`text-lg sm:text-xl font-black mb-2 ${headCls}`}>Contact Information</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${subCls}`}>
                Reach out directly via email, WhatsApp, or social platforms below.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href={`mailto:${OWNER_EMAIL}`}
                className="flex items-center gap-4 p-3 rounded-2xl transition-all group cursor-pointer"
                style={{ border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" }}
              >
                <div className="w-11 h-11 bg-linear-to-br from-fuchsia-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${labelCls}`}>Email</p>
                  <p className={`text-xs sm:text-sm font-semibold truncate ${headCls}`}>{OWNER_EMAIL}</p>
                </div>
              </a>

              <a
                href="https://wa.me/923001234567"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-2xl transition-all group cursor-pointer"
                style={{ border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" }}
              >
                <div className="w-11 h-11 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${labelCls}`}>WhatsApp</p>
                  <p className={`text-xs sm:text-sm font-semibold ${headCls}`}>+92 306-1274238</p>
                </div>
              </a>

              <div
                className="flex items-center gap-4 p-3 rounded-2xl"
                style={{ border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" }}
              >
                <div className="w-11 h-11 bg-linear-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${labelCls}`}>Location</p>
                  <p className={`text-xs sm:text-sm font-semibold ${headCls}`}>Bahawalpur, Pakistan 🇵🇰</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className={`text-[11px] font-black uppercase tracking-widest mb-3 ${headCls}`}>Find Me Online</h4>
              <div className="flex flex-wrap gap-2.5">
                {SOCIALS.map(({ Icon, href, grad, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                    className={`w-11 h-11 bg-linear-to-br ${grad} rounded-2xl flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div
              className="p-4 rounded-2xl"
              style={{ background: dark ? "rgba(16,185,129,0.06)" : "#f0fdf4", border: dark ? "1px solid rgba(16,185,129,0.15)" : "1px solid #bbf7d0" }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className={`font-black text-sm ${dark ? "text-emerald-400" : "text-emerald-600"}`}>Currently Available</span>
              </div>
              <p className={`text-xs leading-relaxed ${dark ? "text-slate-400" : "text-emerald-700/70"}`}>
                Open for freelance, internships & full-time roles. Reply within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
