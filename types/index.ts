export type VehicleCategory =
  | 'Sports Car'
  | 'Sports Sedan'
  | 'Luxury Sedan'
  | 'SUV'
  | 'Pickup'
  | 'Coupe'
  | 'Convertible'
  | 'Hatchback'
  | 'Fastback'
  | 'Crossover'
  | 'Family Car'
  | 'Electric Vehicle'
  | 'Hybrid'
  | 'Hypercar'
  | 'Supercar'
  | 'Off Road'
  | 'Van'
  | 'City Car';

export type FuelType =
  | 'Gasoline'
  | 'Diesel'
  | 'Hybrid'
  | 'Plug-in Hybrid'
  | 'Electric'
  | 'Hydrogen';

export type TransmissionType = 'Automatic' | 'Manual' | 'Dual-Clutch' | 'CVT';

export type DrivetrainType = 'RWD' | 'FWD' | 'AWD' | '4WD';

export type VehicleBadge =
  | 'New'
  | 'Electric'
  | 'Best Seller'
  | 'Luxury'
  | 'Track Focused'
  | 'Limited Edition';

export interface Brand {
  id: string;
  name: string;
  country: string;
  founded: number;
  founder: string;
  headquarters: string;
  website: string;
  description: string;
  history: string;
  brandColor: string;
}

export interface Vehicle {
  id: string;
  brandId: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  bodyStyle: string;
  doors: number;
  seats: number;
  engine: string;
  engineCode: string;
  engineType: string;
  displacement: string;
  turbocharged: boolean;
  horsepower: number;
  torque: number;
  transmission: TransmissionType;
  drivetrain: DrivetrainType;
  fuelType: FuelType;
  fuelTank: number;
  batteryCapacity?: number;
  range?: number;
  chargingSpeed?: string;
  topSpeed: number;
  zeroToHundred: number;
  zeroToTwoHundred?: number;
  quarterMile?: number;
  brakingDistance?: number;
  fuelEconomy?: number;
  co2Emissions?: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  cargoVolume: number;
  towingCapacity?: number;
  startingPrice: number;
  highestTrimPrice: number;
  description: string;
  pros: string[];
  cons: string[];
  awards?: string[];
  reliabilityScore: number;
  luxuryScore: number;
  comfortScore: number;
  technologyScore: number;
  performanceScore: number;
  safetyScore: number;
  dailyDrivingScore: number;
  fuelEconomyScore: number;
  soundScore: number;
  funFactorScore: number;
  overallScore: number;
  availableColors: string[];
  badges: VehicleBadge[];
  featured?: boolean;
  trending?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Electric' | 'Luxury' | 'Performance' | 'Industry' | 'Technology' | 'SUV' | 'Concept Cars';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  featured?: boolean;
}
