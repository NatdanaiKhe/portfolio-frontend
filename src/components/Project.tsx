import ProjectCard from "./ProjectCard";
import { type ProjectType } from "@/types";
import { useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "motion/react";
import { motionVariant } from "@/config/motionConfig";

function Project({ projects }: { projects: ProjectType[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);
  return (
    <section
      id="projects"
      className="flex h-auto min-h-[calc(100svh-65px)] w-full flex-col items-center justify-center p-4 pt-16 md:px-12"
    >
      <div className="mx-auto h-auto w-full flex-col xl:max-w-[1200px]">
        <h1 className="text-center text-4xl font-bold">Projects</h1>
        <p className="my-4 text-center text-white/80">
          Here are some of my recent projects. Each one presented unique
          challenges that helped me grow.
        </p>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={motionVariant}
          className="mt-ภ grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Project;
