import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  borderColor: string;
}

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: 'center',
  background: 'rgba(1, 1, 1, 0.8)',
  border: '1px solid',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    opacity: 0.1,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}));

const FeatureItem = ({ emoji, title, description, borderColor }: FeatureCardProps) => (
  <FeatureCard sx={{ borderColor: `${borderColor}20` }}>
    <Typography variant="h2" sx={{ mb: 2.5, fontSize: '3rem' }}>
      {emoji}
    </Typography>
    <Typography 
      variant="h5" 
      sx={{ 
        mb: 2, 
        color: borderColor,
        fontWeight: 'bold'
      }}
    >
      {title}
    </Typography>
    <Typography sx={{ color: 'var(--tea-green)' }}>
      {description}
    </Typography>
  </FeatureCard>
);

const Features = () => {
  const features = [
    {
      emoji: '💰',
      title: 'Save Money',
      description: 'Pay less for shipping by using shared luggage space instead of expensive courier services.',
      borderColor: 'var(--sgbus-green)'
    },
    {
      emoji: '🛡️',
      title: 'Secure & Safe',
      description: 'All users are verified, and transactions are protected with our secure payment system.',
      borderColor: 'var(--mint)'
    },
    {
      emoji: '🌍',
      title: 'Global Network',
      description: 'Connect with travelers on routes worldwide. Available on major airlines and airports.',
      borderColor: 'var(--tea-green)'
    },
    {
      emoji: '📱',
      title: 'Easy to Use',
      description: 'Simple app interface makes finding and sharing luggage space effortless.',
      borderColor: 'var(--sgbus-green)'
    },
    {
      emoji: '⚡',
      title: 'Instant Matching',
      description: 'Smart algorithm instantly matches you with the best luggage space options.',
      borderColor: 'var(--mint)'
    },
    {
      emoji: '🤝',
      title: 'Community Driven',
      description: 'Join a community of travelers helping each other make travel more affordable.',
      borderColor: 'var(--tea-green)'
    }
  ];

  return (
    <Box
      component="section"
      id="features"
      sx={{
        position: 'relative',
        px: 3,
        py: 10,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.08,
          backgroundImage: 'url(https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
            mb: 8,
            textAlign: 'center',
            color: 'var(--sgbus-green)',
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3rem' }
          }}
        >
          Why Choose Weigh2Go?
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureItem {...feature} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Features; 