import { Github, SquareArrowOutUpRight } from "lucide-react";
import Tag from "./Tag";
import type { ProjectType } from "@/types";

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <div className="h-1/2 w-full md:h-2/5">
        <a href={project.demo} target="_blank" rel="noopener noreferrer">
          <img
            src={project.preview_image.url}
            alt={project.name}
            className="h-full w-full rounded-t-2xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </a>
      </div>
      <div className="flex h-auto w-full flex-col gap-2 p-4 md:h-3/5">
        <h1 className="text-md font-bold lg:text-2xl">{project.name}</h1>
        <p className="flex-auto text-sm text-white/80">
          {project.description}
        </p>
        <div className="flex w-full flex-wrap gap-2 md:mt-2">
          {project.stacks.map((tech) => (
            <Tag key={tech.id} name={tech.name} />
          ))}
        </div>

        {/* button */}
        <div className="flex w-full gap-4 md:mt-2">
          <a
            target="_blank"
            href={project.repository}
            className="rounded-md px-2 py-1 hover:bg-zinc-400 md:px-4 md:py-2"
          >
            <Github className="mr-2 inline" />
            Source Code
          </a>
          <a
            target="_blank"
            href={project.demo}
            className="rounded-md px-2 py-1 text-center hover:bg-zinc-400 md:px-4 md:py-2"
          >
            <SquareArrowOutUpRight className="mr-2 inline" />
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
