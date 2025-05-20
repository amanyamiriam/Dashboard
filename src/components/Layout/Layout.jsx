import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import theme from '../../theme/theme';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, bgcolor: '#f5f5f5' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;