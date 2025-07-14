import { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const StepCard = ({ number, title, description, color }: {
  number: number;
  title: string;
  description: string;
  color: string;
}) => (
  <Box
    sx={{
      p: 4,
      textAlign: 'center',
      borderRadius: 4,
      border: '1px solid',
      borderColor: color,
    //   bgcolor: `${color.replace(')', ', 0.1)')}`,
    }}
  >
    <Box
      sx={{
        width: 60,
        height: 60,
        mx: 'auto',
        mb: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        bgcolor: color,
        fontSize: '1.5rem',
        color: 'var(--black)'
      }}
    >
      {number}
    </Box>
    <Typography
      variant="h3"
      sx={{
        color: color,
        mb: 2,
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}
    >
      {title}
    </Typography>
    <Typography sx={{ color: 'var(--tea-green)' }}>
      {description}
    </Typography>
  </Box>
);

const ImageGallery = () => (
  <Box
    sx={{
      display: 'flex',
      gap: 2.5,
      justifyContent: 'center',
      mb: 5,
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'center'
    }}
  >
    <Box
      component="img"
      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      alt="Luggage weight scale at airport"
      sx={{
        width: 150,
        height: 100,
        objectFit: 'cover',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(132,218,93,0.3)'
      }}
    />
    <Box
      component="img"
      src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      alt="Airplane overhead luggage compartment"
      sx={{
        width: 150,
        height: 100,
        objectFit: 'cover',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(69,183,123,0.3)'
      }}
    />
    <Box
      component="img"
      src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      alt="Happy travelers with luggage"
      sx={{
        width: 150,
        height: 100,
        objectFit: 'cover',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(227,255,204,0.3)'
      }}
    />
  </Box>
);

const HowItWorks = () => {
  const [selectedTab, setSelectedTab] = useState<'share' | 'find'>('share');

  const shareSteps = [
    {
      number: 1,
      title: 'List Your Flight',
      description: 'Add your flight details and available luggage space. Set your price per kilogram.',
      color: 'var(--sgbus-green)'
    },
    {
      number: 2,
      title: 'Get Matched',
      description: 'Travelers needing space will find and book your available luggage allowance.',
      color: 'var(--mint)'
    },
    {
      number: 3,
      title: 'Earn Money',
      description: 'Meet at the airport, help with check-in, and earn money for your unused space.',
      color: 'var(--tea-green)'
    }
  ];

  const findSteps = [
    {
      number: 1,
      title: 'Search Flights',
      description: 'Enter your travel details and find available luggage space on your route.',
      color: 'var(--sgbus-green)'
    },
    {
      number: 2,
      title: 'Book Space',
      description: 'Choose the best offer and securely book luggage space for your items.',
      color: 'var(--mint)'
    },
    {
      number: 3,
      title: 'Travel Light',
      description: 'Meet your space provider at the airport and enjoy traveling with less baggage.',
      color: 'var(--tea-green)'
    }
  ];

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        position: 'relative',
        px: 3,
        py: 10,
        bgcolor: 'var(--black)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.05,
          backgroundImage: 'url(https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '1200px',
          mx: 'auto',
          zIndex: 1
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 5,
            textAlign: 'center',
            color: 'var(--sgbus-green)',
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '3rem' }
          }}
        >
          How Weigh2Go Works
        </Typography>

        <ImageGallery />

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            mb: 5,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center'
          }}
        >
          <Button
            onClick={() => setSelectedTab('share')}
            sx={{
              px: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              border: 2,
              borderColor: 'var(--sgbus-green)',
              bgcolor: selectedTab === 'share' ? 'var(--sgbus-green)' : 'transparent',
              color: selectedTab === 'share' ? 'var(--black)' : 'var(--sgbus-green)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'var(--sgbus-green)',
                color: 'var(--black)'
              }
            }}
          >
            Share Your Space
          </Button>
          <Button
            onClick={() => setSelectedTab('find')}
            sx={{
              px: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              border: 2,
              borderColor: 'var(--sgbus-green)',
              bgcolor: selectedTab === 'find' ? 'var(--sgbus-green)' : 'transparent',
              color: selectedTab === 'find' ? 'var(--black)' : 'var(--sgbus-green)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'var(--sgbus-green)',
                color: 'var(--black)'
              }
            }}
          >
            Find Space
          </Button>
        </Box>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {(selectedTab === 'share' ? shareSteps : findSteps).map((step) => (
            <Grid item xs={12} md={4} key={step.number}>
              <StepCard {...step} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HowItWorks; 