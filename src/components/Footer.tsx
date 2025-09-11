import { Heart } from "lucide-react";
import { Link } from "react-scroll";

function Footer() {
  const date = new Date();
  return (
    <footer className="border-grey-900 flex h-auto flex-col items-center justify-between gap-4 rounded-lg border-gray-900 border-t-2 p-4 md:h-16 md:flex-row">
      <span className="block text-sm text-white/80 sm:text-center">
        ©{date.getFullYear()}{" "}
        <a className="hover:underline">Natdanai Khemtong. </a>
        All Rights Reserved.
      </span>

      <ul className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-white/80 sm:mb-0">
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
