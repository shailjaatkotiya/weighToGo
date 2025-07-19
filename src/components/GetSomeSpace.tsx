import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Grid, Button, Chip, Stack, Paper, Divider, Avatar } from '@mui/material';

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

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
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

interface SpaceOffer {
  passenger: FlightPassenger;
  user: User;
  flight: Flight;
}

export default function GetSomeSpace() {
  const [spaceOffers, setSpaceOffers] = useState<SpaceOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/space.json')
      .then((res) => res.json())
      .then((data) => {
        // Filter for space offers and join with user and flight data
        const offers = data.flightPassengers
          .filter((passenger: FlightPassenger) => passenger.spaceType === 'offer')
          .map((passenger: FlightPassenger) => ({
            passenger,
            user: data.users.find((user: User) => user.userId === passenger.userId),
            flight: data.flights.find((flight: Flight) => flight.flightId === passenger.flightId)
          }))
          .filter((offer: SpaceOffer) => offer.user && offer.flight);
        
        setSpaceOffers(offers);
        setLoading(false);
      });
  }, []);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleBookSpace = (offer: SpaceOffer) => {
    // In a real app, this would create a transaction
    console.log('Booking space from:', offer.user.name);
    alert(`Booking ${offer.passenger.weightKg}kg space from ${offer.user.name} for ₹${offer.passenger.pricePerKg}/kg on flight ${offer.flight.flightNumber}`);
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <CircularProgress sx={{ color: 'var(--sgbus-green)' }} />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ 
        color: 'var(--sgbus-green)',
        mb: 2,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        Available Luggage Space
      </Typography>

      <Typography variant="h6" sx={{ 
        color: 'var(--tea-green)',
        mb: 4,
        textAlign: 'center'
      }}>
        Find travelers offering extra space for your luggage
      </Typography>
      
      {spaceOffers.length === 0 ? (
        <Paper elevation={2} sx={{ 
          bgcolor: 'rgba(132, 218, 93, 0.1)',
          border: '1px solid',
          borderColor: 'var(--sgbus-green)',
          borderRadius: 3,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography sx={{ color: 'var(--tea-green)', fontSize: '1.1rem' }}>
            No space offers available at the moment.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {spaceOffers.map((offer) => (
            <Grid item xs={12} md={6} key={offer.passenger.passengerId}>
              <Card elevation={3} sx={{ 
                bgcolor: 'rgba(132, 218, 93, 0.1)',
                border: '1px solid',
                borderColor: 'var(--sgbus-green)',
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 25px rgba(132, 218, 93, 0.3)',
                  borderColor: 'var(--mint)'
                }
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        bgcolor: 'var(--sgbus-green)', 
                        color: 'var(--black)', 
                        mr: 2,
                        width: 48,
                        height: 48,
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {offer.user.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" sx={{ color: 'var(--sgbus-green)', fontWeight: 'bold' }}>
                        {offer.user.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`${offer.passenger.weightKg}kg available`}
                      sx={{ 
                        bgcolor: 'var(--sgbus-green)', 
                        color: 'var(--black)',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}
                    />
                  </Box>

                  {/* Flight Details */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      color: 'var(--mint)', 
                      mb: 2, 
                      fontWeight: 'bold',
                      borderBottom: '2px solid var(--mint)',
                      pb: 1
                    }}>
                      Flight Details
                    </Typography>
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Flight:
                        </Typography>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            {offer.flight.flightNumber}
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.85rem' }}>
                            {offer.flight.airline}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Route:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)' }}>
                          {offer.flight.from} → {offer.flight.to}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Date:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)' }}>
                          {offer.flight.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Time:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)' }}>
                          {offer.flight.departureTime} - {offer.flight.arrivalTime}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Duration:
                        </Typography>
                        <Chip 
                          label={`${formatDuration(offer.flight.duration)} | ${offer.flight.flightType}`}
                          size="small"
                          sx={{ 
                            bgcolor: 'var(--mint)', 
                            color: 'var(--black)',
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>

                  <Divider sx={{ borderColor: 'var(--mint)', mb: 3 }} />

                  {/* Contact Details */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: 'var(--sgbus-green)', 
                      mb: 2, 
                      fontWeight: 'bold',
                      borderBottom: '2px solid var(--sgbus-green)',
                      pb: 1
                    }}>
                      Contact Details
                    </Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Email:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.85rem' }}>
                          {offer.user.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Phone:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.85rem' }}>
                          {offer.user.phone}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Price and Action */}
                  <Box sx={{ 
                    mt: 'auto', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    bgcolor: 'rgba(69, 183, 123, 0.1)',
                    borderRadius: 2,
                    border: '1px solid var(--mint)'
                  }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: 'var(--tea-green)', mb: 0.5 }}>
                        Price per kg
                      </Typography>
                      <Typography variant="h5" sx={{ color: 'var(--sgbus-green)', fontWeight: 'bold' }}>
                        ₹{offer.passenger.pricePerKg}
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained"
                      size="large"
                      onClick={() => handleBookSpace(offer)}
                      sx={{ 
                        bgcolor: 'var(--mint)',
                        color: 'var(--black)',
                        fontWeight: 'bold',
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'var(--sgbus-green)',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      Book Space
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