import { Box, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import type { AppSection } from '../../types';

interface HeroProps {
  onNavigate?: (section: AppSection) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (section: AppSection) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <Box 
      component="section" 
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 6, sm: 8, md: 10 },
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
            pb: { xs: 2, sm: 2.5 },
            mb: { xs: 2, sm: 3 },
            fontWeight: 'bold',
            fontSize: {
              xs: 'clamp(1.5rem, 8vw, 2.5rem)',
              sm: 'clamp(2rem, 6vw, 3rem)',
              md: 'clamp(2.5rem, 5vw, 3.5rem)',
              lg: 'clamp(3rem, 4vw, 4rem)'
            },
            lineHeight: 1.2,
            '& > div': {
              display: 'block'
            }
          }}
        >
          <Box component="div">Share Luggage Space,</Box>
          <Box component="div" sx={{ mt: { xs: 1, sm: 2 } }}>Save Money & Travel Light</Box>
        </Typography>
        
        <Typography
          sx={{
            fontSize: { 
              xs: 'clamp(0.875rem, 3vw, 1rem)', 
              sm: 'clamp(1rem, 2.5vw, 1.125rem)',
              md: 'clamp(1.125rem, 2vw, 1.25rem)'
            },
            lineHeight: 1.7,
            color: 'var(--text)',
            maxWidth: '750px',
            mx: 'auto',
            mb: { xs: 3, sm: 4, md: 5 },
            px: { xs: 1, sm: 0 }
          }}
        >
          Connect with fellow travelers to share unused luggage space. Earn
          money by offering your extra space or save on shipping by using
          others.
        </Typography>

        {/* Quick Navigation Buttons */}
        {onNavigate && (
          <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
            <Typography
              variant="h5"
              sx={{
                color: 'var(--primary)',
                mb: { xs: 3, sm: 4 },
                fontWeight: 'bold',
                fontSize: {
                  xs: 'clamp(1rem, 4vw, 1.25rem)',
                  sm: 'clamp(1.125rem, 3vw, 1.5rem)'
                }
              }}
            >
              Get Started Quickly
            </Typography>
            
            <Grid 
              container 
              spacing={{ xs: 2, sm: 3 }} 
              sx={{ 
                maxWidth: '100vw', 
                mx: 'auto',
                px: { xs: 1, sm: 0 }
              }}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleNavigation('dashboard')}
                  sx={{
                    bgcolor: 'var(--primary)',
                    color: 'var(--background)',
                    py: { xs: 1.5, sm: 2 },
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    minHeight: { xs: '48px', sm: '56px' },
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                      opacity: 0.8
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
                    bgcolor: 'var(--primary)',
                    color: 'var(--background)',
                    py: { xs: 1.5, sm: 2 },
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    minHeight: { xs: '48px', sm: '56px' },
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                      opacity: 0.8
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
                    bgcolor: 'var(--primary)',
                    color: 'var(--background)',
                    py: { xs: 1.5, sm: 2 },
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    minHeight: { xs: '48px', sm: '56px' },
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                      opacity: 0.8
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
                    bgcolor: 'var(--primary)',
                    color: 'var(--background)',
                    py: { xs: 1.5, sm: 2 },
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    minHeight: { xs: '48px', sm: '56px' },
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                      opacity: 0.8
                    }
                  }}
                >
                  Offer Space
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: { xs: 4, sm: 5 } }}>
              <Typography
                sx={{
                  color: 'var(--text)',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  mb: { xs: 2, sm: 3 }
                }}
              >
                Explore Our Community
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                px: { xs: 1, sm: 0 }
              }}>
                <Button
                  variant="text"
                  onClick={() => handleNavigation('flights')}
                  sx={{
                    color: 'var(--text)',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    minHeight: { xs: '44px', sm: '48px' },
                    '&:hover': {
                      color: 'var(--primary)'
                    }
                  }}
                >
                  Browse All Flights
                </Button>
                <Button
                  variant="text"
                  onClick={() => handleNavigation('users')}
                  sx={{
                    color: 'var(--text)',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    minHeight: { xs: '44px', sm: '48px' },
                    '&:hover': {
                      color: 'var(--primary)'
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