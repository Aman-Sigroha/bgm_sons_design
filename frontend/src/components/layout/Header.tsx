import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen]);

  const productCategories = [
    { name: 'Automotive Labels', path: '/products#automotive' },
    { name: 'Industrial Stickers', path: '/products#industrial' },
    { name: 'Branding Solutions', path: '/products#branding' },
    { name: 'Custom Designs', path: '/products#custom' },
  ];

  const [isOverProductButton, setIsOverProductButton] = useState(false);
  const [isOverProductList, setIsOverProductList] = useState(false);

  const toggleProductsDropdown = () => {
    setIsOverProductButton((prev) => !prev);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-900 tracking-tight">BGM Sons Enterprises</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">About Us</Link>
            <div className="relative group">
              <button
                className="flex items-center text-blue-900 hover:text-blue-700 font-medium focus:outline-none"
                onClick={toggleProductsDropdown}
                onMouseEnter={() => setIsOverProductButton(true)}
                onMouseLeave={() => setTimeout(() => {
                  setIsOverProductButton(false); 
                }, 100)}
                aria-haspopup="true"
                aria-expanded={isOverProductButton || isOverProductList ? 'true' : 'false'}
              >
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div
                className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                  isOverProductButton || isOverProductList ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={() => setIsOverProductList(true)}
                onMouseLeave={() => setIsOverProductList(false)}
              >
                <div className="py-1">
                  {productCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/industries" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">Industries</Link>
            <Link to="/contact" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-blue-900 focus:outline-none p-2 rounded-md hover:bg-blue-100"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="lg:hidden bg-white mt-4 rounded-lg shadow-lg p-4 animate-fade-in-down"
          >
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">About Us</Link>
              <div>
                <button
                  className="flex items-center text-blue-900 hover:text-blue-700 font-medium focus:outline-none"
                  onClick={toggleProductsDropdown}
                  aria-haspopup="true"
                  aria-expanded={isProductsDropdownOpen ? 'true' : 'false'}
                >
                  Products <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProductsDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {productCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block text-sm text-gray-700 hover:text-blue-900 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/industries" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">Industries</Link>
              <Link to="/contact" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
