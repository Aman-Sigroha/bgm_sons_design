import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, AlignCenterVertical as Certificate, Clock, Zap } from 'lucide-react';
import ProductCarousel from '../components/products/ProductCarousel';

const HomePage = () => {
  const strengths = [
    {
      icon: <Certificate className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'One-Stop Solution',
      description: 'Complete range of labels, stickers, and branding solutions for all your needs.'
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'Eco-Friendly Materials',
      description: 'Sustainable and durable materials'
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'Timely Delivery',
      description: 'On-time delivery with strict adherence to project timelines.'
    },
    {
      icon: <Truck className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'Quality Assurance',
      description: 'Rigorous quality checks to ensure perfect products every time.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Factory production line" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              BGM Sons Enterprises
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-delay-1">
              Your Trusted Label & Sticker Manufacturer
            </h2>
            <p className="text-lg md:text-xl mb-8 animate-fade-in-delay-2">
              High-quality labels, branding solutions, and innovative designs for every industry need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-center"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-white hover:text-blue-900 text-white border-2 border-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Welcome to BGM Sons Enterprises</h2>
            <p className="text-lg text-gray-700">
              For over 25 years, we've been the industry leader in manufacturing high-quality labels, stickers, and branding solutions. 
              Our state-of-the-art facility and dedicated team ensure that we deliver exceptional products tailored to your specific requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Modern manufacturing facility" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Commitment</h3>
              <p className="text-gray-700 mb-6">
                At BGM Sons Enterprises, we combine traditional craftsmanship with cutting-edge technology to create products that exceed industry standards.
                From automotive labels to industrial stickers and custom branding solutions, we pride ourselves on attention to detail and customer satisfaction.
              </p>
              <ul className="space-y-3">
                {[
                  'State-of-the-art manufacturing facility',
                  'ISO 9001:2015 certified quality management system',
                  'Eco-friendly and sustainable materials',
                  'Custom designs and solutions',
                  'Fast turnaround times and reliable delivery'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-block mt-6 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Strengths Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-700">
              Our key strengths set us apart in the industry and make us the preferred choice for businesses worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((strength, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center">
                  {strength.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{strength.title}</h3>
                <p className="text-gray-700">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-700">
              Discover our range of high-quality labels, stickers, and branding solutions.
            </p>
          </div>
          
          <ProductCarousel />
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a customized quote for your label and sticker needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;