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
  Avatar,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

interface FlightInfo {
  flight: Flight;
  passengers: {
    passenger: FlightPassenger;
    user: User;
  }[];
  currentUserPassenger: FlightPassenger | null;
}

export default function FlightDashboard() {
  const [userFlights, setUserFlights] = useState<FlightInfo[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchUserFlights();
  }, []);

  const fetchUserFlights = async () => {
    try {
      const response = await fetch('/space.json');
      const data = await response.json();

      if (!data.currentUser) {
        setLoading(false);
        return;
      }

      const user = data.users.find((u: User) => u.userId === data.currentUser.userId);
      setCurrentUser(user);

      // Get all flights where current user is a passenger
      const userPassengers = data.flightPassengers.filter(
        (p: FlightPassenger) => p.userId === data.currentUser.userId
      );

      const flightInfos = userPassengers.map((userPassenger: FlightPassenger) => {
        const flight = data.flights.find((f: Flight) => f.flightId === userPassenger.flightId);

        // Get all passengers on this flight
        const flightPassengers = data.flightPassengers
          .filter((p: FlightPassenger) => p.flightId === userPassenger.flightId)
          .map((passenger: FlightPassenger) => ({
            passenger,
            user: data.users.find((u: User) => u.userId === passenger.userId)
          }))
          .filter((p: any) => p.user);

        return {
          flight,
          passengers: flightPassengers,
          currentUserPassenger: userPassenger
        };
      }).filter((info: any) => info.flight);

      setUserFlights(flightInfos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user flights:', error);
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getSpaceTypeColor = (spaceType: string) => {
    return spaceType === 'offer' ? 'var(--sgbus-green)' : 'var(--mint)';
  };

  const getSpaceTypeLabel = (spaceType: string, weightKg: number) => {
    return spaceType === 'offer' ? `Offering ${weightKg}kg` : `Requesting ${weightKg}kg`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress sx={{ color: 'var(--sgbus-green)' }} />
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6, md: 8 } }}>
        <Typography
          variant="h5"
          sx={{
            color: 'var(--tea-green)',
            fontSize: {
              xs: 'clamp(1rem, 4vw, 1.25rem)',
              sm: 'clamp(1.25rem, 3vw, 1.5rem)'
            }
          }}
        >
          Please log in to view your flight dashboard
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      maxWidth: 1200,
      mx: 'auto',
      p: { xs: 2, sm: 3 }
    }}>
      <Typography
        variant="h4"
        sx={{
          color: 'var(--sgbus-green)',
          mb: { xs: 1.5, sm: 2 },
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: {
            xs: 'clamp(1.5rem, 6vw, 2rem)',
            sm: 'clamp(2rem, 5vw, 2.5rem)',
            md: 'clamp(2.5rem, 4vw, 3rem)'
          }
        }}
      >
        My Flight Dashboard
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: 'var(--tea-green)',
          mb: { xs: 3, sm: 4 },
          textAlign: 'center',
          fontSize: {
            xs: 'clamp(0.875rem, 3vw, 1rem)',
            sm: 'clamp(1rem, 2.5vw, 1.125rem)',
            md: 'clamp(1.125rem, 2vw, 1.25rem)'
          }
        }}
      >
        Welcome back, {currentUser.name}!
      </Typography>

      {userFlights.length === 0 ? (
        <Paper elevation={2} sx={{
          bgcolor: 'rgba(132, 218, 93, 0.1)',
          border: '1px solid var(--sgbus-green)',
          p: { xs: 3, sm: 4 },
          textAlign: 'center',
          borderRadius: 3
        }}>
          <Typography sx={{
            color: 'var(--tea-green)',
            fontSize: {
              xs: 'clamp(0.875rem, 3vw, 1rem)',
              sm: 'clamp(1rem, 2.5vw, 1.1rem)'
            }
          }}>
            You don't have any flights registered yet.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={{ xs: 3, sm: 4 }}>
          {userFlights.map((flightInfo) => (
            <Card key={flightInfo.flight.flightId} elevation={3} sx={{
              bgcolor: 'rgba(132, 218, 93, 0.1)',
              border: '1px solid var(--sgbus-green)',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                {/* Flight Header */}
                <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: { xs: 2, sm: 3 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 0 }
                  }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'var(--sgbus-green)',
                        fontWeight: 'bold',
                        fontSize: {
                          xs: 'clamp(1.25rem, 5vw, 1.75rem)',
                          sm: 'clamp(1.5rem, 4vw, 2rem)',
                          md: 'clamp(2rem, 3vw, 2.25rem)'
                        }
                      }}
                    >
                      {flightInfo.flight.flightNumber}
                    </Typography>
                    <Chip
                      label={flightInfo.currentUserPassenger ?
                        getSpaceTypeLabel(flightInfo.currentUserPassenger.spaceType, flightInfo.currentUserPassenger.weightKg) :
                        'Passenger'
                      }
                      sx={{
                        bgcolor: flightInfo.currentUserPassenger ?
                          getSpaceTypeColor(flightInfo.currentUserPassenger.spaceType) :
                          'var(--tea-green)',
                        color: 'var(--black)',
                        fontWeight: 'bold',
                        fontSize: {
                          xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                          sm: 'clamp(0.875rem, 2vw, 1rem)'
                        },
                        height: { xs: 32, sm: 40 },
                        px: { xs: 1, sm: 2 }
                      }}
                    />
                  </Box>

                  <Grid container spacing={{ xs: 2, sm: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1.5}>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: { xs: 0.5, sm: 0 }
                        }}>
                          <Typography sx={{
                            color: 'var(--tea-green)',
                            fontWeight: 'bold',
                            fontSize: {
                              xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                              sm: 'clamp(0.875rem, 2vw, 1rem)'
                            }
                          }}>
                            Airline:
                          </Typography>
                          <Typography sx={{
                            color: 'var(--tea-green)',
                            fontSize: {
                              xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                              sm: 'clamp(0.875rem, 2vw, 1rem)'
                            }
                          }}>
                            {flightInfo.flight.airline}
                          </Typography>
                        </Box>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: { xs: 0.5, sm: 0 }
                        }}>
                          <Typography sx={{
                            color: 'var(--tea-green)',
                            fontWeight: 'bold',
                            fontSize: {
                              xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                              sm: 'clamp(0.875rem, 2vw, 1rem)'
                            }
                          }}>
                            Route:
                          </Typography>
                          <Typography sx={{
                            color: 'var(--tea-green)',
                            fontSize: {
                              xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                              sm: 'clamp(0.875rem, 2vw, 1rem)'
                            }
                          }}>
                            {flightInfo.flight.from} → {flightInfo.flight.to}
                          </Typography>
                        </Box>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: { xs: 0.5, sm: 0 }
                        }}>
                          <Typography sx={{
                            color: 'var(--tea-green)',
                            fontWeight: 'bold',
                            fontSize: {
                              xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                              sm: 'clamp(0.875rem, 2vw, 1rem)'
                            }
                          }}>
                            Type:
                          </Typography>
                          <Chip
                            label={flightInfo.flight.flightType}
                            size="small"
                            sx={{
                              bgcolor: 'var(--mint)',
                              color: 'var(--black)',
                              textTransform: 'capitalize',
                              fontSize: {
                                xs: 'clamp(0.625rem, 2vw, 0.75rem)',
                                sm: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                              }
                            }}
                          />
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1.5}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            Date:
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            {flightInfo.flight.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            Departure:
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            {flightInfo.flight.departureTime}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            Arrival:
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            {flightInfo.flight.arrivalTime}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            Duration:
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            {formatDuration(flightInfo.flight.duration)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ borderColor: 'var(--mint)', mb: 3 }} />

                {/* Fellow Passengers */}
                <Accordion elevation={2} sx={{
                  bgcolor: 'rgba(69, 183, 123, 0.1)',
                  border: '1px solid var(--mint)',
                  borderRadius: 2,
                  '&:before': { display: 'none' }
                }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'var(--mint)' }} />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      },
                      minHeight: 64
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'var(--mint)', fontWeight: 'bold' }}>
                      Fellow Passengers
                    </Typography>
                    <Chip
                      label={`${flightInfo.passengers.length} travelers`}
                      sx={{
                        bgcolor: 'var(--mint)',
                        color: 'var(--black)',
                        fontWeight: 'bold',
                        mr: 2
                      }}
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Grid container spacing={3}>
                      {flightInfo.passengers.map(({ passenger, user }) => (
                        <Grid item xs={12} sm={6} md={4} key={passenger.passengerId}>
                          <Card elevation={passenger.userId === currentUser.userId ? 4 : 2} sx={{
                            bgcolor: passenger.userId === currentUser.userId ?
                              'rgba(132, 218, 93, 0.25)' : 'rgba(69, 183, 123, 0.15)',
                            border: passenger.userId === currentUser.userId ?
                              '2px solid var(--sgbus-green)' : '1px solid var(--mint)',
                            borderRadius: 2,
                            position: 'relative',
                            height: '100%'
                          }}>
                            {passenger.userId === currentUser.userId && (
                              <Chip
                                label="YOU"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 12,
                                  right: 12,
                                  bgcolor: 'var(--sgbus-green)',
                                  color: 'var(--black)',
                                  fontWeight: 'bold',
                                  zIndex: 1
                                }}
                              />
                            )}
                            <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                                <Avatar sx={{
                                  bgcolor: getSpaceTypeColor(passenger.spaceType),
                                  color: 'var(--black)',
                                  mr: 2,
                                  width: 48,
                                  height: 48,
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold'
                                }}>
                                  {user.name.charAt(0)}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" sx={{
                                    color: 'var(--mint)',
                                    fontWeight: 'bold',
                                    mb: 0.5
                                  }}>
                                    {user.name}
                                  </Typography>
                                  <Chip
                                    label={getSpaceTypeLabel(passenger.spaceType, passenger.weightKg)}
                                    size="small"
                                    sx={{
                                      bgcolor: getSpaceTypeColor(passenger.spaceType),
                                      color: 'var(--black)',
                                      fontSize: '0.75rem',
                                      fontWeight: 'bold'
                                    }}
                                  />
                                </Box>
                              </Box>

                              <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                                {passenger.spaceType === 'offer' && passenger.pricePerKg && (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                                      Price:
                                    </Typography>
                                    <Typography sx={{ color: 'var(--tea-green)' }}>
                                      ₹{passenger.pricePerKg}/kg
                                    </Typography>
                                  </Box>
                                )}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                                    Email:
                                  </Typography>
                                  <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.85rem' }}>
                                    {user.email}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                                    Phone:
                                  </Typography>
                                  <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.85rem' }}>
                                    {user.phone}
                                  </Typography>
                                </Box>
                              </Stack>

                              {passenger.userId !== currentUser.userId && (
                                <Box sx={{ mt: 'auto' }}>
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                      bgcolor: getSpaceTypeColor(passenger.spaceType),
                                      color: 'var(--black)',
                                      fontSize: '0.9rem',
                                      fontWeight: 'bold',
                                      py: 1,
                                      '&:hover': {
                                        bgcolor: passenger.spaceType === 'offer' ? 'var(--mint)' : 'var(--sgbus-green)',
                                        transform: 'translateY(-1px)'
                                      }
                                    }}
                                  >
                                    {passenger.spaceType === 'offer' ? 'Book Space' : 'Offer Space'}
                                  </Button>
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
} 