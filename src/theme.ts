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
  },
});

export default theme; 