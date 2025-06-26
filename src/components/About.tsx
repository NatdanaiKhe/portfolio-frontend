import { type TechStackType, type AboutType } from "@/types";
import { useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "motion/react";
import { motionVariant } from "@/config/motionConfig";

function About({
  about,
  techStacks,
}: {
  about: AboutType | undefined;
  techStacks: TechStackType[] | undefined;
}) {
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
      id="about"
      className="flex h-auto min-h-[calc(100svh-65px)] w-full flex-col items-center justify-center px-4 pt-4 text-zinc-950 md:px-12"
    >
      <div className="mx-auto h-auto w-full xl:w-[1200px]">
        <h1 className="text-4xl font-bold">About Me</h1>
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-semibold">My Background</h2>
          <p className="mt-4 text-zinc-700">{about?.background}</p>
        </div>
      </div>

      <div className="mt-4 mb-4 w-3/5 rounded-2xl border-1 border-gray-200"></div>

      <div className="mx-auto flex h-auto w-full flex-col justify-center xl:w-[1200px]">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={motionVariant}
          className="mt-4 grid h-auto w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {/* skill card */}

          {techStacks?.map((tech: TechStackType, index) => (
            <div
              key={index}
              className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-gray-200 p-2 shadow-md hover:scale-105"
            >
              <div className="h-14 w-14">
                <img src={tech.tech_image.url} className="object-cover" />
              </div>
              <div>
                <p className="text-center text-xl font-semibold">{tech.name}</p>
                <p className="text-center text-sm font-normal text-gray-600">
                  {tech.proficiency_level}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
