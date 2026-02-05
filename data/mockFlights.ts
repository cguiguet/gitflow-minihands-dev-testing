export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: number;
  stopDetails?: {
    airport: string;
    duration: string;
  }[];
  price: number;
  currency: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  availableSeats: number;
}

export const mockFlights: Flight[] = [
  {
    id: 'f1',
    airline: 'Air France',
    airlineLogo: '✈️',
    departureTime: '08:30',
    arrivalTime: '10:45',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
    duration: '7h 15m',
    stops: 0,
    price: 450,
    currency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 12,
  },
  {
    id: 'f2',
    airline: 'Delta',
    airlineLogo: '✈️',
    departureTime: '14:20',
    arrivalTime: '04:15',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
    duration: '8h 55m',
    stops: 1,
    stopDetails: [
      {
        airport: 'AMS',
        duration: '1h 30m',
      },
    ],
    price: 380,
    currency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 8,
  },
  {
    id: 'f3',
    airline: 'United',
    airlineLogo: '✈️',
    departureTime: '18:45',
    arrivalTime: '08:30',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
    duration: '7h 45m',
    stops: 0,
    price: 520,
    currency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 5,
  },
  {
    id: 'f4',
    airline: 'British Airways',
    airlineLogo: '✈️',
    departureTime: '22:00',
    arrivalTime: '10:15',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
    duration: '6h 15m',
    stops: 0,
    price: 680,
    currency: 'USD',
    cabinClass: 'Business',
    availableSeats: 3,
  },
  {
    id: 'f5',
    airline: 'Lufthansa',
    airlineLogo: '✈️',
    departureTime: '11:30',
    arrivalTime: '01:45',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
    duration: '8h 15m',
    stops: 1,
    stopDetails: [
      {
        airport: 'FRA',
        duration: '2h 00m',
      },
    ],
    price: 420,
    currency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 15,
  },
];

export function getFlightsByDestination(destinationId: string): Flight[] {
  return mockFlights;
}
