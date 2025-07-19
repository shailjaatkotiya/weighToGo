import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

const CTA = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        px: { xs: 2, sm: 3 },
        py: { xs: 6, sm: 8, md: 10 },
        textAlign: 'center',
        bgcolor: 'var(--background)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.1,
          backgroundImage: 'url(https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '800px',
          mx: 'auto',
          zIndex: 1
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: { xs: 2, sm: 3 },
            fontWeight: 'bold',
            fontSize: {
              xs: 'clamp(1.5rem, 6vw, 2.5rem)',
              sm: 'clamp(2rem, 5vw, 3rem)',
              md: 'clamp(2.5rem, 4vw, 3.5rem)'
            },
            color: 'var(--primary)'
          }}
        >
          Ready to Start Sharing?
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 3, sm: 4, md: 5 },
            color: 'var(--text)',
            lineHeight: 1.6,
            fontSize: {
              xs: 'clamp(0.875rem, 3vw, 1rem)',
              sm: 'clamp(1rem, 2.5vw, 1.125rem)',
              md: 'clamp(1.125rem, 2vw, 1.25rem)'
            },
            px: { xs: 1, sm: 0 }
          }}
        >
          Join thousands of travelers who are already saving money and earning
          from their luggage space.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1.5, sm: 2 },
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            px: { xs: 1, sm: 0 }
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
              fontWeight: 600,
              bgcolor: 'var(--primary)',
              color: 'var(--background)',
              border: 'none',
              minHeight: { xs: '48px', sm: '56px' },
              '&:hover': {
                bgcolor: 'var(--primary)',
                opacity: 0.8
              }
            }}
          >
            Download App
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
              fontWeight: 600,
              color: 'var(--primary)',
              borderColor: 'var(--primary)',
              borderWidth: 2,
              minHeight: { xs: '48px', sm: '56px' },
              '&:hover': {
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                borderWidth: 2,
                bgcolor: 'transparent',
                opacity: 0.8
              }
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CTA; 