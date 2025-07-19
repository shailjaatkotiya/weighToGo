export interface Flight {
  flightId: string;
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  duration: number;
  flightType: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

export interface FlightPassenger {
  passengerId: string;
  userId: string;
  flightId: string;
  spaceType: 'offer' | 'request';
  weightKg: number;
  pricePerKg: number | null;
  status: string;
}

export interface SpaceOfferFormData {
  pnr: string;
  name: string;
  email: string;
  phone: string;
  flightId: string;
  weightKg: number;
  pricePerKg: number;
}

export interface SpaceRequestFormData {
  pnr: string;
  name: string;
  email: string;
  phone: string;
  flightId: string;
  weightKg: number;
  itemDescription: string;
}

export interface SpaceOffer {
  passenger: FlightPassenger;
  user: User;
  flight: Flight;
}

export interface SpaceRequest {
  passenger: FlightPassenger;
  user: User;
  flight: Flight;
}

export interface UserFlightInfo {
  flight: Flight;
  currentUserPassenger: FlightPassenger | null;
  otherPassengers: Array<{
    passenger: FlightPassenger;
    user: User;
  }>;
}

export type AppSection = 
  | 'home'
  | 'dashboard'
  | 'manage-space'
  | 'find-space'
  | 'offer-space'
  | 'flights'
  | 'users'; 