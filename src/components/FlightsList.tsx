import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Divider,
  Button
} from '@mui/material';

interface Flight {
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

interface FlightPassenger {
  passengerId: string;
  userId: string;
  flightId: string;
  spaceType: 'offer' | 'request';
  weightKg: number;
  pricePerKg: number | null;
  status: string;
}

interface FlightWithPassengers extends Flight {
  passengerCount: number;
  offersCount: number;
  requestsCount: number;
  totalOfferedKg: number;
  totalRequestedKg: number;
}

export default function FlightsList() {
  const [flights, setFlights] = useState<FlightWithPassengers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch('/space.json');
      const data = await response.json();
      
      const flightsWithStats = data.flights.map((flight: Flight) => {
        const flightPassengers = data.flightPassengers.filter(
          (p: FlightPassenger) => p.flightId === flight.flightId
        );
        
        const offers = flightPassengers.filter((p: FlightPassenger) => p.spaceType === 'offer');
        const requests = flightPassengers.filter((p: FlightPassenger) => p.spaceType === 'request');
        
        return {
          ...flight,
          passengerCount: flightPassengers.length,
          offersCount: offers.length,
          requestsCount: requests.length,
          totalOfferedKg: offers.reduce((sum: number, p: FlightPassenger) => sum + p.weightKg, 0),
          totalRequestedKg: requests.reduce((sum: number, p: FlightPassenger) => sum + p.weightKg, 0)
        };
      });

      setFlights(flightsWithStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getAvailabilityColor = (offered: number, requested: number) => {
    if (offered > requested) return 'var(--sgbus-green)';
    if (offered === requested) return 'var(--mint)';
    return '#ff9800'; // Orange for high demand
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress sx={{ color: 'var(--sgbus-green)' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ 
        color: 'var(--sgbus-green)',
        mb: 2,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        All Flights
      </Typography>

      <Typography variant="h6" sx={{ 
        color: 'var(--tea-green)',
        mb: 4,
        textAlign: 'center'
      }}>
        Browse all available flights and their luggage space activity
      </Typography>

      {flights.length === 0 ? (
        <Card sx={{ 
          bgcolor: 'rgba(132, 218, 93, 0.1)',
          border: '1px solid var(--sgbus-green)',
          p: 3,
          textAlign: 'center'
        }}>
          <Typography sx={{ color: 'var(--tea-green)', fontSize: '1.1rem' }}>
            No flights available at the moment.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {flights.map((flight) => (
            <Grid item xs={12} md={6} lg={4} key={flight.flightId}>
              <Card sx={{ 
                bgcolor: 'rgba(132, 218, 93, 0.1)',
                border: '1px solid var(--sgbus-green)',
                borderRadius: 2,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(132, 218, 93, 0.3)'
                }
              }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Flight Header */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ color: 'var(--sgbus-green)', fontWeight: 'bold' }}>
                        {flight.flightNumber}
                      </Typography>
                      <Chip 
                        label={flight.flightType}
                        size="small"
                        sx={{ 
                          bgcolor: flight.flightType === 'international' ? 'var(--mint)' : 'var(--sgbus-green)',
                          color: 'var(--black)',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.9rem' }}>
                      {flight.airline}
                    </Typography>
                  </Box>

                  {/* Route and Time */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ color: 'var(--mint)', mb: 1 }}>
                      {flight.from} → {flight.to}
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.9rem' }}>
                      <strong>Date:</strong> {flight.date}
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.9rem' }}>
                      <strong>Departure:</strong> {flight.departureTime}
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.9rem' }}>
                      <strong>Arrival:</strong> {flight.arrivalTime}
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.9rem' }}>
                      <strong>Duration:</strong> {formatDuration(flight.duration)}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: 'var(--mint)', mb: 2 }} />

                  {/* Space Statistics */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ color: 'var(--mint)', mb: 2, fontWeight: 'bold' }}>
                      Luggage Space Activity
                    </Typography>
                    
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(132, 218, 93, 0.2)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'var(--sgbus-green)', fontWeight: 'bold' }}>
                            {flight.totalOfferedKg}kg
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.8rem' }}>
                            Offered ({flight.offersCount})
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(69, 183, 123, 0.2)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'var(--mint)', fontWeight: 'bold' }}>
                            {flight.totalRequestedKg}kg
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.8rem' }}>
                            Requested ({flight.requestsCount})
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Chip 
                        label={`${flight.passengerCount} Total Passengers`}
                        sx={{ 
                          bgcolor: 'var(--tea-green)',
                          color: 'var(--black)',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>

                    {/* Availability Status */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: getAvailabilityColor(flight.totalOfferedKg, flight.totalRequestedKg),
                          fontWeight: 'bold'
                        }}
                      >
                        {flight.totalOfferedKg > flight.totalRequestedKg && 'Space Available'}
                        {flight.totalOfferedKg === flight.totalRequestedKg && flight.totalOfferedKg > 0 && 'Balanced Supply'}
                        {flight.totalOfferedKg < flight.totalRequestedKg && 'High Demand'}
                        {flight.totalOfferedKg === 0 && flight.totalRequestedKg === 0 && 'No Activity'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Button */}
                  <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: 'var(--sgbus-green)',
                        color: 'var(--black)',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: 'var(--mint)'
                        }
                      }}
                    >
                      View Flight Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
} 