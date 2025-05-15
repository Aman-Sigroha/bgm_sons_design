import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BGM Sons Enterprises</h3>
            <p className="mb-4">Your trusted partner for high-quality labels, stickers, and branding solutions since 1995.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-300 transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-300 transition-colors duration-300">About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-300 transition-colors duration-300">Products</Link></li>
              <li><Link to="/industries" className="hover:text-blue-300 transition-colors duration-300">Industries</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300 transition-colors duration-300">Contact Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-blue-300 transition-colors duration-300">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products#automotive" className="hover:text-blue-300 transition-colors duration-300">Automotive Labels</Link></li>
              <li><Link to="/products#industrial" className="hover:text-blue-300 transition-colors duration-300">Industrial Stickers</Link></li>
              <li><Link to="/products#branding" className="hover:text-blue-300 transition-colors duration-300">Branding Solutions</Link></li>
              <li><Link to="/products#custom" className="hover:text-blue-300 transition-colors duration-300">Custom Designs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={18} />
                <span>123 Manufacturing Way, Industrial District, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <a href="tel:+1234567890" className="hover:text-blue-300 transition-colors duration-300">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <a href="mailto:info@bgmsons.com" className="hover:text-blue-300 transition-colors duration-300">info@bgmsons.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} BGM Sons Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;