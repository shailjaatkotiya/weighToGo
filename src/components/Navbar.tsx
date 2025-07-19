import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import type { AppSection } from '../App';

interface NavbarProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

export default function Navbar({ currentSection, onNavigate }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (section: AppSection) => {
    onNavigate(section);
    handleClose();
  };

  const navigationItems = [
    { section: 'home' as AppSection, label: 'Home' },
    { section: 'dashboard' as AppSection, label: 'My Dashboard' },
    { section: 'manage-space' as AppSection, label: 'Manage Space' },
    { section: 'find-space' as AppSection, label: 'Find Space' },
    { section: 'offer-space' as AppSection, label: 'Offer Space' },
    { section: 'flights' as AppSection, label: 'All Flights' },
    { section: 'users' as AppSection, label: 'Community' }
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
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
            gap: 1.5,
            cursor: 'pointer'
          }}
          onClick={() => handleNavigation('home')}
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
            display: { xs: 'none', lg: 'flex' },
            gap: 2,
            mx: 'auto',
          }}
        >
          {navigationItems.map((item) => (
            <Button
              key={item.section}
              color="inherit"
              onClick={() => handleNavigation(item.section)}
              sx={{ 
                fontWeight: 500,
                color: currentSection === item.section ? 'var(--sgbus-green)' : 'var(--tea-green)',
                borderBottom: currentSection === item.section ? '2px solid var(--sgbus-green)' : 'none',
                borderRadius: 0,
                '&:hover': {
                  color: 'var(--sgbus-green)'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Auth Buttons and Mobile Menu */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Desktop Auth Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
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
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ 
              display: { xs: 'flex', lg: 'none' },
              color: 'var(--tea-green)'
            }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                bgcolor: 'var(--black)',
                border: '1px solid var(--sgbus-green)',
                borderRadius: 2,
                mt: 1,
                minWidth: 200
              }
            }}
          >
            {navigationItems.map((item) => (
              <MenuItem 
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                sx={{
                  color: currentSection === item.section ? 'var(--sgbus-green)' : 'var(--tea-green)',
                  bgcolor: currentSection === item.section ? 'rgba(132, 218, 93, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(132, 218, 93, 0.2)',
                    color: 'var(--sgbus-green)'
                  }
                }}
              >
                {item.label}
              </MenuItem>
            ))}
            <MenuItem 
              sx={{ 
                color: 'var(--mint)',
                borderTop: '1px solid var(--mint)',
                mt: 1
              }}
            >
              Sign In
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 