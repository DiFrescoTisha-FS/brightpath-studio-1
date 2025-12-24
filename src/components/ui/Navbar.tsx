// Navbar.tsx (Final Recommended Fix)
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <nav className={`backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b-2 ${theme === 'dark' ? 'bg-[#1A2238] border-gray-700' : 'bg-white border-gray-200'}`}>
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
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-lato transition-colors ${menuItemColorClass}`}>Home</Link>
              <Link to="/services" className={`px-3 py-2 rounded-md text-sm font-lato transition-colors ${menuItemColorClass}`}>Services</Link>
              <Link to="/about" className={`px-3 py-2 rounded-md text-sm font-lato transition-colors ${menuItemColorClass}`}>About</Link>
              <Link to="/review" className={`px-3 py-2 rounded-md text-sm font-lato transition-colors ${menuItemColorClass}`}>Reviews</Link>
              <Link to="/case-study" className={`px-3 py-2 rounded-md text-sm font-lato transition-colors ${menuItemColorClass}`}>Case Study</Link>
              <Link to="/portfolio" className={`px-3 py-2 rounded-md text-sm font-lato transition-colors ${menuItemColorClass}`}>Portfolio</Link>
              <Link to="/contact" className="bg-primary text-primary-foreground font-bold font-lato px-4 py-2 rounded-md text-sm hover:bg-yellow-400 transition-colors">Contact Us</Link>
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
        <div className={`md:hidden border-t ${theme === 'dark' ? 'bg-[#1A2238] border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="px-4 py-4 space-y-2">
            <Link to="/" onClick={closeMenu} className={`block px-4 py-3 rounded-md text-base font-lato transition-colors ${mobileMenuItemClass}`}>Home</Link>
            <Link to="/services" onClick={closeMenu} className={`block px-4 py-3 rounded-md text-base font-lato transition-colors ${mobileMenuItemClass}`}>Services</Link>
            <Link to="/about" onClick={closeMenu} className={`block px-4 py-3 rounded-md text-base font-lato transition-colors ${mobileMenuItemClass}`}>About</Link>
            <Link to="/review" onClick={closeMenu} className={`block px-4 py-3 rounded-md text-base font-lato transition-colors ${mobileMenuItemClass}`}>Reviews</Link>
            <Link to="/case-study" onClick={closeMenu} className={`block px-4 py-3 rounded-md text-base font-lato transition-colors ${mobileMenuItemClass}`}>Case Study</Link>
            <Link to="/portfolio" onClick={closeMenu} className={`block px-4 py-3 rounded-md text-base font-lato transition-colors ${mobileMenuItemClass}`}>Portfolio</Link>
            <Link to="/contact" onClick={closeMenu} className="block px-4 py-3 rounded-md text-base font-lato font-bold bg-primary text-primary-foreground hover:bg-yellow-400 transition-colors text-center mt-4">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;