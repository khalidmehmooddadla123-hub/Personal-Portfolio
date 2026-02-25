import "./styles/animations.css";
import { useDarkModeContext } from "./context/DarkModeContext";
import Toaster      from "./components/ui/Toaster";
import Header       from "./components/Navbar/Header";
import Hero         from "./components/Hero/Hero";
import About        from "./components/About/About";
import Projects     from "./components/Projects/Projects";
import Experience   from "./components/Experience/Experience";
import Skills       from "./components/Skills/Skills";
import Achievements from "./components/Achievements/Achievements";
import Contact      from "./components/Contact/Contact";
import Footer       from "./components/Footer/Footer";

export default function App() {
  const { dark } = useDarkModeContext();

  return (
  
    <div
      data-theme={dark ? "dark" : "light"}
      style={{ background: dark ? "#06051a" : "#f8fafc" }}
      className="min-h-screen transition-colors duration-300"
    >
      <Toaster />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
