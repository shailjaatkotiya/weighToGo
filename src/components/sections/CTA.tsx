import { Box, Typography, Button } from '@mui/material';

const CTA = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        px: 3,
        py: 10,
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
            mb: 3,
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3rem' },
            color: 'var(--primary)'
          }}
        >
          Ready to Start Sharing?
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 5,
            color: 'var(--text)',
            lineHeight: 1.6
          }}
        >
          Join thousands of travelers who are already saving money and earning
          from their luggage space.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center'
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.125rem',
              fontWeight: 600,
              bgcolor: 'var(--primary)',
              color: 'var(--background)',
              border: 'none',
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
              px: 4,
              py: 2,
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--primary)',
              borderColor: 'var(--primary)',
              borderWidth: 2,
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