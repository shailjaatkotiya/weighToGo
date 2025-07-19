import { Box, Typography, Button, Grid } from '@mui/material';
import type { AppSection } from '../../App';

interface HeroProps {
  onNavigate?: (section: AppSection) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const handleNavigation = (section: AppSection) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <Box 
      component="section" 
      sx={{
        px: 3,
        py: 10,
        textAlign: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.1,
          backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80)',
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
          variant="h1"
          sx={{
            pb: 2.5,
            mb: 3,
            fontWeight: 'bold',
            fontSize: {
              xs: '2rem',
              sm: '2.5rem',
              md: '3.5rem',
              lg: '4rem'
            },
            '& > div': {
              display: 'block'
            }
          }}
        >
          <Box component="div">Share Luggage Space,</Box>
          <Box component="div" sx={{ mt: 2 }}>Save Money & Travel Light</Box>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1.125rem', sm: '1.25rem' },
            lineHeight: 1.7,
            color: 'var(--tea-green)',
            maxWidth: '750px',
            mx: 'auto',
            mb: 3
          }}
        >
          Connect with fellow travelers to share unused luggage space. Earn
          money by offering your extra space or save on shipping by using
          others.
        </Typography>

        {/* Quick Navigation Buttons */}
        {onNavigate && (
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              sx={{
                color: 'var(--sgbus-green)',
                mb: 4,
                fontWeight: 'bold'
              }}
            >
              Get Started Quickly
            </Typography>
            
            <Grid container spacing={3} sx={{ maxWidth: 900, mx: 'auto' }}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleNavigation('dashboard')}
                  sx={{
                    bgcolor: 'var(--sgbus-green)',
                    color: 'var(--black)',
                    py: 2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: 'var(--mint)'
                    }
                  }}
                >
                  My Dashboard
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleNavigation('manage-space')}
                  sx={{
                    bgcolor: 'var(--sgbus-green)',
                    color: 'var(--black)',
                    py: 2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: 'var(--mint)'
                    }
                  }}
                >
                  MANAGE SPACE
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleNavigation('find-space')}
                  sx={{
                    bgcolor: 'var(--sgbus-green)',
                    color: 'var(--black)',
                    py: 2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: 'var(--mint)'
                    }
                  }}
                >
                  Find Space
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleNavigation('offer-space')}
                  sx={{
                    bgcolor: 'var(--sgbus-green)',
                    color: 'var(--black)',
                    py: 2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: 'var(--mint)'
                    }
                  }}
                >
                  Offer Space
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  color: 'var(--tea-green)',
                  fontSize: '1rem',
                  mb: 3
                }}
              >
                Explore Our Community
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="text"
                  onClick={() => handleNavigation('flights')}
                  sx={{
                    color: 'var(--tea-green)',
                    fontWeight: 'bold',
                    '&:hover': {
                      color: 'var(--sgbus-green)'
                    }
                  }}
                >
                  Browse All Flights
                </Button>
                <Button
                  variant="text"
                  onClick={() => handleNavigation('users')}
                  sx={{
                    color: 'var(--tea-green)',
                    fontWeight: 'bold',
                    '&:hover': {
                      color: 'var(--mint)'
                    }
                  }}
                >
                  View Community Members
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Hero; 