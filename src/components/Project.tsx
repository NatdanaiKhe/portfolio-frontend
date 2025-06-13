import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { type Project } from "@/types";
import { getProject } from "@/services/strapi";
function Project() {
  const [projects, setProjects] = useState<Project[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProject();
        setProjects(data);
      } catch (err) {
        setError("Failed to fetch home data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !projects) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }
  return (
    <section
      id="projects"
      className="flex h-auto min-h-[calc(100svh-65px)] w-full flex-col items-center justify-center p-4 pt-16 md:px-12"
    >
      <div className="container mx-auto flex h-full w-full flex-col">
        <h1 className="text-center text-4xl font-bold">Projects</h1>
        <p className="mt-4 text-center text-sm text-zinc-700">
          Here are some of my recent projects. Each one presented unique
          challenges that helped me grow.
        </p>

        <div className="mt-4 grid h-fit w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
