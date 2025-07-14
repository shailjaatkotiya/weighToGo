import { Box } from '@mui/material';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Features from './Features';
import CTA from './sections/CTA';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <Box className="min-h-screen text-white bg-black">
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </Box>
  );
};

export default LandingPage; 