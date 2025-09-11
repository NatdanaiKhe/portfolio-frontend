import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-scroll";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); 
  };

  const menuList = (
    <>
      <li className="cursor-pointer hover:text-zinc-600">
        <Link smooth={true} duration={500} to="home" onClick={handleLinkClick}>
          Home
        </Link>
      </li>
      <li className="cursor-pointer hover:text-zinc-600">
        <Link smooth={true} duration={500} to="about" onClick={handleLinkClick}>
          About
        </Link>
      </li>
      <li className="cursor-pointer hover:text-zinc-600">
        <Link
          smooth={true}
          duration={500}
          to="projects"
          onClick={handleLinkClick}
        >
          Projects
        </Link>
      </li>
      <li className="cursor-pointer hover:text-zinc-600">
        <Link
          smooth={true}
          duration={500}
          to="contact"
          onClick={handleLinkClick}
        >
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <nav className="fixed top-0 z-40 flex h-16 w-full justify-between bg-black px-4 shadow-sm md:px-12">
      <div className="h-16 w-16">
        <img className="object-contain" src="/logo.png" alt="Logo" />
      </div>
      <ul className="hidden w-fit flex-row items-center justify-center gap-10 text-xl font-semibold text-white/80 md:flex">
        {menuList}
      </ul>

      <div className="relative flex items-center md:hidden">
        <button
          type="button"
          onClick={handleMenu}
          className="z-50 p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {isMenuOpen && (
          <div
            className="bg-opacity-50 fixed inset-0 z-30 bg-black"
            onClick={handleMenu}
          />
        )}

        <div
          className={`fixed top-16 right-0 z-40 w-64 transform bg-zinc-100 shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"} `}
        >
          <ul className="flex flex-col space-y-4 p-6 text-lg font-semibold text-zinc-950">
            {menuList}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
