import About from "./components/About";
import NavBar from "./components/NavBar";
import Home from "@/components/Home";
import Project from "./components/Project";
import Contact from "./components/Contact";
// import GlowingCursor from "@/components/GlowCursor";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import type { AppData } from "./types";
import {
  getAbout,
  getContact,
  getExperience,
  getHome,
  getProjects,
  getTechStack,
} from "./services/strapi";
import Experience from "./components/Experience";

function App() {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getHome(),
      getAbout(),
      getTechStack(),
      getProjects(),
      getExperience(), 
      getContact(),
    ])
      .then(([home, about, techStack, projects, experience, contact]) => {
        setAppData({ home, about, techStack, projects, experience, contact });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error || !appData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="justify-centers flex min-h-screen w-full flex-col scroll-smooth bg-black">
      {/* <GlowingCursor /> */}
      <NavBar />
      <Home homeData={appData.home} />
      <About about={appData.about} techStacks={appData.techStack} />
      <Project projects={appData.projects} />
      <Experience experience={appData.experience}/>
      <Contact contact={appData.contact} />
      <Footer />
    </div>
  );
}

export default App;
