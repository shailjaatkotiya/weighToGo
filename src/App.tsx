import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SpaceManagement from './components/SpaceManagement';
import FlightDashboard from './components/FlightDashboard';
import FlightsList from './components/FlightsList';
import UsersList from './components/UsersList';
import GiveSomeSpace from './components/GiveSomeSpace';
import GetSomeSpace from './components/GetSomeSpace';
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
    <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh' }}>
      <Navbar 
        currentSection={currentSection}
        onNavigate={handleNavigation}
      />
      <Box sx={{ pt: '64px' }}> {/* Add padding for fixed navbar */}
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;
