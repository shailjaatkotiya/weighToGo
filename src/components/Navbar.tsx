import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    handleClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        // borderBottom: '1px solid',
        // borderColor: 'var(--sgbus-green)',
        borderBottomOpacity: 0.1,
        backdropFilter: 'blur(10px)',
        bgcolor: 'rgba(1, 1, 1, 0.1)',
        zIndex: 1000
      }}
    >
      <Toolbar
        sx={{
          maxWidth: '1200px',
          width: '100%',
          mx: 'auto',
          px: 3,
          py: 1
        }}
      >
        {/* Logo and Brand */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <img src="/assets/logo.png" alt="Weigh2Go Logo" style={{ width: 40, height: 40 }} />
          <Typography
            variant="h5"
            sx={{
              color: 'var(--sgbus-green)',
              fontWeight: 'bold'
            }}
          >
            Weigh2Go
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 4,
            mx: 'auto',
            '& a': {
              color: 'var(--white)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--sgbus-green)'
              }
            }
          }}
        >
          <Button
            color="inherit"
            onClick={() => scrollToSection('how-it-works')}
            sx={{ fontWeight: 500 }}
          >
            How it Works
          </Button>
          <Button
            color="inherit"
            onClick={() => scrollToSection('features')}
            sx={{ fontWeight: 500 }}
          >
            Features
          </Button>
          <Button
            color="inherit"
            onClick={() => scrollToSection('pricing')}
            sx={{ fontWeight: 500 }}
          >
            Pricing
          </Button>
          <Button
            color="inherit"
            onClick={() => scrollToSection('support')}
            sx={{ fontWeight: 500 }}
          >
            Support
          </Button>
        </Box>

        {/* Auth Buttons and Mobile Menu */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="outlined"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              color: 'var(--mint)',
              borderColor: 'var(--mint)',
              '&:hover': {
                borderColor: 'var(--sgbus-green)',
                color: 'var(--sgbus-green)'
              }
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              bgcolor: 'var(--sgbus-green)',
              color: 'var(--black)',
              '&:hover': {
                bgcolor: 'var(--mint)'
              }
            }}
          >
            Get Started
          </Button>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                bgcolor: 'var(--black)',
                borderTop: '1px solid',
                borderColor: 'var(--sgbus-green)',
                borderTopOpacity: 0.1,
                width: '100%',
                maxWidth: '100%',
                mt: 1
              }
            }}
          >
            <MenuItem onClick={() => scrollToSection('how-it-works')}>
              How it Works
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('features')}>
              Features
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('pricing')}>
              Pricing
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('support')}>
              Support
            </MenuItem>
            <MenuItem>Sign In</MenuItem>
            <MenuItem>Get Started</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 