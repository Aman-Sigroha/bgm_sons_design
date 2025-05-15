import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const productCategories = [
    { name: 'Automotive Labels', path: '/products#automotive' },
    { name: 'Industrial Stickers', path: '/products#industrial' },
    { name: 'Branding Solutions', path: '/products#branding' },
    { name: 'Custom Designs', path: '/products#custom' },
  ];

  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-900">BGM Sons Enterprises</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium">Home</Link>
            <Link to="/about" className="text-blue-900 hover:text-blue-700 font-medium">About Us</Link>
            
            <div className="relative group">
              <button 
                className="flex items-center text-blue-900 hover:text-blue-700 font-medium"
                onClick={toggleProductsDropdown}
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div 
                className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                  isProductsDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <div className="py-1">
                  {productCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link to="/industries" className="text-blue-900 hover:text-blue-700 font-medium">Industries</Link>
            <Link to="/contact" className="text-blue-900 hover:text-blue-700 font-medium">Contact</Link>
            <Link 
              to="/admin/login" 
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300"
            >
              Admin Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-blue-900 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white mt-4 rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium">Home</Link>
              <Link to="/about" className="text-blue-900 hover:text-blue-700 font-medium">About Us</Link>
              
              <div>
                <button 
                  className="flex items-center text-blue-900 hover:text-blue-700 font-medium"
                  onClick={toggleProductsDropdown}
                >
                  Products <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProductsDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {productCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block text-sm text-gray-700 hover:text-blue-900"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link to="/industries" className="text-blue-900 hover:text-blue-700 font-medium">Industries</Link>
              <Link to="/contact" className="text-blue-900 hover:text-blue-700 font-medium">Contact</Link>
              <Link 
                to="/admin/login" 
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 text-center"
              >
                Admin Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;