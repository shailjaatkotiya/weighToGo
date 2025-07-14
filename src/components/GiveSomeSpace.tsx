import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Grid, Button } from '@mui/material';

interface RequestKg {
  id: number;
  user: string;
  requiredKg: number;
  flightType: string;
  from: string;
  to: string;
  date: string;
}

export default function GiveSomeSpace() {
  const [requests, setRequests] = useState<RequestKg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/space.json')
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.requests);
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
        Space Requests
      </Typography>
      <Grid container spacing={3}>
        {requests.map((request) => (
          <Grid item xs={12} md={6} key={request.id}>
            <Card sx={{ 
              bgcolor: 'rgba(69, 183, 123, 0.1)',
              border: '1px solid',
              borderColor: 'var(--mint)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(69, 183, 123, 0.2)'
              }
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--mint)', mb: 2 }}>
                  {request.user} needs {request.requiredKg}kg
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: 'var(--tea-green)' }}>
                    {request.from} → {request.to}
                  </Typography>
                  <Typography sx={{ color: 'var(--mint)' }}>
                    {request.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                    Offer Space
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