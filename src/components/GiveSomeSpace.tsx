import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

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
    fetch('http://localhost:3001/space/requests')
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {requests.map((req) => (
        <Card key={req.id}>
          <CardContent>
            <Typography variant="h6">{req.user} needs {req.requiredKg}kg</Typography>
            <Typography variant="body2">Flight: {req.from} → {req.to}</Typography>
            <Typography variant="body2">Date: {req.date}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 