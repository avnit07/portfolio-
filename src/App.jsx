import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import CursorSpotlight from "./components/CursorSpotlight";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c16] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-cyan-500/20 selection:text-cyan-700 dark:selection:text-cyan-300">
        {/* Top Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Ambient Mouse Tracking Spotlight */}
        <CursorSpotlight />

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Sections */}
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Back-To-Top Button */}
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
