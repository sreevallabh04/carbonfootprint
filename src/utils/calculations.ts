export const calculateEmissions = (data: any) => {
  // Transportation emissions (simplified calculation)
  const transportationFactors = {
    car: { petrol: 0.2, diesel: 0.17, electric: 0.05 },
    bus: { diesel: 0.08 },
    bike: { human: 0 },
  };

  const energyFactors = {
    coal: 0.9,
    natural: 0.4,
    renewable: 0.1,
  };

  const dietFactors = {
    omnivore: 2.5,
    vegetarian: 1.7,
    vegan: 1.5,
  };

  const wasteFactors = {
    high: 1.5,
    medium: 1.0,
    low: 0.5,
  };

  // Calculate emissions for each category
  const transportation = 
    transportationFactors[data.transportation.vehicleType]?.[data.transportation.fuelType] * 
    data.transportation.distance * 365 || 0;

  const energy = 
    (data.energy.electricity * 12) * 
    (energyFactors[data.energy.energySource] || energyFactors.coal);

  const food = 
    (dietFactors[data.food.dietType] || dietFactors.omnivore) * 365;

  const waste = 
    (wasteFactors[data.waste.wasteAmount] || wasteFactors.medium) * 365;

  const total = transportation + energy + food + waste;

  return {
    transportation,
    energy,
    food,
    waste,
    total,
  };
};