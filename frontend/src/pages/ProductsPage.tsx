import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  description: string;
  features: string[];
}

const ProductsPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Product categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'branding', name: 'Branding' },
    { id: 'custom', name: 'Custom Designs' }
  ];

  // Sample products data
  const products: Product[] = [
    // Automotive Labels
    {
      id: 1,
      name: 'Durable Warning Labels',
      category: 'automotive',
      subcategory: 'Warning Labels',
      image: 'https://images.pexels.com/photos/5980743/pexels-photo-5980743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'High-quality warning labels for automotive applications, resistant to oil, fuel, and extreme temperatures.',
      features: ['Oil-resistant', 'Temperature range: -40°C to 150°C', 'UV-resistant', 'Available in multiple languages']
    },
    {
      id: 2,
      name: 'Vehicle Identification Labels',
      category: 'automotive',
      subcategory: 'Identification',
      image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Tamper-evident VIN and identification labels for vehicles and automotive parts.',
      features: ['Tamper-evident design', 'Barcode compatibility', 'Sequential numbering', 'Customizable security features']
    },
    {
      id: 3,
      name: 'Under-Hood Component Labels',
      category: 'automotive',
      subcategory: 'Component Labels',
      image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Heat-resistant labels for under-hood components and engine parts.',
      features: ['Heat-resistant up to 200°C', 'Oil and grease resistant', 'Long-term adhesion', 'Custom printing options']
    },
    
    // Industrial Labels
    {
      id: 4,
      name: 'Heavy Machinery Tags',
      category: 'industrial',
      subcategory: 'Equipment Tags',
      image: 'https://images.pexels.com/photos/8230075/pexels-photo-8230075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Durable metal-look equipment tags with custom engraving, perfect for machinery identification.',
      features: ['Metal-look finish', 'Impact resistant', 'Indoor/outdoor use', 'Custom engraving options']
    },
    {
      id: 5,
      name: 'Safety Instruction Labels',
      category: 'industrial',
      subcategory: 'Safety Labels',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Clear, durable safety instruction labels compliant with international safety standards.',
      features: ['OSHA compliant', 'Multilingual options', 'High visibility colors', 'Pictogram compatibility']
    },
    {
      id: 6,
      name: 'Warehouse Rack Labels',
      category: 'industrial',
      subcategory: 'Warehouse Labels',
      image: 'https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Barcode-compatible warehouse rack and bin labels for inventory management.',
      features: ['Barcode compatibility', 'Scan-friendly surface', 'Magnetic or adhesive options', 'Color-coding available']
    },
    
    // Branding Labels
    {
      id: 7,
      name: 'Product Branding Labels',
      category: 'branding',
      subcategory: 'Product Labels',
      image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Custom branded labels for products with vibrant colors and weather-resistant materials.',
      features: ['Full-color printing', 'Embossing options', 'Premium finishes', 'Food-grade adhesives available']
    },
    {
      id: 8,
      name: 'Luxury Packaging Labels',
      category: 'branding',
      subcategory: 'Packaging',
      image: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'High-end labels for luxury product packaging with embossing and special finishes.',
      features: ['Gold/silver foiling', 'Embossing/debossing', 'Soft-touch finishes', 'Custom die-cut shapes']
    },
    {
      id: 9,
      name: 'Promotional Stickers',
      category: 'branding',
      subcategory: 'Promotional',
      image: 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Eye-catching promotional stickers for marketing campaigns and brand awareness.',
      features: ['Vibrant colors', 'Outdoor-durable options', 'Bulk pricing available', 'Quick turnaround times']
    },
    
    // Custom Designs
    {
      id: 10,
      name: 'Custom Shape Die-Cut Labels',
      category: 'custom',
      subcategory: 'Die-Cut',
      image: 'https://images.pexels.com/photos/1303092/pexels-photo-1303092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Custom-shaped labels created to your exact specifications with precision die-cutting.',
      features: ['Custom shapes', 'Precise cutting', 'Multiple material options', 'Small to large quantities']
    },
    {
      id: 11,
      name: 'QR Code Integrated Labels',
      category: 'custom',
      subcategory: 'Smart Labels',
      image: 'https://images.pexels.com/photos/8447467/pexels-photo-8447467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Interactive labels with integrated QR codes linking to websites, videos, or product information.',
      features: ['QR code generation', 'URL linking', 'Tracking capabilities', 'Design integration']
    },
    {
      id: 12,
      name: 'Eco-Friendly Labels',
      category: 'custom',
      subcategory: 'Sustainable',
      image: 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Sustainable labels made from recycled and biodegradable materials for eco-conscious brands.',
      features: ['Recycled materials', 'Biodegradable options', 'Soy-based inks', 'Reduced carbon footprint']
    }
  ];

  // Filter products based on category and search term
  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(term))
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm]);

  // Check for hash in URL to set initial active category
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && categories.some(cat => cat.id === hash)) {
      setActiveCategory(hash);
      // Scroll to products section
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality labels, stickers, and branding solutions for every industry need.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    activeCategory === category.id
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                id={product.id.toString()}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-blue-600">{product.subcategory}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{product.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Need a Custom Solution?</h2>
            <p className="text-lg text-gray-700">
              Our team of experts can create custom labels and stickers tailored to your specific requirements.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Custom Design Services</h3>
                <p className="text-gray-700 mb-4">
                  From concept to completion, our design team works closely with you to create labels and stickers that perfectly meet your needs.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Professional design consultation',
                    'Prototype development',
                    'Material selection guidance',
                    'Special printing techniques',
                    'Bulk order discounts'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/contact"
                  className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Request Custom Quote
                </Link>
              </div>
              <div>
                <img 
                  src="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Custom label design process" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;