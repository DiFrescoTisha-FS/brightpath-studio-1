// Navbar.tsx (Final Recommended Fix)
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '../theme-toggle';
import { ThemeAwareLogo } from '../theme-aware-logo';

type NavbarProps = {
  theme: 'light' | 'dark';
};

const Navbar = ({ theme }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use a class that either exists (text-header-foreground) or is explicitly dark/visible (text-gray-700)
  const menuItemColorClass = theme === 'dark'
    ? 'text-header-foreground' // Assuming this resolves to a light color in dark mode
    : 'text-gray-700 hover:text-black'; // Use a reliable dark Tailwind class for light mode

  const mobileMenuItemClass = theme === 'dark'
    ? 'text-white hover:bg-gray-700'
    : 'text-gray-700 hover:bg-gray-100';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  /* Header refinement experiment — see the "HEADER — navigation + CTA
     refinement" block in src/styles/globals.css. NavLink supplies isActive
     and sets aria-current="page", so the active route is announced rather
     than being signalled by colour alone. */
  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link px-3 py-2 text-sm ${menuItemColorClass} ${isActive ? 'nav-link--active' : ''}`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link nav-link--mobile block px-4 py-3 text-base ${mobileMenuItemClass} ${
      isActive ? 'nav-link--active' : ''
    }`;

  return (
    <nav className={`backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b-2 ${theme === 'dark' ? 'bg-[#0a0f18] border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <ThemeAwareLogo />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" end className={desktopLinkClass}>Home</NavLink>
              <NavLink to="/services" className={desktopLinkClass}>Services</NavLink>
              <NavLink to="/about" className={desktopLinkClass}>About</NavLink>
              <NavLink to="/reviews" className={desktopLinkClass}>Reviews</NavLink>
              <NavLink to="/portfolio" className={desktopLinkClass}>Portfolio</NavLink>
              <Link to="/contact" className="nav-cta">Contact Us</Link>
              <ModeToggle />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t ${theme === 'dark' ? 'bg-[#0a0f18] border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="px-4 py-4 space-y-2">
            <NavLink to="/" end onClick={closeMenu} className={mobileLinkClass}>Home</NavLink>
            <NavLink to="/services" onClick={closeMenu} className={mobileLinkClass}>Services</NavLink>
            <NavLink to="/about" onClick={closeMenu} className={mobileLinkClass}>About</NavLink>
            <NavLink to="/review" onClick={closeMenu} className={mobileLinkClass}>Reviews</NavLink>
            <NavLink to="/portfolio" onClick={closeMenu} className={mobileLinkClass}>Portfolio</NavLink>
            <Link to="/contact" onClick={closeMenu} className="nav-cta justify-center mt-4">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;