import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';

const Offers = () => {
  // Static seasonal offers data
  const seasonalOffers = [
    {
      id: 1,
      title: "Summer Beach Escape",
      description: "Enjoy 7 days in tropical paradise with luxury beachfront accommodation",
      price: "$1,299",
      originalPrice: "$1,599",
      duration: "7 Days",
      destinations: ["Maldives", "Bali", "Phuket"],
      season: "Summer Special",
      highlight: "20% OFF"
    },
    {
      id: 2,
      title: "Winter Wonderland",
      description: "Ski packages in the Alps with cozy mountain lodge stays",
      price: "$1,799",
      originalPrice: "$2,100",
      duration: "10 Days",
      destinations: ["Switzerland", "Austria"],
      season: "Winter Getaway",
      highlight: "Early Bird"
    },
    {
      id: 3,
      title: "Autumn Cultural Journey",
      description: "Explore ancient cities with private guided tours",
      price: "$1,450",
      originalPrice: "$1,750",
      duration: "8 Days",
      destinations: ["Kyoto", "Rome", "Istanbul"],
      season: "Fall Adventure",
      highlight: "Limited Time"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-2">Seasonal Travel Packages</h2>
        <p className="text-center text-gray-600 mb-8">Discover our exclusive seasonal offers</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalOffers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Offer Tag */}
              <div className="bg-primary text-white text-sm font-bold py-1 px-4 text-center">
                {offer.highlight}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
                  <span className="bg-blue-100 text-primary text-xs font-bold py-1 px-2 rounded">
                    {offer.season}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-primary" />
                    <span>{offer.destinations.join(", ")}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaRegClock className="mr-2 text-primary" />
                    <span>{offer.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-end mb-4">
                  <span className="text-2xl font-bold text-primary mr-2">{offer.price}</span>
                  <span className="text-sm text-gray-500 line-through">{offer.originalPrice}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-4">
                  <div className="flex items-center text-gray-500">
                   
                    
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;