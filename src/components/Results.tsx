import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { EmissionsResult } from '../types';

interface ResultsProps {
  results: EmissionsResult;
}

const COLORS = ['#34D399', '#60A5FA', '#F59E0B', '#EF4444'];

const Results: React.FC<ResultsProps> = ({ results }) => {
  const data = [
    { name: 'Transportation', value: results.transportation },
    { name: 'Energy', value: results.energy },
    { name: 'Food', value: results.food },
    { name: 'Waste', value: results.waste },
  ];

  return (
    <div className="p-8 glass-card">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Carbon Footprint
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Emissions</h3>
          <p className="text-4xl font-bold text-green-600 floating">
            {results.total.toFixed(2)}
            <span className="text-lg font-normal text-gray-600 ml-2">tonnes CO₂/year</span>
          </p>
          
          <div className="mt-6 space-y-4">
            {data.map((item, index) => (
              <div 
                key={item.name} 
                className="flex justify-between items-center p-3 rounded-lg hover:bg-white/50 transition-all"
              >
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold" style={{ color: COLORS[index] }}>
                  {item.value.toFixed(2)} tonnes
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[300px] glass-card p-4 rounded-xl">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Results;