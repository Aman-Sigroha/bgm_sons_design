import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Featured products data
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Automotive Warning Labels',
      category: 'Automotive',
      image: 'https://images.pexels.com/photos/5980743/pexels-photo-5980743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'High-quality warning labels for automotive applications, resistant to oil, fuel, and extreme temperatures.'
    },
    {
      id: 2,
      name: 'Industrial Equipment Tags',
      category: 'Industrial',
      image: 'https://images.pexels.com/photos/8230075/pexels-photo-8230075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Durable metal-look equipment tags with custom engraving, perfect for machinery identification.'
    },
    {
      id: 3,
      name: 'Branded Product Labels',
      category: 'Branding',
      image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Custom branded labels for products with vibrant colors and weather-resistant materials.'
    },
    {
      id: 4,
      name: 'Solar Panel Markings',
      category: 'Renewable Energy',
      image: 'https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'UV-resistant markings and labels for solar panels and renewable energy equipment.'
    },
    {
      id: 5,
      name: 'Custom Furniture Tags',
      category: 'Furniture',
      image: 'https://images.pexels.com/photos/7319279/pexels-photo-7319279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Elegant branding tags and labels for furniture and home goods manufacturers.'
    }
  ];

  // Number of products to show at once (responsive)
  const getItemsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, isAutoPlaying]);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % (featuredProducts.length - itemsToShow + 1);
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? featuredProducts.length - itemsToShow : currentIndex - 1;
    setCurrentIndex(newIndex < 0 ? 0 : newIndex);
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div 
      className="relative" 
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={prevSlide}
          className="bg-blue-900 text-white rounded-full p-2 hover:bg-blue-800 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="bg-blue-900 text-white rounded-full p-2 hover:bg-blue-800 transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(0)`,
            gap: '2rem',
            display: 'grid',
            gridTemplateColumns: `repeat(${itemsToShow}, 1fr)` 
          }}
        >
          {visibleProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex-none bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-semibold text-blue-600">{product.category}</span>
                <h3 className="text-xl font-bold text-blue-900 mt-2 mb-3">{product.name}</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <Link
                  to={`/products#${product.category.toLowerCase()}`}
                  className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: featuredProducts.length - itemsToShow + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-blue-900' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;