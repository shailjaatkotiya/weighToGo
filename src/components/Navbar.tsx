import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  IconButton, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import type { AppSection } from '../types';

interface NavbarProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

export default function Navbar({ currentSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (section: AppSection) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  const navigationItems = [
    { section: 'dashboard' as AppSection, label: 'My Dashboard' },
    { section: 'manage-space' as AppSection, label: 'Manage Space' },
    { section: 'find-space' as AppSection, label: 'Find Space' },
    { section: 'offer-space' as AppSection, label: 'Offer Space' },
    { section: 'flights' as AppSection, label: 'All Flights' },
    { section: 'users' as AppSection, label: 'Community' }
  ];

  const drawer = (
    <Box sx={{ width: 280, bgcolor: 'var(--background)', height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid var(--primary)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img src="/assets/logo.png" alt="Weigh2Go Logo" style={{ width: 32, height: 32 }} />
          <Typography
            variant="h6"
            sx={{
              color: 'var(--primary)',
              fontWeight: 'bold'
            }}
          >
            Weigh2Go
          </Typography>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: 'var(--text)' }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>×</Typography>
        </IconButton>
      </Box>
      
      <List sx={{ pt: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.section} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.section)}
              sx={{
                color: currentSection === item.section ? 'var(--primary)' : 'var(--text)',
                bgcolor: currentSection === item.section ? 'rgba(0, 212, 170, 0.1)' : 'transparent',
                borderLeft: currentSection === item.section ? '3px solid var(--primary)' : '3px solid transparent',
                '&:hover': {
                  bgcolor: 'rgba(0, 212, 170, 0.2)',
                  color: 'var(--primary)'
                }
              }}
            >
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: currentSection === item.section ? 'bold' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2, borderColor: 'var(--primary)' }} />
      
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            color: 'var(--primary)',
            borderColor: 'var(--primary)',
            '&:hover': {
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              opacity: 0.8
            }
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
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
            px: { xs: 2, sm: 3 },
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
            <img 
              src="/assets/logo.png" 
              alt="Weigh2Go Logo" 
              style={{ 
                width: isMobile ? 32 : 40, 
                height: isMobile ? 32 : 40 
              }} 
            />
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                color: 'var(--primary)',
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
                  color: currentSection === item.section ? 'var(--primary)' : 'var(--text)',
                  borderBottom: currentSection === item.section ? '2px solid var(--primary)' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    color: 'var(--primary)'
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
                  color: 'var(--primary)',
                  borderColor: 'var(--primary)',
                  '&:hover': {
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    opacity: 0.8
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
                position: 'absolute',
                right: '1vw',
                color: 'var(--text)'
              }}
              onClick={handleDrawerToggle}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            bgcolor: 'var(--background)',
            borderRight: '1px solid var(--primary)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
} 