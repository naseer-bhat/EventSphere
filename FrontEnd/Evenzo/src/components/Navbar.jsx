import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";

function Navbar() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 z-50 bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4">

        {/* Logo */}
              <Link to="/" className="flex items-center gap-2 h-10"> {/* Container height fixed */}
                  <img
                      src={Logo}
                      alt="logo"
                      className="max-h-full w-40 object-contain"
                  />
              </Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="group flex flex-col gap-0.5 text-gray-700"
            >
              {link.name}
              <div className="bg-gray-700 h-0.5 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-black transition-all">
            New Launch
          </button>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
            Login
          </Link>
          <Link to="/register" className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-6 w-6 cursor-pointer text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
            <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              {link.name}
            </Link>
          ))}

          <Link to="/register" onClick={() => setIsMenuOpen(false)} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Register
          </Link>

          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
