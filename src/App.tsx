import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

function App() {  
  return (
    <Box sx={{ bgcolor: 'var(--black)', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ pt: '64px' }}> {/* Add padding for fixed navbar */}
        <LandingPage />
      </Box>
    </Box>
  );
}

export default App;
