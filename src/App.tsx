import About from "./components/About";
import NavBar from "./components/NavBar";
import Home from "@/components/Home";
import Project from "./components/Project";
import Contact from "./components/Contact";
import GlowingCursor from "./components/GlowCursor";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="justify-centers flex min-h-screen w-full flex-col scroll-smooth bg-zinc-100">
      {/* <GlowingCursor /> */}
      <NavBar />
      <Home />
      <About />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
