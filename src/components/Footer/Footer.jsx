/* eslint-disable no-unused-vars */
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useDarkModeContext } from "../../context/DarkModeContext";

const SOCIALS = [
  { I: Github, h: "https://github.com/Mahikhalid123" },
  { I: Linkedin, h: "https://www.linkedin.com/in/khalid-mehmood-667a82372/" },
  { I: Twitter, h: "https://twitter.com" },
  { I: Instagram, h: "https://instagram.com" },
];

export default function Footer() {
  const { dark } = useDarkModeContext();

  return (
    <footer
      className="border-t py-8 sm:py-10 transition-colors duration-300"
      style={{
        background: dark ? "#040310" : "#ffffff",
        borderColor: dark ? "rgba(255,255,255,0.04)" : "#e5e7eb",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        {/* MK Logo */}
        <a href="#">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 rounded-lg bg-linear-to-br from-fuchsia-500 via-violet-600 to-indigo-700 shadow-md shadow-fuchsia-500/30" />
                <div className="absolute inset-px rounded-[7px] bg-linear-to-br from-white/15 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-white font-black leading-none"
                    style={{ fontSize: "10px", letterSpacing: "-0.05em" }}
                  >
                    MK
                  </span>
                </div>
              </div>
              <span
                className={`text-sm font-black ${dark ? "text-white" : "text-gray-900"}`}
              >
                Khalid<span className="text-fuchsia-400">.</span>
              </span>
            </div>
            <p
              className={`text-xs ${dark ? "text-slate-600" : "text-gray-400"}`}
            >
              © 2025 Khalid Mehmood. All rights reserved.
            </p>
          </div>
        </a>

        <div className="flex gap-2.5">
          {SOCIALS.map(({ I, h }, i) => (
            <a
              key={i}
              href={h}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: dark ? "rgba(255,255,255,0.03)" : "#f9fafb",
                border: dark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid #e5e7eb",
                color: dark ? "#64748b" : "#9ca3af",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = dark ? "#ffffff" : "#a855f7";
                e.currentTarget.style.borderColor = dark
                  ? "rgba(168,85,247,0.3)"
                  : "#d8b4fe";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = dark ? "#64748b" : "#9ca3af";
                e.currentTarget.style.borderColor = dark
                  ? "rgba(255,255,255,0.07)"
                  : "#e5e7eb";
              }}
            >
              <I className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        <p className={`text-xs ${dark ? "text-slate-600" : "text-gray-400"}`}>
          Built with <span className="text-fuchsia-500">♥</span> using React &
          Tailwind
        </p>
      </div>
    </footer>
  );
}
