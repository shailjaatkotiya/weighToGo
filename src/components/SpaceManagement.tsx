import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, useTheme, useMediaQuery } from '@mui/material';
import SpaceOfferForm from './SpaceOfferForm';
import SpaceRequestForm from './SpaceRequestForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`space-tabpanel-${index}`}
      aria-labelledby={`space-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `space-tab-${index}`,
    'aria-controls': `space-tabpanel-${index}`,
  };
}

export default function SpaceManagement() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'var(--black)', 
      py: { xs: 3, sm: 4, md: 5 }
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        mx: 'auto', 
        px: { xs: 2, sm: 3 }
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: 'var(--sgbus-green)',
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: {
              xs: 'clamp(1.5rem, 6vw, 2rem)',
              sm: 'clamp(2rem, 5vw, 2.5rem)',
              md: 'clamp(2.5rem, 4vw, 3rem)'
            }
          }}
        >
          Luggage Space Management
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: 'var(--tea-green)',
            mb: { xs: 3, sm: 4 },
            textAlign: 'center',
            maxWidth: 600,
            mx: 'auto',
            fontSize: {
              xs: 'clamp(0.875rem, 3vw, 1rem)',
              sm: 'clamp(1rem, 2.5vw, 1.125rem)',
              md: 'clamp(1.125rem, 2vw, 1.25rem)'
            },
            px: { xs: 1, sm: 0 }
          }}
        >
          Share your extra luggage space or find someone to carry your items. 
          Connect with fellow travelers on the same flight.
        </Typography>

        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'var(--mint)', 
          mb: { xs: 3, sm: 4 }
        }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="space management tabs"
            centered
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'var(--sgbus-green)',
                height: 3
              },
              '& .MuiTab-root': {
                color: 'var(--tea-green)',
                fontSize: {
                  xs: 'clamp(0.875rem, 3vw, 1rem)',
                  sm: 'clamp(1rem, 2.5vw, 1.1rem)'
                },
                fontWeight: 'bold',
                minWidth: isMobile ? 'auto' : 200,
                '&.Mui-selected': {
                  color: 'var(--sgbus-green)'
                },
                '&:hover': {
                  color: 'var(--mint)'
                }
              }
            }}
          >
            <Tab 
              label="Offer Space" 
              {...a11yProps(0)}
              sx={{
                '& .MuiTab-wrapper': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }
              }}
            />
            <Tab 
              label="Request Space" 
              {...a11yProps(1)}
              sx={{
                '& .MuiTab-wrapper': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }
              }}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <SpaceOfferForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SpaceRequestForm />
        </TabPanel>
      </Box>
    </Box>
  );
} 