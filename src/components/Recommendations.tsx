import React from 'react';
import { Car, Zap, Utensils, Recycle } from 'lucide-react';
import { EmissionsResult, FootprintData } from '../types';

interface RecommendationsProps {
  results: EmissionsResult;
  data: FootprintData;
}

const Recommendations: React.FC<RecommendationsProps> = ({ results, data }) => {
  const getTransportationRecommendations = () => {
    const recs = [];
    if (data.transportation.vehicleType === 'car') {
      if (data.transportation.fuelType !== 'electric') {
        recs.push('Consider switching to an electric vehicle');
      }
      recs.push('Try carpooling or using public transportation when possible');
      recs.push('Combine errands to reduce total distance traveled');
    }
    return recs;
  };

  const getEnergyRecommendations = () => {
    const recs = [];
    if (data.energy.energySource !== 'renewable') {
      recs.push('Switch to renewable energy sources if available in your area');
    }
    recs.push('Install LED bulbs and energy-efficient appliances');
    recs.push('Use natural lighting and ventilation when possible');
    return recs;
  };

  const getFoodRecommendations = () => {
    const recs = [];
    if (data.food.dietType === 'omnivore') {
      recs.push('Consider reducing meat consumption or trying meat-free days');
    }
    if (data.food.wasteFrequency !== 'low') {
      recs.push('Plan meals ahead to reduce food waste');
      recs.push('Compost food scraps when possible');
    }
    return recs;
  };

  const getWasteRecommendations = () => {
    const recs = [];
    if (data.waste.recycling !== 'always') {
      recs.push('Increase recycling efforts');
    }
    recs.push('Choose products with minimal packaging');
    recs.push('Use reusable bags, bottles, and containers');
    return recs;
  };

  const recommendations = {
    transportation: getTransportationRecommendations(),
    energy: getEnergyRecommendations(),
    food: getFoodRecommendations(),
    waste: getWasteRecommendations(),
  };

  const icons = {
    transportation: Car,
    energy: Zap,
    food: Utensils,
    waste: Recycle,
  };

  return (
    <div className="p-8 glass-card">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Eco-Friendly Recommendations
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(recommendations).map(([category, recs]) => {
          const Icon = icons[category];
          return (
            <div 
              key={category} 
              className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 text-green-500 mr-2 floating" />
                <h3 className="text-xl font-semibold text-gray-700 capitalize">
                  {category}
                </h3>
              </div>
              <ul className="space-y-3">
                {recs.map((rec, index) => (
                  <li 
                    key={index} 
                    className="flex items-start p-2 rounded-lg hover:bg-white/50 transition-all"
                  >
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;