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

interface SpaceRequest {
  passenger: FlightPassenger;
  user: User;
  flight: Flight;
}

export default function GiveSomeSpace() {
  const [spaceRequests, setSpaceRequests] = useState<SpaceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/space.json')
      .then((res) => res.json())
      .then((data) => {
        // Filter for space requests and join with user and flight data
        const requests = data.flightPassengers
          .filter((passenger: FlightPassenger) => passenger.spaceType === 'request')
          .map((passenger: FlightPassenger) => ({
            passenger,
            user: data.users.find((user: User) => user.userId === passenger.userId),
            flight: data.flights.find((flight: Flight) => flight.flightId === passenger.flightId)
          }))
          .filter((request: SpaceRequest) => request.user && request.flight);
        
        setSpaceRequests(requests);
        setLoading(false);
      });
  }, []);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleOfferSpace = (request: SpaceRequest) => {
    // In a real app, this would create a transaction
    console.log('Offering space to:', request.user.name);
    alert(`Offering space to ${request.user.name} for ${request.passenger.weightKg}kg on flight ${request.flight.flightNumber}`);
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
        Space Requests
      </Typography>

      <Typography variant="h6" sx={{ 
        color: 'var(--tea-green)',
        mb: 4,
        textAlign: 'center'
      }}>
        Help fellow travelers by offering your extra luggage space
      </Typography>
      
      {spaceRequests.length === 0 ? (
        <Paper elevation={2} sx={{ 
          bgcolor: 'rgba(69, 183, 123, 0.1)',
          border: '1px solid',
          borderColor: 'var(--mint)',
          borderRadius: 3,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography sx={{ color: 'var(--tea-green)', fontSize: '1.1rem' }}>
            No space requests available at the moment.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {spaceRequests.map((request) => (
            <Grid item xs={12} md={6} key={request.passenger.passengerId}>
              <Card elevation={3} sx={{ 
                bgcolor: 'rgba(69, 183, 123, 0.1)',
                border: '1px solid',
                borderColor: 'var(--mint)',
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 25px rgba(69, 183, 123, 0.3)',
                  borderColor: 'var(--sgbus-green)'
                }
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        bgcolor: 'var(--mint)', 
                        color: 'var(--black)', 
                        mr: 2,
                        width: 48,
                        height: 48,
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {request.user.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" sx={{ color: 'var(--mint)', fontWeight: 'bold' }}>
                        {request.user.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`${request.passenger.weightKg}kg needed`}
                      sx={{ 
                        bgcolor: 'var(--mint)', 
                        color: 'var(--black)',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}
                    />
                  </Box>

                  {/* Flight Details */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      color: 'var(--sgbus-green)', 
                      mb: 2, 
                      fontWeight: 'bold',
                      borderBottom: '2px solid var(--sgbus-green)',
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
                            {request.flight.flightNumber}
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.85rem' }}>
                            {request.flight.airline}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Route:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)' }}>
                          {request.flight.from} → {request.flight.to}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Date:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)' }}>
                          {request.flight.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Time:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)' }}>
                          {request.flight.departureTime} - {request.flight.arrivalTime}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Duration:
                        </Typography>
                        <Chip 
                          label={`${formatDuration(request.flight.duration)} | ${request.flight.flightType}`}
                          size="small"
                          sx={{ 
                            bgcolor: 'var(--sgbus-green)', 
                            color: 'var(--black)',
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>

                  <Divider sx={{ borderColor: 'var(--sgbus-green)', mb: 3 }} />

                  {/* Contact Details */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: 'var(--mint)', 
                      mb: 2, 
                      fontWeight: 'bold',
                      borderBottom: '2px solid var(--mint)',
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
                          {request.user.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                          Phone:
                        </Typography>
                        <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.85rem' }}>
                          {request.user.phone}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Call to Action */}
                  <Box sx={{ 
                    mt: 'auto', 
                    display: 'flex', 
                    justifyContent: 'center',
                    p: 2,
                    bgcolor: 'rgba(132, 218, 93, 0.1)',
                    borderRadius: 2,
                    border: '1px solid var(--sgbus-green)'
                  }}>
                    <Button 
                      variant="contained"
                      size="large"
                      onClick={() => handleOfferSpace(request)}
                      sx={{ 
                        bgcolor: 'var(--mint)',
                        color: 'var(--black)',
                        fontWeight: 'bold',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'var(--sgbus-green)',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      Offer Space
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