import { Box, Typography } from '@mui/material';

const Hero = () => {
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
            maxWidth: '600px',
            mx: 'auto',
            mb: 5
          }}
        >
          Connect with fellow travelers to share unused luggage space. Earn
          money by offering your extra space or save on shipping by using
          others'.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero; 