import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#84DA5D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#45B77B',
      contrastText: '#ffffff',
    },
    background: {
      default: '#010101',
      paper: '#161616',
    },
    text: {
      primary: '#ffffff',
      secondary: '#E3FFCC',
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

export default theme; 