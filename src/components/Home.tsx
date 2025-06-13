import { ArrowRight, Circle } from "lucide-react";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { getHome } from "@/services/strapi";
import type { HomeData } from "@/types";

function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHome();
        setHomeData(data);
      } catch (err) {
        setError("Failed to fetch home data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !homeData) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  const imageUrl =
    import.meta.env.VITE_API_ENDPOINT + homeData.profile_image.url;

  return (
    <section
      id="home"
      className="flex min-h-screen w-full flex-col-reverse items-center justify-around px-4 pt-16 md:flex-row md:justify-center"
    >
      {/* detail */}
      <div className="flex h-3/5 w-full flex-col justify-start text-zinc-950 md:h-3/5 md:w-[500px] md:justify-center">
        <h3 className="text-xl font-medium">Hello, I'm Jack</h3>
        <h1 className="mt-4 text-4xl font-bold">Software Developer</h1>

        <p className="text-md mt-4 font-medium text-wrap text-zinc-700">
          I'm a front-end developer with a passion for creating clean,
          responsive user interfaces.
        </p>
        <p className="text-md font-medium text-wrap text-zinc-700">
          Lately, I've been expanding into full-stack development to build more
          complete, end-to-end web solutions.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            className="w-32 cursor-pointer rounded-lg bg-blue-900 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Link smooth={true} duration={500} to="projects">
              Projects <ArrowRight className="inline" />
            </Link>
          </button>
          <button
            type="button"
            className="w-32 cursor-pointer rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-black hover:bg-gray-300"
          >
            <Link smooth={true} duration={500} to="contact">
              Contact me
            </Link>
          </button>
        </div>
      </div>

      {/* image */}
      <div className="w-ful md:2/5 flex h-1/2 items-center justify-center gap-4 md:w-1/2">
        <div className="relative w-3/4 sm:w-[300px] md:w-[500px]">
          <img
            src={imageUrl}
            className="aspect-square rounded-full border-10 border-white object-cover shadow-lg"
            alt="Profile"
          />
          <div className="absolute right-0 bottom-0 flex h-10 w-[200px] items-center justify-center gap-4 rounded-2xl bg-white shadow-lg">
            <Circle
              className={`inline ${
                homeData.available_status
                  ? "animate-pulse text-green-500"
                  : "text-red-500"
              }`}
              fill={homeData.available_status ? "green" : "red"}
            />
            {homeData.available_status ? "Available for work" : "Not available"}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
