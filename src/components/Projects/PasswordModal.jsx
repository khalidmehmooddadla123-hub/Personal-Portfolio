/* eslint-disable no-unused-vars */
import { useState } from "react";
import { X, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useScrollLock } from "../../hooks";
import { toast } from "../../utils/toast";
import { ADMIN_PASSWORD } from "../../config";
export default function PasswordModal({ onSuccess, onClose }) {
  const [pw,s]=[useState(""),useState(false),useState(false)];
  const [password,setPw]=useState("");
  const [show,setShow]=useState(false);
  const [shake,setShake]=useState(false);
  const [loading,setLoading]=useState(false);
  useScrollLock(true);
  const submit=e=>{
    e.preventDefault(); setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      if(password===ADMIN_PASSWORD){onSuccess();toast.success("Admin access granted 🔐");}
      else{setShake(true);setTimeout(()=>setShake(false),500);toast.error("Wrong password.");setPw("");}
    },700);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#06051a]/85 backdrop-blur-2xl"/>
      <div className={`relative bg-[#0f0c30] border border-fuchsia-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl shadow-fuchsia-500/10 slide-up ${shake?"modal-shake":""}`} onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-linear-to-br from-fuchsia-600 to-violet-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30"><Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white"/></div>
            <div><h3 className="text-white font-black text-base sm:text-lg">Admin Access</h3><p className="text-slate-500 text-xs">Restricted area</p></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center text-slate-400 hover:text-white transition-all"><X className="w-4 h-4"/></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
            <input type={show?"text":"password"} value={password} onChange={e=>setPw(e.target.value)} placeholder="Enter admin password" autoFocus
              className="w-full pl-10 pr-11 py-3 sm:py-3.5 bg-white/4 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 text-sm transition-all"/>
            <button type="button" onClick={()=>setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">{show?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
          </div>
          <button type="submit" disabled={!password||loading}
            className="w-full py-3 sm:py-3.5 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-xl hover:shadow-xl transition-all disabled:opacity-40 flex items-center justify-center gap-2 text-sm">
            {loading?<span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin"/>:<><Lock className="w-4 h-4"/>Unlock</>}
          </button>
        </form>
        <p className="text-center text-slate-600 text-xs mt-3 sm:mt-4">Only authorized users can add projects</p>
      </div>
    </div>
  );
}
