import { getAbout, getTechStack } from "@/services/strapi";
import { type TechStack, type AboutType } from "@/types";
import { useEffect, useState } from "react";

function About() {
  const [about, setAbout] = useState<AboutType>();
  const [techStacks, setTechStacks] = useState<TechStack[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (err) {
        setError("Failed to fetch about data");
      } finally {
        setLoading(false);
      }
    };

    const fetchTech = async () => {
      try {
        const data = await getTechStack();
        setTechStacks(data);
        console.log("tech", data);
      } catch (err) {
        setError("Failed to fetch tech stack data");
      } finally {
        setLoading(false);
      }
    };

    Promise.all([fetchAbout(), fetchTech()])
      .then(() => {
        console.log("All data fetched successfully");
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !about || !techStacks) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

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
        <div className="mt-4 grid h-auto w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* skill card */}

          {techStacks?.map((tech: TechStack, index) => (
            <div
              key={index}
              className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-gray-200 p-2 shadow-md hover:scale-105"
            >
              <div className="h-14 w-14">
                <img
                  src={baseUrl + tech.tech_image.url}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xl font-semibold text-center">{tech.name}</p>
                <p className="text-sm font-normal text-gray-600">
                  {tech.proficiency_level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
