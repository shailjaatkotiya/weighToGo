import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

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
    fetch('http://localhost:3001/space/offers')
      .then((res) => res.json())
      .then((data) => {
        setOffers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {offers.map((offer) => (
        <Card key={offer.id}>
          <CardContent>
            <Typography variant="h6">{offer.user} can carry {offer.availableKg}kg</Typography>
            <Typography variant="body2">Price per Kg: ₹{offer.pricePerKg}</Typography>
            <Typography variant="body2">Route: {offer.from} → {offer.to}</Typography>
            <Typography variant="body2">Date: {offer.date}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 