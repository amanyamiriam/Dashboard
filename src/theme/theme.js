import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F4F4F',
      light: '#4c7979',
      dark: '#1a2f2f',
    },
    secondary: {
      main: '#daa520',
      light: '#e4b94d',
      dark: '#997316',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;