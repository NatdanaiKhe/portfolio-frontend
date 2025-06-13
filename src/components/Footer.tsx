import { Heart } from "lucide-react";
import { Link } from "react-scroll";

function Footer() {
  const date = new Date();
  return (
    <footer className="flex h-auto flex-col items-center justify-between gap-4 rounded-lg border-t-2 border-zinc-200 bg-zinc-100 p-4 md:h-16 md:flex-row">
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        ©{date.getFullYear()}{" "}
        <a className="hover:underline">Natdanai Khemtong. </a>
        All Rights Reserved.
      </span>

      <div>
        <p>
          Build with <Heart fill="red" className="mx-2 inline" /> using React &
          Tailwind
        </p>
      </div>

      <ul className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <li className="cursor-pointer hover:text-zinc-700">
          <Link smooth={true} duration={500} to="home">
            Home
          </Link>
        </li>
        <li className="cursor-pointer hover:text-zinc-700">
          <Link smooth={true} duration={500} to="about">
            About
          </Link>
        </li>
        <li className="cursor-pointer hover:text-zinc-700">
          <Link smooth={true} duration={500} to="projects">
            Projects
          </Link>
        </li>
        <li className="cursor-pointer hover:text-zinc-700">
          <Link smooth={true} duration={500} to="contact">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
