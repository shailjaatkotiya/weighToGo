import { useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SpaceManagement from './components/SpaceManagement';
import FlightDashboard from './components/FlightDashboard';
import FlightsList from './components/FlightsList';
import UsersList from './components/UsersList';
import GiveSomeSpace from './components/GiveSomeSpace';
import GetSomeSpace from './components/GetSomeSpace';
import theme from './theme';
import type { AppSection } from './types';

function App() {  
  const [currentSection, setCurrentSection] = useState<AppSection>('home');

  const handleNavigation = (section: AppSection) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <LandingPage onNavigate={handleNavigation} />;
      case 'dashboard':
        return <FlightDashboard />;
      case 'manage-space':
        return <SpaceManagement />;
      case 'find-space':
        return <GetSomeSpace />;
      case 'offer-space':
        return <GiveSomeSpace />;
      case 'flights':
        return <FlightsList />;
      case 'users':
        return <UsersList />;
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'var(--background)', 
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        <Navbar 
          currentSection={currentSection}
          onNavigate={handleNavigation}
        />
        <Box sx={{ 
          pt: { xs: '56px', sm: '64px' } // Responsive padding for fixed navbar
        }}>
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
