

import { useState } from "react";
import { X, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useScrollLock } from "../../hooks";
import { toast } from "../../utils/toast";
import { ADMIN_PASSWORD } from "../../config";
import { useDarkModeContext } from "../../context/DarkModeContext";

export default function PasswordModal({ onSuccess, onClose }) {
  const { dark } = useDarkModeContext();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  useScrollLock(true);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (password === ADMIN_PASSWORD) {
        onSuccess();
        toast.success("Admin access granted 🔐");
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        toast.error("Wrong password.");
        setPassword("");
      }
    }, 700);
  };

  const backdropClass = dark ? "bg-[#06051a]/85" : "bg-white/80";
  const modalBgClass = dark ? "bg-[#0f0c30] border border-fuchsia-500/20 shadow-2xl shadow-fuchsia-500/10" 
                            : "bg-white border border-gray-200 shadow-lg shadow-gray-200/10";
  const inputCls = dark 
    ? "w-full pl-10 pr-11 py-3 bg-white/4 border border-white/10 text-white placeholder-slate-600 focus:ring-fuchsia-500/40 rounded-xl text-sm transition-all"
    : "w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-fuchsia-500/40 rounded-xl text-sm transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4" onClick={onClose}>
      <div className={`absolute inset-0 backdrop-blur-2xl ${backdropClass}`} />
      <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm slide-up ${modalBgClass} ${shake ? "modal-shake" : ""}`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-linear-to-br from-fuchsia-600 to-violet-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className={dark ? "text-white font-black text-base sm:text-lg" : "text-gray-900 font-black text-base sm:text-lg"}>Admin Access</h3>
              <p className={dark ? "text-slate-400 text-xs" : "text-gray-500 text-xs"}>Restricted area</p>
            </div>
          </div>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${dark ? "bg-white/4 text-slate-400 hover:text-white" : "bg-gray-100 text-gray-500 hover:text-gray-700"}`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className={inputCls}
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button type="submit" disabled={!password || loading} 
            className={`w-full py-3 sm:py-3.5 font-black rounded-xl text-sm flex items-center justify-center gap-2 transition-all ${dark ? "bg-linear-to-r from-fuchsia-600 to-violet-600 text-white hover:shadow-xl" : "bg-linear-to-r from-fuchsia-500 to-violet-500 text-white hover:shadow-lg"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {loading ? <span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin"/> : <><Lock className="w-4 h-4"/>Unlock</>}
          </button>
        </form>
        <p className={`text-center text-xs mt-3 sm:mt-4 ${dark ? "text-slate-500" : "text-gray-500"}`}>Only authorized users can add projects</p>
      </div>
    </div>
  );
}