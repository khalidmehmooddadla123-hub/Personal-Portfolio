
export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];



export const SKILLS = [
  { category: "Languages", icon: "Code2", col: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", items: ["C++", "Python", "JavaScript", "TypeScript"] },
  { category: "Frontend", icon: "Globe", col: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20", items: ["React.js", "HTML5", "CSS3", "Tailwind", "Bootstrap", "TypeScript", "DOM"] },
  { category: "Databases", icon: "Database", col: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", items: ["Supabase", "MongoDB"] },
  { category: "Libraries & Tools", icon: "Boxes", col: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20", items: ["Git", "Vercel", "TanStack Query", "Redux", "React Router Dom"] },
  { category: "Other", icon: "Cpu", col: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", items: ["REST APIs", "Cloud Deployment"] },
];

export const EXPERIENCES = [
  { title: "Frontend Developer (Trainee)", company: "Codiea.io", period: "May 2025 – Present", dot: "bg-fuchsia-500", badge: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20", desc: "Building responsive and scalable React applications. Expertise in Tailwind CSS, Redux Toolkit, and TanStack Query for real-time API integration. Collaborating with mentors to create high-performance modern UIs." },
  { title: "Geofencing Developer", company: "Tech Growth Solutions", period: "Feb 2025 – Sep 2025", dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", desc: "Developed location-based web apps using geofencing technology. Implemented map-based data visualization and smart notifications using React, Leaflet, and custom APIs." },
  { title: "Lead Generation Specialist", company: "Tech Growth Solutions", period: "Sep 2025 – Nov 2025", dot: "bg-cyan-500", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20", desc: "Built automated lead generation workflows. Collaborated with marketing teams to integrate lead analytics and optimize conversion pipelines." },
  { title: "BS Software Engineering", company: "IUB, Bahawalpur", period: "Sep 2023 – Jul 2027 (Expected)", dot: "bg-sky-500", badge: "bg-sky-500/10 text-sky-300 border-sky-500/20", desc: "CGPA 3.98/4.00. Geofencing, lead gen, and full-stack academic projects. Strong foundation in JavaScript, React, and agile software development." },
];

export const ACHIEVEMENTS = [
  { title: "10+ Frontend Projects", icon: "Rocket", grad: "from-fuchsia-500 to-violet-700", year: "Sep 2025", desc: "Built multiple real-world projects using React, Tailwind & Supabase — all deployed on Vercel." },
  { title: "Open Source Contributor", icon: "Code2", grad: "from-emerald-500 to-teal-700", year: "Aug 2025", desc: "Contributed to GitHub repos and improved UI/UX for open-source React projects." },
  { title: "Cricket Gold Medalist", icon: "Medal", grad: "from-amber-400 to-orange-600", year: "Jan 2022", desc: "Won gold medal in the college cricket tournament for outstanding performance and teamwork." },
  { title: "Portfolio Featured", icon: "Star", grad: "from-pink-500 to-rose-600", year: "Nov 2025", desc: "My React + Tailwind portfolio was showcased by a coding community for design and responsiveness." },
  { title: "Continuous Learner", icon: "Award", grad: "from-sky-500 to-blue-700", year: "Ongoing", desc: "Completed multiple React, JavaScript, and Tailwind courses through self-paced learning." },
  { title: "CGPA 3.98 / 4.00", icon: "Zap", grad: "from-violet-500 to-indigo-700", year: "2023–Now", desc: "Exceptional academic performance in BS Software Engineering at Islamia University Bahawalpur." },
];

export const COLOR_MAP = {
  rose: { grad: "from-rose-500 to-pink-600", glow: "hover:shadow-rose-500/20", badge: "bg-rose-500/10 border-rose-500/25 text-rose-300" },
  amber: { grad: "from-amber-500 to-orange-600", glow: "hover:shadow-amber-500/20", badge: "bg-amber-500/10 border-amber-500/25 text-amber-300" },
  violet: { grad: "from-violet-500 to-purple-700", glow: "hover:shadow-violet-500/20", badge: "bg-violet-500/10 border-violet-500/25 text-violet-300" },
  red: { grad: "from-red-500 to-rose-700", glow: "hover:shadow-red-500/20", badge: "bg-red-500/10 border-red-500/25 text-red-300" },
  emerald: { grad: "from-emerald-500 to-teal-700", glow: "hover:shadow-emerald-500/20", badge: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300" },
  cyan: { grad: "from-cyan-400 to-blue-600", glow: "hover:shadow-cyan-500/20", badge: "bg-cyan-500/10 border-cyan-500/25 text-cyan-300" },
  fuchsia: { grad: "from-fuchsia-500 to-pink-700", glow: "hover:shadow-fuchsia-500/20", badge: "bg-fuchsia-500/10 border-fuchsia-500/25 text-fuchsia-300" },
  sky: { grad: "from-sky-400 to-indigo-600", glow: "hover:shadow-sky-500/20", badge: "bg-sky-500/10 border-sky-500/25 text-sky-300" },
  lime: { grad: "from-lime-400 to-green-600", glow: "hover:shadow-lime-500/20", badge: "bg-lime-500/10 border-lime-500/25 text-lime-300" },
};

export const EMOJI_OPTIONS = ["🚀", "💡", "🎯", "🌐", "⚡", "🛠️", "📱", "🎨", "🔥", "💎", "🌟", "🤖", "🎮", "🧠", "⭐"];
export const COLOR_OPTIONS = ["rose", "amber", "violet", "red", "emerald", "cyan", "fuchsia", "sky", "lime"];


export function getProjectImage(title) {
  const t = title.toLowerCase();

  if (t.includes("health") || t.includes("vital") || t.includes("sync"))
    return "/images/vital-sync.png";

  if (t.includes("movie") || t.includes("film") || t.includes("popcorn") || t.includes("pop"))
    return "/images/expensetracker.png"; // if this is your movie image

  if (t.includes("ecommerce") || t.includes("shop") || t.includes("store") || t.includes("commerce"))
    return "/images/ecommerce.png";

  if (t.includes("dashboard") || t.includes("product") || t.includes("analytics") || t.includes("hub"))
    return "/images/productivityhub.png";

  if (t.includes("currency") || t.includes("convert") || t.includes("finance") || t.includes("money"))
    return "/images/currencyconverter.png";

  if (t.includes("quiz") || t.includes("learn") || t.includes("educat"))
    return "/images/quizapplication.png";

  // default fallback
  return "/images/expensetracker.png";
}


export const INITIAL_PROJECTS = [
  { 
    title: "Vital Sync", 
    description: "A responsive health & productivity app syncing user data in real time using TanStack Query for efficient state and API management.", 
    tech: ["React", "Tailwind CSS", "TanStack Query", "JavaScript"], 
    emoji: "🫀", 
    color: "rose", 
    liveLink: "https://digital-clock-ten-psi-89.vercel.app/", 
    githubLink: "https://github.com/Mahikhalid123/Digital-Clock/tree/main/src",
    imageUrl: "/images/vital-sync.png"
  },
  { 
    title: "PopCorn", 
    description: "Dynamic movie search & rating app with watchlists and routing.", 
    tech: ["React", "Tailwind CSS", "TanStack Query", "React Router DOM"], 
    emoji: "🍿", 
    color: "amber", 
    liveLink: "https://the-wild-oasis-mjkp.vercel.app/", 
    githubLink: "https://github.com/Mahikhalid123/The-Wild-Oasis",
    imageUrl: "/images/expensetracker.png"
  },
  { 
    title: "E-Commerce", 
    description: "Elegant e-commerce brand website with Redux state management.", 
    tech: ["React", "Redux", "Tailwind CSS", "JavaScript"], 
    emoji: "🛍️", 
    color: "violet", 
    liveLink: "https://ecommerce-sigma-nine-87.vercel.app/", 
    githubLink: "https://github.com/khalidmehmooddadla123-hub/Ecommerce",
    imageUrl: "/images/ecommerce.png"
  },
  { 
    title: "ProductivityHub", 
    description: "Responsive product dashboard to manage and analyze product data.", 
    tech: ["React", "Tailwind CSS", "React Router DOM", "JavaScript"], 
    emoji: "📊", 
    color: "red", 
    liveLink: "https://task-dashboard-rouge.vercel.app/", 
    githubLink: "https://github.com/khalidmehmooddadla123-hub/TaskDashboard",
    imageUrl: "/images/productivityhub.png"
  },
  { 
    title: "Currency Converter", 
    description: "Modern currency converter using APIs with real-time updates.", 
    tech: ["React", "Tailwind CSS", "TanStack Query", "JavaScript"], 
    emoji: "💱", 
    color: "emerald", 
    liveLink: "https://converter-nine-nu.vercel.app/", 
    githubLink: "https://github.com/Mahikhalid123/Converter",
    imageUrl: "/images/currencyconverter.png"
  },
  { 
    title: "Quiz Application", 
    description: "Interactive quiz app with real-time scoring and instant results.", 
    tech: ["React", "Leaflet", "JavaScript", "REST APIs"], 
    emoji: "🧠", 
    color: "cyan", 
    liveLink: "https://js-basics-m5iz.vercel.app/", 
    githubLink: "https://github.com/khalidmehmooddadla123-hub/QuizApplication",
    imageUrl: "/images/quizapplication.png"
  },
];