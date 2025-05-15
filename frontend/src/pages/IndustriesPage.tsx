import React from 'react';
import { Link } from 'react-router-dom';

interface Industry {
  id: string;
  name: string;
  image: string;
  description: string;
  products: string[];
  benefits: string[];
}

const IndustriesPage = () => {
  const industries: Industry[] = [
    {
      id: 'automotive',
      name: 'Automotive',
      image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'High-durability labels and stickers for the automotive industry, designed to withstand extreme conditions and provide essential information.',
      products: [
        'Warning and instruction labels',
        'VIN and identification labels',
        'Under-hood component labels',
        'Interior material information tags',
        'Service reminder stickers'
      ],
      benefits: [
        'Oil and fuel resistant materials',
        'Extreme temperature tolerance',
        'UV and weather resistance',
        'Tamper-evident options',
        'Compliance with automotive industry standards'
      ]
    },
    {
      id: 'solar',
      name: 'Solar Energy',
      image: 'https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Weather-resistant labels for solar panels and renewable energy equipment, designed to last for decades in outdoor environments.',
      products: [
        'Serial number and identification labels',
        'Warning and safety instruction labels',
        'Specification and certification tags',
        'Energy output information labels',
        'Installation guide markers'
      ],
      benefits: [
        'Extreme UV resistance',
        'Weatherproof materials',
        'Long-term outdoor durability (25+ years)',
        'High-temperature tolerance',
        'Compliance with renewable energy industry standards'
      ]
    },
    {
      id: 'furniture',
      name: 'Furniture',
      image: 'https://images.pexels.com/photos/7319279/pexels-photo-7319279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Elegant and informative labels for furniture manufacturers, providing branding, care instructions, and regulatory information.',
      products: [
        'Brand labels and tags',
        'Care instruction labels',
        'Material composition tags',
        'Regulatory and compliance labels',
        'Quality assurance seals'
      ],
      benefits: [
        'Premium look and feel',
        'Discreet attachment options',
        'Fabric-friendly adhesives',
        'Custom designs that complement product aesthetics',
        'Compliance with furniture industry regulations'
      ]
    },
    {
      id: 'electronics',
      name: 'Electronics',
      image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Precision labels for electronic devices and components, including serialization, warnings, and compliance information.',
      products: [
        'Serial number and tracking labels',
        'Warranty seals',
        'Compliance and certification labels',
        'Component identification markers',
        'Warning and safety instruction labels'
      ],
      benefits: [
        'Heat-resistant materials',
        'Small form factor precision',
        'Anti-static options',
        'Tamper-evident features',
        'Compliance with electronics industry standards'
      ]
    },
    {
      id: 'food',
      name: 'Food & Beverage',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Food-safe labels for packaging and products, designed to maintain integrity in various storage conditions.',
      products: [
        'Product information labels',
        'Nutritional information labels',
        'Expiration date stickers',
        'Tamper-evident seals',
        'Promotional and brand labels'
      ],
      benefits: [
        'Food-safe adhesives and materials',
        'Temperature-resistant options (freezer to microwave)',
        'Oil and moisture resistance',
        'FDA-compliant materials',
        'Vibrant color printing for brand appeal'
      ]
    },
    {
      id: 'pharmaceutical',
      name: 'Pharmaceutical',
      image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'High-precision labels for pharmaceutical products, ensuring accurate information, compliance, and security.',
      products: [
        'Prescription labels',
        'Product information labels',
        'Security and anti-counterfeiting labels',
        'Track and trace solutions',
        'Warning and instruction labels'
      ],
      benefits: [
        'GMP-compliant production',
        'High-precision printing for small text',
        'Security features (holograms, microtext)',
        'Compliance with pharmaceutical regulations',
        'Specialized adhesives for different container types'
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Industries We Serve</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Specialized labeling and sticker solutions for diverse industry needs, from automotive to pharmaceuticals.
          </p>
        </div>
      </section>

      {/* Industries Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Tailored Solutions for Every Industry</h2>
            <p className="text-lg text-gray-700">
              Our extensive industry experience allows us to create specialized labels and stickers that meet the unique requirements of different sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {industries.map((industry) => (
              <a
                key={industry.id}
                href={`#${industry.id}`}
                className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors duration-300"
              >
                <h3 className="text-blue-900 font-semibold">{industry.name}</h3>
              </a>
            ))}
          </div>
          
          {/* Industries Detail Sections */}
          {industries.map((industry, index) => (
            <div 
              key={industry.id} 
              id={industry.id}
              className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <h2 className="text-3xl font-bold text-blue-900 mb-4">{industry.name}</h2>
                  <p className="text-lg text-gray-700 mb-6">{industry.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Solutions We Offer:</h3>
                    <ul className="space-y-2">
                      {industry.products.map((product, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span>{product}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {industry.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                  >
                    Get Industry-Specific Solutions
                  </Link>
                </div>
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img 
                    src={industry.image} 
                    alt={`${industry.name} industry`} 
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Industry Solutions */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Don't See Your Industry?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We work with many other industries and can create custom labeling solutions for your specific needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Contact Us for Custom Solutions
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;