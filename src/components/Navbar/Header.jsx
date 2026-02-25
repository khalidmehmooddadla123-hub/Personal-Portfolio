import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV_LINKS } from "../../data";
import HireMeModal from "../ui/HireMeModal";
import { useDarkModeContext } from "../../context/DarkModeContext";

function MKLogo() {
  return (
    <a href="#" className="select-none group flex items-center gap-2.5">
      <div className="relative w-8 h-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <div className="absolute inset-0 rounded-[10px] bg-linear-to-br from-fuchsia-500 via-violet-600 to-indigo-700 shadow-lg shadow-fuchsia-500/40 group-hover:shadow-fuchsia-500/70 transition-shadow duration-300" />
        <div className="absolute inset-px rounded-[9px] bg-linear-to-br from-white/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white font-black leading-none"
            style={{ fontSize: "11px", letterSpacing: "-0.05em", fontFamily: "'Sora',sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            MK
          </span>
        </div>
        <div className="absolute top-0.75 right-0.75 w-1.25 h-1.25 bg-fuchsia-200/80 rounded-full" />
      </div>
      <span className="text-sm font-black text-white hidden xs:inline-block">
        Khalid<span className="text-fuchsia-400">.</span>
      </span>
    </a>
  );
}

export default function Header() {
  const { dark, toggle } = useDarkModeContext();
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [showHireMe, setShowHireMe] = useState(false);

  useEffect(() => {
    document.title = "Khalid Mehmood | Frontend Developer";
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openHireMe  = () => { setMenuOpen(false); setShowHireMe(true); };
  const closeHireMe = () => setShowHireMe(false);

  const scrolledBg = dark
    ? "bg-[#06051a]/95 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    : "bg-white/95 border-b border-gray-200 shadow-sm";
  const navBg = scrolled ? `${scrolledBg} backdrop-blur-2xl` : "bg-transparent";

  const linkCls = dark
    ? "text-slate-400 hover:text-white"
    : "text-gray-500 hover:text-gray-900";

  const linkHoverBg = dark ? "bg-white/[0.05]" : "bg-gray-100";

  const iconBtn = dark
    ? "border-white/10 bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10"
    : "border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50";

  const mobileMenuStyle = dark
    ? { background: "rgba(6,5,26,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)" }
    : { background: "#ffffff", borderTop: "1px solid #e5e7eb", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" };

  const mobileLinkCls = dark
    ? "text-slate-300 hover:text-white hover:bg-white/[0.04]"
    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${navBg} border-b border-black`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5">

          <MKLogo />

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href}
                className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 group ${linkCls}`}>
                <span className={`absolute inset-0 rounded-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ${linkHoverBg}`} />
                <span className="relative">{link.name}</span>
              </a>
            ))}

            <button onClick={toggle} title={dark ? "Light mode" : "Dark mode"}
              className={`ml-2 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${iconBtn}`}>
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button onClick={openHireMe}
              className="ml-2 px-5 py-2.5 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white text-sm font-black rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/45 hover:scale-105 transition-all duration-300">
              Hire Me ✦
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${iconBtn}`}>
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${iconBtn}`}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-125" : "max-h-0"}`}>
          <div style={mobileMenuStyle} className="py-3 px-4 backdrop-blur-xl">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold mb-0.5 transition-all ${mobileLinkCls}`}>
                {link.name}
              </a>
            ))}
            <div className="px-1 pt-2 pb-1">
              <button onClick={openHireMe}
                className="w-full py-3.5 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-xl text-sm shadow-lg shadow-fuchsia-500/20 transition-all">
                Hire Me ✦
              </button>
            </div>
          </div>
        </div>
      </header>

      {showHireMe && <HireMeModal onClose={closeHireMe} />}
    </>
  );
}
