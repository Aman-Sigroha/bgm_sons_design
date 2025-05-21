import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, AlignCenterVertical as Certificate, Clock, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  images: string[];
  created: string;
  description: string;
  specification: string;
  features: string;
}

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

  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Modern Split Hero/Welcome Section */}
      <section className="w-full py-12 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white/0">
            {/* Left: Blue Hero */}
            <div className="flex-1 bg-blue-900 text-white flex flex-col justify-center p-10 md:p-14 min-h-[350px] md:min-h-[400px]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">BGM Sons Enterprises</h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Your Trusted Label & Sticker Manufacturer</h2>
              <p className="text-base md:text-lg mb-8 opacity-90">
                High-quality labels, branding solutions, and innovative designs for every industry need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-blue-900 font-bold py-3 px-8 rounded-lg shadow hover:bg-blue-100 transition-colors duration-300 text-center"
                >
                  Explore Products
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-300 text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Right: Welcome & Commitment */}
            <div className="flex-1 bg-white flex flex-col justify-center p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 text-center md:text-left">Welcome to BGM Sons Enterprises</h2>
              <p className="text-base md:text-lg text-gray-700 mb-6 text-center md:text-left">
                We've been the industry leader in manufacturing high-quality labels, stickers, and branding solutions. Our state-of-the-art facility and dedicated team ensure that we deliver exceptional products tailored to your specific requirements.
              </p>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Modern manufacturing facility"
                  className="rounded-xl shadow-lg w-full max-w-xs md:max-w-[220px] h-auto object-cover"
                />
                <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Our Commitment</h3>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
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
          </div>
        </div>
      </section>

      {/* Featured Products Section - now at the top after hero */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">Featured Products</h2>
            <p className="text-lg text-gray-700">
              Discover our range of high-quality labels, stickers, and branding solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <img src={product.images?.[0]} alt={product.name} className="h-40 w-full object-cover rounded-lg mb-4 border border-gray-100" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
                  <div className="text-sm text-blue-700 font-semibold mb-2">{product.category}</div>
                  <p className="text-gray-700 text-sm line-clamp-3">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Key Strengths Section - now below featured products */}
      <section className="py-16 bg-gradient-to-t from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">Why Choose Us</h2>
            <p className="text-lg text-gray-700">
              Our key strengths set us apart in the industry and make us the preferred choice for businesses worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((strength, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-blue-100"
              >
                <div className="flex justify-center mb-2">
                  {strength.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{strength.title}</h3>
                <p className="text-gray-700">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a customized quote for your label and sticker needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
