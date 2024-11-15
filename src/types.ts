export interface FootprintData {
  transportation: {
    vehicleType: string;
    fuelType: string;
    distance: number;
  };
  energy: {
    electricity: number;
    energySource: string;
  };
  food: {
    dietType: string;
    wasteFrequency: string;
  };
  waste: {
    wasteAmount: string;
    recycling: string;
  };
}

export interface EmissionsResult {
  transportation: number;
  energy: number;
  food: number;
  waste: number;
  total: number;
}