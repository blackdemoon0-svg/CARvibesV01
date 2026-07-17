import { Vehicle, Brand } from '@/types';
import { brands } from './brands';
import {
  bmwVehicles,
  mercedesVehicles,
  audiVehicles,
  porscheVehicles,
  ferrariVehicles,
  lamborghiniVehicles,
  mclarenVehicles,
  teslaVehicles,
} from './vehicles-vol1';
import {
  bugattiVehicles,
  koenigseggVehicles,
  paganiVehicles,
  rollsRoyceVehicles,
  bentleyVehicles,
  astonMartinVehicles,
  maseratiVehicles,
  jaguarVehicles,
  landRoverVehicles,
  toyotaVehicles,
  hondaVehicles,
  nissanVehicles,
  lexusVehicles,
  fordVehicles,
  chevroletVehicles,
  dodgeVehicles,
  hyundaiVehicles,
  kiaVehicles,
  volkswagenVehicles,
  peugeotVehicles,
  renaultVehicles,
  alfaRomeoVehicles,
} from './vehicles-vol2';

export const vehicles: Vehicle[] = [
  ...bmwVehicles,
  ...mercedesVehicles,
  ...audiVehicles,
  ...porscheVehicles,
  ...ferrariVehicles,
  ...lamborghiniVehicles,
  ...mclarenVehicles,
  ...teslaVehicles,
  ...bugattiVehicles,
  ...koenigseggVehicles,
  ...paganiVehicles,
  ...rollsRoyceVehicles,
  ...bentleyVehicles,
  ...astonMartinVehicles,
  ...maseratiVehicles,
  ...jaguarVehicles,
  ...landRoverVehicles,
  ...toyotaVehicles,
  ...hondaVehicles,
  ...nissanVehicles,
  ...lexusVehicles,
  ...fordVehicles,
  ...chevroletVehicles,
  ...dodgeVehicles,
  ...hyundaiVehicles,
  ...kiaVehicles,
  ...volkswagenVehicles,
  ...peugeotVehicles,
  ...renaultVehicles,
  ...alfaRomeoVehicles,
];

export { brands };

export const getVehicle = (id: string): Vehicle | undefined =>
  vehicles.find((v) => v.id === id);

export const getVehiclesByBrand = (brandId: string): Vehicle[] =>
  vehicles.filter((v) => v.brandId === brandId);

export const getFeaturedVehicles = (): Vehicle[] =>
  vehicles.filter((v) => v.featured);

export const getTrendingVehicles = (): Vehicle[] =>
  vehicles.filter((v) => v.trending);

export const getVehiclesByCategory = (category: string): Vehicle[] =>
  vehicles.filter((v) => v.category === category);

export const getRelatedVehicles = (vehicle: Vehicle, count = 4): Vehicle[] => {
  const others = vehicles.filter((v) => v.id !== vehicle.id);
  const scored = others.map((v) => {
    let score = 0;
    if (v.brandId === vehicle.brandId) score += 3;
    if (v.category === vehicle.category) score += 2;
    if (v.fuelType === vehicle.fuelType) score += 1;
    const priceDiff = Math.abs(v.startingPrice - vehicle.startingPrice);
    if (priceDiff < 50000) score += 2;
    else if (priceDiff < 100000) score += 1;
    const hpDiff = Math.abs(v.horsepower - vehicle.horsepower);
    if (hpDiff < 100) score += 2;
    else if (hpDiff < 200) score += 1;
    const scoreDiff = Math.abs(v.overallScore - vehicle.overallScore);
    if (scoreDiff < 0.5) score += 1;
    return { vehicle: v, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.vehicle);
};

export const getVehicleCountByBrand = (brandId: string): number =>
  vehicles.filter((v) => v.brandId === brandId).length;

export const getAllCategories = (): string[] =>
  [...new Set(vehicles.map((v) => v.category))].sort();

export const getAllFuelTypes = (): string[] =>
  [...new Set(vehicles.map((v) => v.fuelType))].sort();

export const getAllDrivetrains = (): string[] =>
  [...new Set(vehicles.map((v) => v.drivetrain))].sort();

export const getBrand = (id: string): Brand | undefined =>
  brands.find((b) => b.id === id);

export const getBrandByVehicle = (vehicle: Vehicle): Brand | undefined =>
  getBrand(vehicle.brandId);

export const formatPrice = (price: number): string => {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(2)}M`;
  if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
  return `$${price.toLocaleString()}`;
};

export const getGalleryUrl = (vehicle: Vehicle): string =>
  `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
  )}`;
