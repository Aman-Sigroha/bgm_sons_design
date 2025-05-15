import React from 'react';
import { Shield, Users, Briefcase, Award } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Shield className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'Quality',
      description: 'We maintain the highest standards in all our products and services.'
    },
    {
      icon: <Users className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'Customer Focus',
      description: 'Our customers are at the center of everything we do.'
    },
    {
      icon: <Briefcase className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'Professionalism',
      description: 'We uphold ethical business practices and professional conduct.'
    },
    {
      icon: <Award className="w-12 h-12 text-blue-700 mb-4" />,
      title: 'Innovation',
      description: 'We continuously innovate to stay ahead in the industry.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BGM Sons Enterprises</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A leading manufacturer of high-quality labels, stickers, and branding solutions since 1995.
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700">
              From humble beginnings to industry leadership.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Company founders" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">From Small Workshop to Industry Leader</h3>
              <p className="text-gray-700 mb-4">
                Founded in 1995 by the Gupta family, BGM Sons Enterprises began as a small workshop producing simple labels for local businesses. With a commitment to quality and customer satisfaction, the company quickly gained a reputation for excellence.
              </p>
              <p className="text-gray-700 mb-4">
                Over the years, we invested in cutting-edge technology and expanded our facilities. Today, we operate a state-of-the-art manufacturing plant spanning over 50,000 square feet, equipped with the latest printing and finishing technologies.
              </p>
              <p className="text-gray-700">
                Our journey has been guided by innovation, quality, and a deep understanding of our customers' needs. From automotive labels to industrial stickers and custom branding solutions, we have diversified our product range while maintaining our core values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the global leader in providing innovative and sustainable labeling solutions that empower brands to communicate effectively with their customers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To deliver high-quality, customized labeling solutions through cutting-edge technology, exceptional service, and sustainable practices, helping our clients build stronger brand identities and operational efficiencies.
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-700">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Strengths */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Strengths</h2>
            <p className="text-lg text-gray-700">
              What sets us apart in the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Cutting-Edge Technology</h3>
              <p className="text-gray-700">
                We invest in the latest printing and manufacturing technologies to deliver superior quality products with exceptional precision and consistency.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Expert Team</h3>
              <p className="text-gray-700">
                Our team comprises industry experts with decades of combined experience in label manufacturing, design, and quality control.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Sustainability</h3>
              <p className="text-gray-700">
                We are committed to eco-friendly practices, using sustainable materials and energy-efficient processes to minimize our environmental footprint.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-700">
                Our rigorous quality control processes ensure that every product meets the highest standards before leaving our facility.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Customer Service</h3>
              <p className="text-gray-700">
                We pride ourselves on exceptional customer service, providing personalized support and solutions tailored to each client's unique needs.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Global Reach</h3>
              <p className="text-gray-700">
                With clients across multiple industries and countries, we have the expertise to meet diverse requirements and standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-700">
              Meet the experienced professionals leading BGM Sons Enterprises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Gupta',
                position: 'Founder & CEO',
                image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                bio: 'With over 30 years of experience in the manufacturing industry, Rajesh has led BGM Sons from its inception to becoming an industry leader.'
              },
              {
                name: 'Priya Sharma',
                position: 'Chief Operations Officer',
                image: 'https://images.pexels.com/photos/5905921/pexels-photo-5905921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                bio: 'Priya oversees all operational aspects of the company, ensuring efficient processes and timely delivery of high-quality products.'
              },
              {
                name: 'Vikram Singh',
                position: 'Head of Innovation',
                image: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                bio: 'Vikram leads our R&D team, constantly exploring new materials, technologies, and sustainable solutions.'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;