import { Box } from '@mui/material';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Features from './Features';
import CTA from './sections/CTA';
import Footer from './Footer';
import type { AppSection } from '../App';

interface LandingPageProps {
  onNavigate?: (section: AppSection) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <Box className="min-h-screen text-tea-green bg-black">
      <Hero onNavigate={onNavigate} />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </Box>
  );
};

export default LandingPage; 