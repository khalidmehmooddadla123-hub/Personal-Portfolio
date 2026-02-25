import { useState } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { _registerToastSetter } from "../../utils/toast";

export default function Toaster() {
  const [toasts, setToasts] = useState([]);
  _registerToastSetter(setToasts);
  const ICONS  = { success: CheckCircle, error: AlertCircle, info: Info };
  const STYLES = {
    success: "border-emerald-500/40 bg-emerald-950/90 text-emerald-300",
    error:   "border-red-500/40 bg-red-950/90 text-red-300",
    info:    "border-fuchsia-500/40 bg-fuchsia-950/90 text-fuchsia-300",
  };
  return (
    <div className="fixed top-4 right-3 sm:right-4 z-9999 flex flex-col gap-3 w-[calc(100%-1.5rem)] max-w-[320px] pointer-events-none">
      {toasts.map((t, i) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div key={t.id} style={{ animationDelay: `${i*30}ms` }}
            className={`pointer-events-auto toast-in flex items-start gap-3 px-4 py-3 rounded-2xl border backdrop-blur-2xl shadow-2xl ${STYLES[t.type]}`}>
            <Icon className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="text-sm font-semibold leading-snug text-white/90 flex-1">{t.message}</span>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} className="text-white/30 hover:text-white transition-colors shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
