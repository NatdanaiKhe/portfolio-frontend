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
      className="flex h-auto min-h-[calc(100svh-65px)] w-full flex-col items-center justify-center px-4 pt-4 md:px-12"
    >
      <div className="mx-auto h-auto w-full xl:max-w-[1200px]">
        <h1 className="text-4xl font-bold">About Me</h1>

        <div className="grid w-full gap-4 md:grid-cols-5 md:grid-rows-2">
          <div className="md:col-span-3 md:row-span-2">
            <h2 className="text-2xl font-semibold">My Background</h2>
            <p className="mt-4 text-white/80">{about?.background}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold md:col-span-2 md:col-start-4">
              Skills
            </h3>
            <p className="mt-4 text-white/80">{about?.experience}</p>
          </div>
          <div className="md:col-span-2 md:col-start-4 md:row-start-2">
            <h3 className="text-2xl font-semibold">Education</h3>
            <p className="mt-4 text-white/80">{about?.education}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-4 w-3/5 rounded-2xl border-1 border-gray-200"></div>

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
              className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-gray-900/50 p-2 shadow-md hover:scale-105"
            >
              <div className="h-14 w-14">
                <img src={tech.tech_image.url} className="object-cover" />
              </div>
              <div>
                <p className="text-center text-xl font-semibold">{tech.name}</p>
                <p className="text-center text-sm font-normal text-white/80">
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
