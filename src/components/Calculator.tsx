import React, { useState } from 'react';
import { Car, Zap, Utensils, Recycle, Leaf } from 'lucide-react';
import { FootprintData, EmissionsResult } from '../types';
import { calculateEmissions } from '../utils/calculations';
import Results from './Results';
import Recommendations from './Recommendations';

const initialData: FootprintData = {
  transportation: {
    vehicleType: 'car',
    fuelType: 'petrol',
    distance: 0,
  },
  energy: {
    electricity: 0,
    energySource: 'coal',
  },
  food: {
    dietType: 'omnivore',
    wasteFrequency: 'medium',
  },
  waste: {
    wasteAmount: 'medium',
    recycling: 'sometimes',
  },
};

const Calculator: React.FC = () => {
  const [data, setData] = useState<FootprintData>(initialData);
  const [results, setResults] = useState<EmissionsResult | null>(null);
  const [activeSection, setActiveSection] = useState('transportation');

  const handleCalculate = () => {
    const emissions = calculateEmissions(data);
    setResults(emissions);
  };

  const sections = [
    {
      id: 'transportation',
      icon: Car,
      title: 'Transportation',
      fields: (
        <>
          <select
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur mb-4"
            value={data.transportation.vehicleType}
            onChange={(e) =>
              setData({
                ...data,
                transportation: { ...data.transportation, vehicleType: e.target.value },
              })
            }
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="bike">Bicycle</option>
          </select>
          {data.transportation.vehicleType === 'car' && (
            <select
              className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur mb-4"
              value={data.transportation.fuelType}
              onChange={(e) =>
                setData({
                  ...data,
                  transportation: { ...data.transportation, fuelType: e.target.value },
                })
              }
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          )}
          <input
            type="number"
            placeholder="Daily distance (km)"
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur"
            value={data.transportation.distance || ''}
            onChange={(e) =>
              setData({
                ...data,
                transportation: { ...data.transportation, distance: Number(e.target.value) },
              })
            }
          />
        </>
      ),
    },
    {
      id: 'energy',
      icon: Zap,
      title: 'Energy Usage',
      fields: (
        <>
          <input
            type="number"
            placeholder="Monthly electricity usage (kWh)"
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur mb-4"
            value={data.energy.electricity || ''}
            onChange={(e) =>
              setData({
                ...data,
                energy: { ...data.energy, electricity: Number(e.target.value) },
              })
            }
          />
          <select
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur"
            value={data.energy.energySource}
            onChange={(e) =>
              setData({
                ...data,
                energy: { ...data.energy, energySource: e.target.value },
              })
            }
          >
            <option value="coal">Coal</option>
            <option value="natural">Natural Gas</option>
            <option value="renewable">Renewable Energy</option>
          </select>
        </>
      ),
    },
    {
      id: 'food',
      icon: Utensils,
      title: 'Food Habits',
      fields: (
        <>
          <select
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur mb-4"
            value={data.food.dietType}
            onChange={(e) =>
              setData({
                ...data,
                food: { ...data.food, dietType: e.target.value },
              })
            }
          >
            <option value="omnivore">Omnivore</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
          <select
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur"
            value={data.food.wasteFrequency}
            onChange={(e) =>
              setData({
                ...data,
                food: { ...data.food, wasteFrequency: e.target.value },
              })
            }
          >
            <option value="low">Low Food Waste</option>
            <option value="medium">Medium Food Waste</option>
            <option value="high">High Food Waste</option>
          </select>
        </>
      ),
    },
    {
      id: 'waste',
      icon: Recycle,
      title: 'Waste Management',
      fields: (
        <>
          <select
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur mb-4"
            value={data.waste.wasteAmount}
            onChange={(e) =>
              setData({
                ...data,
                waste: { ...data.waste, wasteAmount: e.target.value },
              })
            }
          >
            <option value="low">Low Waste Generation</option>
            <option value="medium">Medium Waste Generation</option>
            <option value="high">High Waste Generation</option>
          </select>
          <select
            className="input-field w-full p-3 rounded-lg bg-white/80 backdrop-blur"
            value={data.waste.recycling}
            onChange={(e) =>
              setData({
                ...data,
                waste: { ...data.waste, recycling: e.target.value },
              })
            }
          >
            <option value="always">Always Recycle</option>
            <option value="sometimes">Sometimes Recycle</option>
            <option value="never">Never Recycle</option>
          </select>
        </>
      ),
    },
  ];

  return (
    <div className="eco-background min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <Leaf className="w-8 h-8 text-green-500 mr-3 floating" />
              <h1 className="text-4xl font-bold text-gray-800">
                Carbon Footprint Calculator
              </h1>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              {sections.map(({ id, icon: Icon, title }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`category-button p-4 rounded-xl transition-all ${
                    activeSection === id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 floating" />
                  <span className="text-sm font-medium">{title}</span>
                </button>
              ))}
            </div>

            <div className="glass-card p-6 rounded-xl mb-8">
              {sections.find((s) => s.id === activeSection)?.fields}
            </div>

            <button
              onClick={handleCalculate}
              className="eco-button w-full text-white py-4 rounded-xl font-semibold shadow-lg"
            >
              Calculate My Footprint
            </button>
          </div>

          {results && (
            <div className="results-appear border-t border-white/20">
              <Results results={results} />
              <Recommendations results={results} data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;