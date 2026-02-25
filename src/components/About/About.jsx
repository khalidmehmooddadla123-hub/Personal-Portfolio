import { useInView } from "../../hooks";
import { useDarkModeContext } from "../../context/DarkModeContext";
import SectionLabel from "../ui/SectionLabel";

const CARDS = [
  {
    title: "College",
    place: "Mudrasa-Tul-Binat College, Sadiqabad",
    sub: "2020 – 2022",
    topBorder: "border-t-fuchsia-500",
    tx: "text-fuchsia-400",
  },
  {
    title: "University",
    place: "IUB, Bahawalpur",
    sub: "BS Software Engineering • 2023–2027",
    topBorder: "border-t-violet-500",
    tx: "text-violet-400",
    extra: "CGPA: 3.98 / 4.00",
  },
  {
    title: "Frontend Course",
    place: "React.js · Tailwind · TypeScript",
    sub: "Modern libraries & ES6+ tooling",
    topBorder: "border-t-cyan-400",
    tx: "text-cyan-400",
  },
  {
    title: "Software House",
    place: "Codiea.io — Frontend Developer",
    sub: "React · Tailwind · Shadcn · APIs",
    topBorder: "border-t-emerald-500",
    tx: "text-emerald-400",
  },
  {
    title: "Personal Projects",
    place: "10+ Real-world Applications",
    sub: "React · Redux · TanStack · Supabase",
    topBorder: "border-t-amber-400",
    tx: "text-amber-400",
  },
];

export default function About() {
  const [ref, inView] = useInView(0.04);
  const { dark } = useDarkModeContext();

  return (
    <section
      id="about"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: dark ? "#08071e" : "#ffffff" }}
    >
      <div className="absolute -top-48 -right-48 w-100 h-100 bg-violet-700/10 rounded-full blur-3xl pulse-slow pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel
          tag="Who I Am"
          title="About"
          accent="Me"
          sub="A passionate frontend developer from Bahawalpur building modern web experiences."
        />
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {CARDS.map((c, i) => (
            <div
              key={i}
              className={`group border-t-2 ${c.topBorder} rounded-2xl p-5 sm:p-6 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default`}
              style={{
                background: dark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                border: dark
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid #e2e8f0",
                borderTopWidth: "2px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(36px)",
                transition: `opacity .6s ${i * 0.09}s ease-out, transform .6s ${i * 0.09}s ease-out, box-shadow .3s`,
              }}
            >
              <h3
                className={`text-[10px] font-black uppercase tracking-[0.22em] ${c.tx} mb-2`}
              >
                {c.title}
              </h3>
              <p
                className={`font-bold text-sm sm:text-base mb-1 ${dark ? "text-white" : "text-gray-900"}`}
              >
                {c.place}
              </p>
              <p
                className={`text-xs sm:text-sm ${dark ? "text-slate-500" : "text-gray-500"}`}
              >
                {c.sub}
              </p>
              {c.extra && (
                <p className={`${c.tx} font-black text-sm mt-1.5`}>{c.extra}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
