import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        px: 3,
        py: 5,
        borderTop: '1px solid',
        borderColor: 'var(--sgbus-green)',
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
            mb: 3
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 32,
              height: 32,
              borderRadius: 1,
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: 'var(--black)'
            }}
          >
            <img src="../assets/logo.png" alt="Weigh2Go" height={32} width={32}/>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: 'var(--sgbus-green)',
              fontWeight: 'bold'
            }}
          >
            Weigh2Go
          </Typography>
        </Box>

        <Typography
          sx={{
            mb: 3,
            color: 'var(--tea-green)'
          }}
        >
          Fly Light, Save Tight, Earn Right.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            '& > a': {
              color: 'var(--tea-green)',
              textDecoration: 'none',
              transition: 'color 0.2s',
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
            opacity: 0.6
          }}
        >
          © {new Date().getFullYear()} Weigh2Go. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 