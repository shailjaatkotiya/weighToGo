import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Grid, Button } from '@mui/material';

interface Offer {
  id: number;
  user: string;
  availableKg: number;
  pricePerKg: number;
  flightType: string;
  from: string;
  to: string;
  date: string;
}

export default function GetSomeSpace() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/space.json')
      .then((res) => res.json())
      .then((data) => {
        setOffers(data.offers);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <CircularProgress sx={{ color: 'var(--sgbus-green)' }} />
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ 
        color: 'var(--sgbus-green)',
        mb: 4,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        Available Luggage Space
      </Typography>
      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item xs={12} md={6} key={offer.id}>
            <Card sx={{ 
              bgcolor: 'rgba(132, 218, 93, 0.1)',
              border: '1px solid',
              borderColor: 'var(--sgbus-green)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(132, 218, 93, 0.2)'
              }
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--sgbus-green)', mb: 2 }}>
                  {offer.user} can carry {offer.availableKg}kg
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: 'var(--tea-green)' }}>
                    {offer.from} → {offer.to}
                  </Typography>
                  <Typography sx={{ color: 'var(--mint)' }}>
                    {offer.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'var(--sgbus-green)' }}>
                    ₹{offer.pricePerKg}/kg
                  </Typography>
                  <Button 
                    variant="contained"
                    sx={{ 
                      bgcolor: 'var(--mint)',
                      color: 'var(--black)',
                      '&:hover': {
                        bgcolor: 'var(--sgbus-green)'
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
    </Box>
  );
} 