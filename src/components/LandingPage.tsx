import { useState } from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import Features from './Features';
import Footer from './Footer';

export default function LandingPage() {
  const [selectedTab, setSelectedTab] = useState<'share' | 'find'>('share');

  return (
    <Box className="min-h-screen text-white bg-black">
      {/* Hero Section */}
      <Box 
        component="section" 
        sx={{
          // position: 'relative',
          px: 3,
          py: 10,
          textAlign: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.1,
            backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '1200px',
            mx: 'auto',
            zIndex: 1
          }}
        >
          <Typography
            variant="h1"
            sx={{
              pb: 2.5,
              mb: 3,
              fontWeight: 'bold',
              fontSize: {
                xs: '2rem',
                sm: '2.5rem',
                md: '3.5rem',
                lg: '4rem'
              },
              '& > div': {
                display: 'block'
              }
            }}
          >
            <Box component="div">Share Luggage Space,</Box>
            <Box component="div" sx={{ mt: 2 }}>Save Money & Travel Light</Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
              lineHeight: 1.7,
              color: 'var(--tea-green)',
              maxWidth: '600px',
              mx: 'auto',
              mb: 5
            }}
          >
            Connect with fellow travelers to share unused luggage space. Earn
            money by offering your extra space or save on shipping by using
            others'.
          </Typography>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Box
        component="section"
        id="how-it-works"
        sx={{
          position: 'relative',
          px: 3,
          py: 10,
          bgcolor: 'var(--black)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.05,
            backgroundImage: 'url(https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '1200px',
            mx: 'auto',
            zIndex: 1
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 5,
              textAlign: 'center',
              color: 'var(--sgbus-green)',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '3rem' }
            }}
          >
            How Weigh2Go Works
          </Typography>

          {/* Image Gallery */}
          <Box
            sx={{
              display: 'flex',
              gap: 2.5,
              justifyContent: 'center',
              mb: 5,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Luggage weight scale at airport"
              sx={{
                width: 150,
                height: 100,
                objectFit: 'cover',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(132,218,93,0.3)'
              }}
            />
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Airplane overhead luggage compartment"
              sx={{
                width: 150,
                height: 100,
                objectFit: 'cover',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(69,183,123,0.3)'
              }}
            />
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Happy travelers with luggage"
              sx={{
                width: 150,
                height: 100,
                objectFit: 'cover',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(227,255,204,0.3)'
              }}
            />
          </Box>

          {/* Tab Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              mb: 5,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}
          >
            <Button
              onClick={() => setSelectedTab('share')}
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                border: 2,
                borderColor: 'var(--sgbus-green)',
                bgcolor: selectedTab === 'share' ? 'var(--sgbus-green)' : 'transparent',
                color: selectedTab === 'share' ? 'var(--black)' : 'var(--sgbus-green)',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'var(--sgbus-green)',
                  color: 'var(--black)'
                }
              }}
            >
              Share Your Space
            </Button>
            <Button
              onClick={() => setSelectedTab('find')}
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                border: 2,
                borderColor: 'var(--sgbus-green)',
                bgcolor: selectedTab === 'find' ? 'var(--sgbus-green)' : 'transparent',
                color: selectedTab === 'find' ? 'var(--black)' : 'var(--sgbus-green)',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'var(--sgbus-green)',
                  color: 'var(--black)'
                }
              }}
            >
              Find Space
            </Button>
          </Box>

          {/* Steps Grid */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {selectedTab === 'share' ? (
              <>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'var(--sgbus-green)',
                      bgcolor: 'rgba(132, 218, 93, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'var(--sgbus-green)',
                        fontSize: '1.5rem',
                        color: 'var(--black)'
                      }}
                    >
                      1
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'var(--sgbus-green)',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      List Your Flight
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)' }}>
                      Add your flight details and available luggage space. Set your price per kilogram.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'var(--mint)',
                      bgcolor: 'rgba(69, 183, 123, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'var(--mint)',
                        fontSize: '1.5rem',
                        color: 'var(--black)'
                      }}
                    >
                      2
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'var(--mint)',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Get Matched
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)' }}>
                      Travelers needing space will find and book your available luggage allowance.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'var(--tea-green)',
                      bgcolor: 'rgba(227, 255, 204, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'var(--tea-green)',
                        fontSize: '1.5rem',
                        color: 'var(--black)'
                      }}
                    >
                      3
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'var(--tea-green)',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Earn Money
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)' }}>
                      Meet at the airport, help with check-in, and earn money for your unused space.
                    </Typography>
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'var(--sgbus-green)',
                      bgcolor: 'rgba(132, 218, 93, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'var(--sgbus-green)',
                        fontSize: '1.5rem',
                        color: 'var(--black)'
                      }}
                    >
                      1
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'var(--sgbus-green)',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Search Flights
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)' }}>
                      Enter your travel details and find available luggage space on your route.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'var(--mint)',
                      bgcolor: 'rgba(69, 183, 123, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'var(--mint)',
                        fontSize: '1.5rem',
                        color: 'var(--black)'
                      }}
                    >
                      2
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'var(--mint)',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Book Space
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)' }}>
                      Choose the best offer and securely book luggage space for your items.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'var(--tea-green)',
                      bgcolor: 'rgba(227, 255, 204, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'var(--tea-green)',
                        fontSize: '1.5rem',
                        color: 'var(--black)'
                      }}
                    >
                      3
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'var(--tea-green)',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Travel Light
                    </Typography>
                    <Typography sx={{ color: 'var(--tea-green)' }}>
                      Meet your space provider at the airport and enjoy traveling with less baggage.
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          px: 3,
          py: 10,
          textAlign: 'center',
          bgcolor: 'var(--black)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.1,
            backgroundImage: 'url(https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '800px',
            mx: 'auto',
            zIndex: 1
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', sm: '3rem' },
              color: 'var(--sgbus-green)'
            }}
          >
            Ready to Start Sharing?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 5,
              color: 'var(--tea-green)',
              lineHeight: 1.6
            }}
          >
            Join thousands of travelers who are already saving money and earning
            from their luggage space.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                bgcolor: 'var(--sgbus-green)',
                color: 'var(--black)',
                border: 'none',
                '&:hover': {
                  bgcolor: 'var(--mint)'
                }
              }}
            >
              Download App
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--mint)',
                borderColor: 'var(--mint)',
                borderWidth: 2,
                '&:hover': {
                  borderColor: 'var(--sgbus-green)',
                  color: 'var(--sgbus-green)',
                  borderWidth: 2,
                  bgcolor: 'transparent'
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
} 