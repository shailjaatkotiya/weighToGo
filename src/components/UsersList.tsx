import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Avatar,
  Divider,
  Button,
  Stack,
  Paper
} from '@mui/material';

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

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

interface UserWithActivity extends User {
  totalFlights: number;
  totalOffers: number;
  totalRequests: number;
  totalOfferedKg: number;
  totalRequestedKg: number;
  flights: {
    flight: Flight;
    passenger: FlightPassenger;
  }[];
}

export default function UsersList() {
  const [users, setUsers] = useState<UserWithActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/space.json');
      const data = await response.json();
      
      const usersWithActivity = data.users.map((user: User) => {
        const userPassengers = data.flightPassengers.filter(
          (p: FlightPassenger) => p.userId === user.userId
        );
        
        const offers = userPassengers.filter((p: FlightPassenger) => p.spaceType === 'offer');
        const requests = userPassengers.filter((p: FlightPassenger) => p.spaceType === 'request');
        
        const userFlights = userPassengers.map((passenger: FlightPassenger) => ({
          flight: data.flights.find((f: Flight) => f.flightId === passenger.flightId),
          passenger
        })).filter((item: { flight: Flight | undefined; passenger: FlightPassenger }) => item.flight);
        
        return {
          ...user,
          totalFlights: userFlights.length,
          totalOffers: offers.length,
          totalRequests: requests.length,
          totalOfferedKg: offers.reduce((sum: number, p: FlightPassenger) => sum + p.weightKg, 0),
          totalRequestedKg: requests.reduce((sum: number, p: FlightPassenger) => sum + p.weightKg, 0),
          flights: userFlights
        };
      });

      setUsers(usersWithActivity);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const getActivityLevel = (totalFlights: number) => {
    if (totalFlights >= 3) return { level: 'High', color: 'var(--sgbus-green)' };
    if (totalFlights >= 1) return { level: 'Active', color: 'var(--mint)' };
    return { level: 'New', color: 'var(--tea-green)' };
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
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
        Community Members
      </Typography>

      <Typography variant="h6" sx={{ 
        color: 'var(--tea-green)',
        mb: 4,
        textAlign: 'center'
      }}>
        Connect with fellow travelers and their luggage space activities
      </Typography>

      {users.length === 0 ? (
        <Paper elevation={2} sx={{ 
          bgcolor: 'rgba(132, 218, 93, 0.1)',
          border: '1px solid var(--sgbus-green)',
          p: 4,
          textAlign: 'center',
          borderRadius: 3
        }}>
          <Typography sx={{ color: 'var(--tea-green)', fontSize: '1.1rem' }}>
            No users found.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => {
            const activity = getActivityLevel(user.totalFlights);
            return (
              <Grid item xs={12} sm={6} md={4} key={user.userId}>
                <Card elevation={3} sx={{ 
                  bgcolor: 'rgba(132, 218, 93, 0.1)',
                  border: '1px solid var(--sgbus-green)',
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
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                    {/* User Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ 
                        bgcolor: activity.color,
                        color: 'var(--black)',
                        width: 64,
                        height: 64,
                        mr: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}>
                        {getUserInitials(user.name)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: 'var(--sgbus-green)', fontWeight: 'bold', mb: 1 }}>
                          {user.name}
                        </Typography>
                        <Chip 
                          label={activity.level}
                          sx={{ 
                            bgcolor: activity.color,
                            color: 'var(--black)',
                            fontWeight: 'bold',
                            fontSize: '0.8rem'
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: 'var(--mint)', 
                        mb: 2, 
                        fontWeight: 'bold',
                        borderBottom: '2px solid var(--mint)',
                        pb: 1
                      }}>
                        Contact Information
                      </Typography>
                      <Stack spacing={1}>
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
                    </Box>

                    <Divider sx={{ borderColor: 'var(--mint)', mb: 3 }} />

                    {/* Activity Statistics */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ 
                        color: 'var(--sgbus-green)', 
                        mb: 2, 
                        fontWeight: 'bold',
                        borderBottom: '2px solid var(--sgbus-green)',
                        pb: 1
                      }}>
                        Activity Summary
                      </Typography>
                      
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Paper elevation={1} sx={{ 
                            textAlign: 'center', 
                            p: 2, 
                            bgcolor: 'rgba(132, 218, 93, 0.2)', 
                            borderRadius: 2,
                            border: '1px solid var(--sgbus-green)'
                          }}>
                            <Typography variant="h5" sx={{ color: 'var(--sgbus-green)', fontWeight: 'bold', mb: 0.5 }}>
                              {user.totalOffers}
                            </Typography>
                            <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                              Space Offers
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper elevation={1} sx={{ 
                            textAlign: 'center', 
                            p: 2, 
                            bgcolor: 'rgba(69, 183, 123, 0.2)', 
                            borderRadius: 2,
                            border: '1px solid var(--mint)'
                          }}>
                            <Typography variant="h5" sx={{ color: 'var(--mint)', fontWeight: 'bold', mb: 0.5 }}>
                              {user.totalRequests}
                            </Typography>
                            <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                              Space Requests
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>

                      <Stack spacing={1.5}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            Total Offered:
                          </Typography>
                          <Chip
                            label={`${user.totalOfferedKg}kg`}
                            size="small"
                            sx={{ 
                              bgcolor: 'var(--sgbus-green)', 
                              color: 'var(--black)',
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            Total Requested:
                          </Typography>
                          <Chip
                            label={`${user.totalRequestedKg}kg`}
                            size="small"
                            sx={{ 
                              bgcolor: 'var(--mint)', 
                              color: 'var(--black)',
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold' }}>
                            Active Flights:
                          </Typography>
                          <Chip 
                            label={user.totalFlights}
                            size="small"
                            sx={{ 
                              bgcolor: 'var(--tea-green)',
                              color: 'var(--black)',
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                      </Stack>
                    </Box>

                    {/* Recent Flights */}
                    {user.flights.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ 
                          color: 'var(--mint)', 
                          mb: 2, 
                          fontWeight: 'bold',
                          borderBottom: '2px solid var(--mint)',
                          pb: 1
                        }}>
                          Recent Flights
                        </Typography>
                        <Stack spacing={1}>
                          {user.flights.slice(0, 2).map(({ flight, passenger }) => (
                            <Paper key={passenger.passengerId} elevation={1} sx={{ 
                              p: 1.5, 
                              bgcolor: 'rgba(69, 183, 123, 0.1)', 
                              borderRadius: 2,
                              border: '1px solid var(--mint)'
                            }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                <Typography sx={{ color: 'var(--tea-green)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                  {flight.flightNumber}
                                </Typography>
                                <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.75rem' }}>
                                  {flight.from} → {flight.to}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ color: 'var(--tea-green)', fontSize: '0.75rem' }}>
                                  {passenger.spaceType === 'offer' ? 'Offering' : 'Requesting'} {passenger.weightKg}kg
                                </Typography>
                                <Chip
                                  label={passenger.spaceType}
                                  size="small"
                                  sx={{ 
                                    bgcolor: passenger.spaceType === 'offer' ? 'var(--sgbus-green)' : 'var(--mint)',
                                    color: 'var(--black)',
                                    fontSize: '0.7rem',
                                    height: 20
                                  }}
                                />
                              </Box>
                            </Paper>
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* Contact Button */}
                    <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          bgcolor: 'var(--mint)',
                          color: 'var(--black)',
                          fontWeight: 'bold',
                          py: 1.5,
                          '&:hover': {
                            bgcolor: 'var(--sgbus-green)',
                            transform: 'scale(1.02)'
                          }
                        }}
                      >
                        Contact User
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
} 