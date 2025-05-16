import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  images: string[];
  description: string;
  features: string;
  specification: string;
}

const ProductsPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([
    { id: 'all', name: 'All Products' }
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
        // Extract unique categories from products
        const uniqueCategories = Array.from(new Set(data.map((p: Product) => p.category))).filter(Boolean) as string[];
        setCategories([
          { id: 'all', name: 'All Products' },
          ...uniqueCategories.map((cat) => ({ id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) }))
        ]);
      } catch (err: any) {
        setError(err.message || 'Error loading products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on category and search term
  useEffect(() => {
    let filtered = products;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(term))
      );
    }
    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, products]);

  // Check for hash in URL to set initial active category
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && categories.some(cat => cat.id === hash)) {
      setActiveCategory(hash);
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location, categories]);

  if (loading) return <div className="container mx-auto px-4 py-16 text-center text-xl">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-16 text-center text-red-600 text-xl">{error}</div>;

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
            {/* Category Filter Buttons */}
            <div className="mb-6 md:mb-0 w-full md:w-auto flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 border 
                    ${activeCategory === category.id
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-gray-100 text-blue-900 border-gray-300 hover:bg-blue-100'}
                  `}
                  style={{ outline: 'none' }}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {/* (Optional: keep button filters for mobile/UX, or remove if not needed) */}
            </div>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col cursor-pointer"
                id={product.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="h-64 overflow-hidden">
  <img
    src={product.images?.[0] || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-blue-600">{product.subcategory}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{product.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features?.split('\n').map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Optionally, add a button or CTA here if needed */}
                </div>
              </Link>
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