// import { useState, useEffect, useRef } from "react";
// import { ArrowRight, Layers, ChevronDown } from "lucide-react";
// import { useTypewriter } from "../../hooks";
// import { useDarkModeContext } from "../../context/DarkModeContext";

// const ROLES = ["Frontend Developer","React Specialist","Software Engineer","Problem Solver"];

// export default function Hero() {
//   const { dark } = useDarkModeContext();
//   const particles = useRef(
//     Array.from({ length: 40 }, (_, i) => ({
//       id: i, x: Math.random()*100, y: Math.random()*100,
//       s: Math.random()*1.5+0.5, d: Math.random()*20+12,
//       dl: Math.random()*15, o: dark ? Math.random()*0.3+0.05 : Math.random()*0.12+0.03,
//     }))
//   ).current;

//   const typed = useTypewriter(ROLES);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

//   return (
//     <section
//       className="relative min-h-screen flex items-center justify-center overflow-hidden"
//       style={{ background: dark ? "#06051a" : "#0f0a2a" }}
//     >
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {particles.map(p => (
//           <div key={p.id} className="absolute rounded-full bg-white particle-float"
//             style={{ left:`${p.x}%`, top:`${p.y}%`, width:`${p.s}px`, height:`${p.s}px`, opacity:p.o, animationDuration:`${p.d}s`, animationDelay:`${p.dl}s` }} />
//         ))}
//       </div>

//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_70%_at_60%_-5%,rgba(168,85,247,0.22),transparent_65%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_-5%_100%,rgba(34,211,238,0.1),transparent_65%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_110%_55%,rgba(236,72,153,0.1),transparent_65%)]" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28 flex flex-col lg:flex-row items-center gap-10 sm:gap-14 lg:gap-20 w-full">

//         <div className={`flex-1 text-center lg:text-left space-y-5 sm:space-y-6 transition-all duration-1000 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-14"}`}>
//           <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 bg-white/6 border border-white/10 rounded-full text-xs sm:text-sm text-slate-300 font-semibold backdrop-blur-sm">
//             <span className="relative flex h-2.5 w-2.5">
//               <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
//               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
//             </span>
//             Open to opportunities
//           </div>

//           <div>
//             <p className="text-fuchsia-400 font-black tracking-[0.25em] text-xs uppercase mb-2">Hello, I'm</p>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight">
//               Khalid<br />
//               <span className="bg-linear-to-r from-fuchsia-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent gradient-animate">
//                 Mehmood
//               </span>
//             </h1>
//           </div>

//           <div className="flex items-center gap-2 justify-center lg:justify-start min-h-8">
//             <span className="text-slate-500 font-mono text-lg sm:text-xl select-none">&gt;</span>
//             <span className="text-base sm:text-xl md:text-2xl font-black text-slate-200 font-mono">
//               {typed}<span className="inline-block w-0.5 h-5 sm:h-6 bg-fuchsia-400 align-middle ml-0.5 cursor-blink" />
//             </span>
//           </div>

//           <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
//             Building scalable web applications with modern JavaScript frameworks. Turning complex problems into elegant, efficient solutions.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
//             <a href="#contact"
//               className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-2xl shadow-xl shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:scale-105 transition-all duration-300 text-sm sm:text-base">
//               Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </a>
//             <a href="#projects"
//               className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 border border-white/15 text-white font-black rounded-2xl hover:bg-white/6 hover:border-fuchsia-500/30 transition-all duration-300 text-sm sm:text-base">
//               <Layers className="w-4 h-4 text-fuchsia-400" /> View Projects
//             </a>
//           </div>

//           <div className="flex flex-wrap gap-5 sm:gap-8 justify-center lg:justify-start pt-2">
//             {[["10+","Projects"],["3.98","CGPA"],["2+","Companies"],["1+","Yr Exp"]].map(([n,l]) => (
//               <div key={l} className="text-center cursor-default group">
//                 <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">{n}</div>
//                 <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{l}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={`shrink-0 transition-all duration-1000 delay-200 ${visible?"opacity-100 scale-100":"opacity-0 scale-90"}`}>
//           <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
//             <div className="absolute inset-0 rounded-full border border-fuchsia-500/20 ring-spin" />
//             <div className="absolute inset-4 rounded-full border border-violet-500/15 ring-spin-rev" />
//             <div className="absolute inset-8 rounded-full border border-cyan-500/10 ring-spin" style={{animationDuration:"22s"}} />
//              <div className="absolute inset-10 sm:inset-12 md:inset-14 rounded-full overflow-hidden border-2 border-fuchsia-500/30 shadow-2xl shadow-violet-500/40 img-float bg-linear-to-br from-fuchsia-600 via-violet-600 to-indigo-700">
             
//               <img src="/images/Photo.jpg" alt="Khalid Mehmood" className="w-full h-full object-cover object-top" onError={e => { e.currentTarget.style.display = "none"; }} />
             
//             </div>
//             <div className="absolute inset-10 sm:inset-14 rounded-full bg-linear-to-br from-fuchsia-600 to-violet-700 opacity-40 blur-3xl pulse-slow" />

           

//             {[0,90,180,270].map(d => (
//               <div key={d} className="absolute inset-0 ring-spin" style={{transform:`rotate(${d}deg)`,animationDuration:"14s"}}>
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-linear-to-br from-fuchsia-400 to-violet-500 rounded-full shadow-lg shadow-fuchsia-500/50" />
//               </div>
//             ))}

//             <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 border border-fuchsia-500/25 rounded-2xl px-3 py-2 shadow-2xl float-badge" style={{background:"#0e0c2e"}}>
//               <span className="text-xs font-black text-white whitespace-nowrap">CGPA <span className="text-fuchsia-400">3.98</span></span>
//             </div>
//             <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 border border-cyan-500/25 rounded-2xl px-3 py-2 shadow-2xl float-badge" style={{background:"#0e0c2e",animationDelay:"1.2s"}}>
//               <span className="text-xs font-black text-white whitespace-nowrap"><span className="text-cyan-400">10+</span> Projects</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <a href="#about" className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors bounce-arrow cursor-pointer select-none">
//         <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
//         <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
//       </a>
//     </section>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { ArrowRight, Layers, ChevronDown } from "lucide-react";
import { useTypewriter } from "../../hooks";
import { useDarkModeContext } from "../../context/DarkModeContext";

const ROLES = ["Frontend Developer", "React Specialist", "Software Engineer", "Problem Solver"];

export default function Hero() {
  const { dark } = useDarkModeContext();

  // Particles
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 1.5 + 0.5,
      d: Math.random() * 20 + 12,
      dl: Math.random() * 15,
      o: dark ? Math.random() * 0.3 + 0.05 : Math.random() * 0.2 + 0.1,
    }))
  ).current;

  const typed = useTypewriter(ROLES);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Overlay gradients for dark/light mode
  const overlayGradient1 = dark
    ? "rgba(168,85,247,0.22)"
    : "rgba(168,85,247,0.12)";
  const overlayGradient2 = dark
    ? "rgba(34,211,238,0.1)"
    : "rgba(34,211,238,0.05)";
  const overlayGradient3 = dark
    ? "rgba(236,72,153,0.1)"
    : "rgba(236,72,153,0.05)";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{ background: dark ? "#06051a" : "#f9f9f9" }}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full particle-float"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s}px`,
              height: `${p.s}px`,
              opacity: p.o,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.dl}s`,
              background: dark ? "#fff" : "#000",
            }}
          />
        ))}
      </div>

      {/* Overlay gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 140% 70% at 60% -5%, ${overlayGradient1}, transparent 65%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at -5% 100%, ${overlayGradient2}, transparent 65%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 110% 55%, ${overlayGradient3}, transparent 65%)`,
          }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem]"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
            opacity: dark ? 0.05 : 0.02,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28 flex flex-col lg:flex-row items-center gap-10 sm:gap-14 lg:gap-20 w-full">
        {/* Text */}
        <div
          className={`flex-1 text-center lg:text-left space-y-5 sm:space-y-6 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
          }`}
        >
          <div
            className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 border rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm ${
              dark
                ? "bg-white/6 border-white/10 text-slate-300"
                : "bg-black/6 border-black/10 text-slate-700"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            Open to opportunities
          </div>

          <div>
            <p className={`font-black tracking-[0.25em] text-xs uppercase mb-2 ${dark ? "text-fuchsia-400" : "text-purple-600"}`}>
              Hello, I'm
            </p>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.04] tracking-tight ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Khalid<br />
              <span className="bg-linear-to-r from-fuchsia-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent gradient-animate">
                Mehmood
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 justify-center lg:justify-start min-h-8">
            <span className={`${dark ? "text-slate-500" : "text-slate-600"} font-mono text-lg sm:text-xl select-none`}>
              &gt;
            </span>
            <span className={`text-base sm:text-xl md:text-2xl font-black font-mono ${dark ? "text-slate-200" : "text-gray-900"}`}>
              {typed}
              <span className="inline-block w-0.5 h-5 sm:h-6 bg-fuchsia-400 align-middle ml-0.5 cursor-blink" />
            </span>
          </div>

          <p className={`${dark ? "text-slate-400" : "text-gray-700"} text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0`}>
            Building scalable web applications with modern JavaScript frameworks. Turning complex problems into elegant, efficient solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-linear-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-2xl shadow-xl shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 border border-white/15 text-white font-black rounded-2xl hover:bg-white/6 hover:border-fuchsia-500/30 transition-all duration-300 text-sm sm:text-base"
            >
              <Layers className="w-4 h-4 text-fuchsia-400" /> View Projects
            </a>
          </div>

          <div className="flex flex-wrap gap-5 sm:gap-8 justify-center lg:justify-start pt-2">
            {[["10+", "Projects"], ["3.98", "CGPA"], ["2+", "Companies"], ["1+", "Yr Exp"]].map(([n, l]) => (
              <div key={l} className="text-center cursor-default group">
                <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">{n}</div>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className={`shrink-0 transition-all duration-1000 delay-200 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
            <div
              className="absolute inset-0 rounded-full border ring-spin"
              style={{ borderColor: dark ? "rgba(248,113,255,0.2)" : "rgba(148,163,184,0.2)" }}
            />
            <div
              className="absolute inset-4 rounded-full border ring-spin-rev"
              style={{ borderColor: dark ? "rgba(139,92,246,0.15)" : "rgba(203,213,225,0.15)" }}
            />
            <div
              className="absolute inset-8 rounded-full border ring-spin"
              style={{ borderColor: dark ? "rgba(6,182,212,0.1)" : "rgba(203,213,225,0.1)", animationDuration: "22s" }}
            />

            <div className="absolute inset-10 sm:inset-12 md:inset-14 rounded-full overflow-hidden border-2 shadow-2xl img-float"
                 style={{
                   borderColor: dark ? "rgba(248,113,255,0.3)" : "rgba(203,213,225,0.3)",
                   background: dark ? "linear-gradient(135deg,#a855f7,#8b5cf6,#6366f1)" : "linear-gradient(135deg,#e0e7ff,#f0fdfa,#fef3c7)"
                 }}
            >
              <img
                src="/images/Photo.jpg"
                alt="Khalid Mehmood"
                className="w-full h-full object-cover object-top"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="absolute inset-10 sm:inset-14 rounded-full opacity-40 blur-3xl pulse-slow"
                 style={{ background: dark ? "linear-gradient(135deg,#a855f7,#8b5cf6)" : "linear-gradient(135deg,#f3f4f6,#e5e7eb)" }}
            />

            {[0, 90, 180, 270].map((d) => (
              <div key={d} className="absolute inset-0 ring-spin" style={{ transform: `rotate(${d}deg)`, animationDuration: "14s" }}>
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
                  style={{ width: "2.5px", height: "2.5px", background: dark ? "linear-gradient(135deg,#f0f,#8b5cf6)" : "linear-gradient(135deg,#6366f1,#a5b4fc)" }}
                />
              </div>
            ))}

            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 border rounded-2xl px-3 py-2 shadow-2xl float-badge"
                 style={{ background: dark ? "#0e0c2e" : "#f9fafb", borderColor: dark ? "rgba(248,113,255,0.25)" : "rgba(203,213,225,0.3)" }}
            >
              <span className={`text-xs font-black whitespace-nowrap ${dark ? "text-white" : "text-gray-900"}`}>
                CGPA <span className="text-fuchsia-400">3.98</span>
              </span>
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 border rounded-2xl px-3 py-2 shadow-2xl float-badge"
                 style={{ background: dark ? "#0e0c2e" : "#f9fafb", borderColor: dark ? "rgba(6,182,212,0.25)" : "rgba(203,213,225,0.3)", animationDelay: "1.2s" }}
            >
              <span className={`text-xs font-black whitespace-nowrap ${dark ? "text-white" : "text-gray-900"}`}>
                <span className="text-cyan-400">10+</span> Projects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down arrow */}
      <a
        href="#about"
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-colors bounce-arrow cursor-pointer select-none ${
          dark ? "text-slate-600 hover:text-slate-400" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
    </section>
  );
}