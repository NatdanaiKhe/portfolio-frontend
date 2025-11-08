import { Suspense, lazy } from "react";
import NavBar from "./components/NavBar";
import Home from "@/components/Home";
import { Loader } from "lucide-react";
import { useAppData } from "./hooks/useAppData";

// Lazy-loaded sections
const About = lazy(() => import("./components/About"));
const Project = lazy(() => import("./components/Project"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

function App() {
  const { data: appData, error, isLoading } = useAppData();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error || !appData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Failed to load data
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col scroll-smooth bg-black">
      <NavBar />
      <Home homeData={appData.home} />

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-10">
            <Loader className="animate-spin" size={24} />
          </div>
        }
      >
        <About about={appData.about} techStacks={appData.techStack} />
        <Project projects={appData.projects} />
        <Experience experience={appData.experience} />
        <Contact contact={appData.contact} />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
