import { Box, Typography, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  borderColor: string;
}

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  background: 'rgba(1, 1, 1, 0.8)',
  border: '1px solid',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
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
    <Typography 
      variant="h2" 
      sx={{ 
        mb: { xs: 1.5, sm: 2, md: 2.5 }, 
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
      }}
    >
      {emoji}
    </Typography>
    <Typography 
      variant="h5" 
      sx={{ 
        mb: { xs: 1, sm: 1.5, md: 2 }, 
        color: borderColor,
        fontWeight: 'bold',
        fontSize: {
          xs: 'clamp(1rem, 4vw, 1.25rem)',
          sm: 'clamp(1.125rem, 3vw, 1.5rem)',
          md: 'clamp(1.25rem, 2.5vw, 1.75rem)'
        }
      }}
    >
      {title}
    </Typography>
    <Typography 
      sx={{ 
        color: 'var(--tea-green)',
        fontSize: {
          xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
          sm: 'clamp(0.875rem, 2vw, 1rem)',
          md: 'clamp(1rem, 1.5vw, 1.125rem)'
        },
        lineHeight: 1.6
      }}
    >
      {description}
    </Typography>
  </FeatureCard>
);

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        px: { xs: 2, sm: 3 },
        py: { xs: 6, sm: 8, md: 10 },
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
            mb: { xs: 4, sm: 6, md: 8 },
            textAlign: 'center',
            color: 'var(--sgbus-green)',
            fontWeight: 'bold',
            fontSize: {
              xs: 'clamp(1.5rem, 6vw, 2.5rem)',
              sm: 'clamp(2rem, 5vw, 3rem)',
              md: 'clamp(2.5rem, 4vw, 3.5rem)'
            }
          }}
        >
          Why Choose Weigh2Go?
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
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