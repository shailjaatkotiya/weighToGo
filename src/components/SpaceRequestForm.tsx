import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Divider
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

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

interface SpaceRequestFormData {
  pnr: string;
  name: string;
  email: string;
  phone: string;
  flightId: string;
  weightKg: number;
  itemDescription: string;
}

export default function SpaceRequestForm() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  
  const [formData, setFormData] = useState<SpaceRequestFormData>({
    pnr: '',
    name: '',
    email: '',
    phone: '',
    flightId: '',
    weightKg: 0,
    itemDescription: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/space.json');
      const data = await response.json();
      setFlights(data.flights);
      setUsers(data.users);
      
      // Pre-fill with current user data if available
      if (data.currentUser) {
        const currentUser = data.users.find((user: User) => user.userId === data.currentUser.userId);
        if (currentUser) {
          setFormData(prev => ({
            ...prev,
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone
          }));
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weightKg' ? Number(value) : value
    }));

    if (name === 'flightId') {
      const flight = flights.find(f => f.flightId === value);
      setSelectedFlight(flight || null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Space request submitted successfully!');
      setFormData({
        pnr: '',
        name: formData.name, // Keep user details
        email: formData.email,
        phone: formData.phone,
        flightId: '',
        weightKg: 0,
        itemDescription: ''
      });
      setSelectedFlight(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setSubmitting(false);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress sx={{ color: 'var(--mint)' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ 
        color: 'var(--mint)',
        mb: 4,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        Request Luggage Space
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Card sx={{ 
        bgcolor: 'rgba(69, 183, 123, 0.1)',
        border: '1px solid',
        borderColor: 'var(--mint)',
        borderRadius: 2
      }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Personal Details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: 'var(--mint)', mb: 2 }}>
                  Personal Details
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PNR Number"
                  name="pnr"
                  value={formData.pnr}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--mint)' },
                      '&:hover fieldset': { borderColor: 'var(--sgbus-green)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--sgbus-green)' }
                    },
                    '& .MuiInputLabel-root': { color: 'var(--tea-green)' },
                    '& .MuiInputBase-input': { color: 'tea-green' }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--mint)' },
                      '&:hover fieldset': { borderColor: 'var(--sgbus-green)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--sgbus-green)' }
                    },
                    '& .MuiInputLabel-root': { color: 'var(--tea-green)' },
                    '& .MuiInputBase-input': { color: 'tea-green' }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--mint)' },
                      '&:hover fieldset': { borderColor: 'var(--sgbus-green)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--sgbus-green)' }
                    },
                    '& .MuiInputLabel-root': { color: 'var(--tea-green)' },
                    '& .MuiInputBase-input': { color: 'tea-green' }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--mint)' },
                      '&:hover fieldset': { borderColor: 'var(--sgbus-green)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--sgbus-green)' }
                    },
                    '& .MuiInputLabel-root': { color: 'var(--tea-green)' },
                    '& .MuiInputBase-input': { color: 'tea-green' }
                  }}
                />
              </Grid>

              {/* Flight Details */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2, borderColor: 'var(--mint)' }} />
                <Typography variant="h6" sx={{ color: 'var(--mint)', mb: 2 }}>
                  Flight Details
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Select Flight"
                  name="flightId"
                  value={formData.flightId}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--mint)' },
                      '&:hover fieldset': { borderColor: 'var(--sgbus-green)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--sgbus-green)' }
                    },
                    '& .MuiInputLabel-root': { color: 'var(--tea-green)' },
                    '& .MuiInputBase-input': { color: 'tea-green' }
                  }}
                >
                  {flights.map((flight) => (
                    <MenuItem key={flight.flightId} value={flight.flightId}>
                      {flight.flightNumber} - {flight.from} → {flight.to} ({flight.date})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Flight Information Display */}
              {selectedFlight && (
                <Grid item xs={12}>
                  <Card sx={{ 
                    bgcolor: 'rgba(132, 218, 93, 0.1)',
                    border: '1px solid var(--sgbus-green)',
                    mt: 2
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: 'var(--sgbus-green)', mb: 2 }}>
                        Flight Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            <strong>Flight:</strong> {selectedFlight.flightNumber} ({selectedFlight.airline})
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            <strong>Route:</strong> {selectedFlight.from} → {selectedFlight.to}
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            <strong>Type:</strong> {selectedFlight.flightType}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            <strong>Date:</strong> {selectedFlight.date}
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            <strong>Departure:</strong> {selectedFlight.departureTime}
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            <strong>Arrival:</strong> {selectedFlight.arrivalTime}
                          </Typography>
                          <Typography sx={{ color: 'var(--tea-green)' }}>
                            <strong>Duration:</strong> {formatDuration(selectedFlight.duration)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Space Request Details */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2, borderColor: 'var(--mint)' }} />
                <Typography variant="h6" sx={{ color: 'var(--mint)', mb: 2 }}>
                  Space Request Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Required Weight (kg)"
                  name="weightKg"
                  type="number"
                  value={formData.weightKg}
                  onChange={handleInputChange}
                  required
                  inputProps={{ min: 1, max: 50 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--mint)' },
                      '&:hover fieldset': { borderColor: 'var(--sgbus-green)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--sgbus-green)' }
                    },
                    '& .MuiInputLabel-root': { color: 'var(--tea-green)' },
                    '& .MuiInputBase-input': { color: 'tea-green' }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Item Description"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Documents, Electronics, Gifts"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--mint)' },
                      '&:hover fieldset': { borderColor: 'var(--sgbus-green)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--sgbus-green)' }
                    },
                    '& .MuiInputLabel-root': { color: 'var(--tea-green)' },
                    '& .MuiInputBase-input': { color: 'tea-green' }
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    sx={{
                      bgcolor: 'var(--mint)',
                      color: 'var(--black)',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'var(--sgbus-green)'
                      },
                      '&:disabled': {
                        bgcolor: 'rgba(69, 183, 123, 0.3)'
                      }
                    }}
                  >
                    {submitting ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1, color: 'var(--black)' }} />
                        Submitting...
                      </>
                    ) : (
                      'Request Space'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 