import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00D4AA',
      contrastText: '#0A0A0A',
    },
    secondary: {
      main: '#00D4AA',
      contrastText: '#0A0A0A',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#E8F5E8',
      secondary: '#E8F5E8',
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      lineHeight: 1.2,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 'clamp(1.75rem, 4vw, 3rem)',
      lineHeight: 1.3,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      lineHeight: 1.4,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      lineHeight: 1.4,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      lineHeight: 1.4,
      fontWeight: 'bold',
    },
    h6: {
      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
      lineHeight: 1.4,
      fontWeight: 'bold',
    },
    body1: {
      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
      lineHeight: 1.6,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          '@media (max-width: 600px)': {
            padding: '6px 12px',
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            padding: '0 8px',
          },
        },
      },
    },
  },
});

export default theme; 