import { Box, Typography, Link, Container, useTheme, useMediaQuery } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 2.5, md: 3 },
        borderTop: '1px solid',
        borderColor: 'var(--primary)',
        borderTopOpacity: 0.2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            mb: { xs: 1.5, sm: 2 }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: 1,
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: 'var(--black)'
            }}
          >
            <img 
              src="../assets/logo.png" 
              alt="Weigh2Go" 
              height={isMobile ? 28 : 32} 
              width={isMobile ? 28 : 32}
            />
          </Box>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              color: 'var(--primary)',
              fontWeight: 'bold'
            }}
          >
            Weigh2Go
          </Typography>
        </Box>

        <Typography
          sx={{
            mb: { xs: 1.5, sm: 2 },
            color: 'var(--text)',
            fontSize: {
              xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
              sm: 'clamp(0.875rem, 2vw, 1rem)'
            }
          }}
        >
          Fly Light, Save Tight, Earn Right.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, sm: 3, md: 4 },
            justifyContent: 'center',
            mb: { xs: 1.5, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            '& > a': {
              color: 'var(--tea-green)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              fontSize: {
                xs: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                sm: 'clamp(0.875rem, 2vw, 1rem)'
              },
              minHeight: { xs: '44px', sm: 'auto' },
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: 'var(--sgbus-green)'
              }
            }
          }}
        >
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#contact">Contact Us</Link>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: 'var(--tea-green)',
            opacity: 0.6,
            fontSize: {
              xs: 'clamp(0.625rem, 2vw, 0.75rem)',
              sm: 'clamp(0.75rem, 1.5vw, 0.875rem)'
            }
          }}
        >
          © {new Date().getFullYear()} Weigh2Go. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 