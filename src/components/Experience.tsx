import type { ExperienceType } from "@/types";
import "../index.css";
function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <section
      id="experience"
      className="flex h-auto min-h-[calc(100svh-65px)] w-full flex-col items-center justify-center px-4 pt-4 md:px-12"
    >
      <div className="mx-auto h-auto w-full flex-col xl:max-w-[1200px]">
        <h1 className="text-center text-4xl font-bold">Experience</h1>
        <div className="relative space-y-12">
          {experience
            .sort((a, b) => (b.exp_id - a.exp_id))
            .map((exp: ExperienceType) => (
              <div key={exp.exp_id} className="timeline-item relative pb-12 pl-12">
                <div className="bg-blue-900 absolute top-0 left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full">
                  <div className="h-3 w-3 rounded-full bg-black"></div>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-white/80">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    {exp.title}
                  </h2>
                  <h3 className="text-lg font-medium text-gray-300">
                    {exp.company}
                  </h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-white/80">
                    {exp.detail.split("\n").map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
