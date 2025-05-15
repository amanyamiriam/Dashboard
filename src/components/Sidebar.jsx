import { CircularProgress, Alert } from '@mui/material';
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Collapse, Fade } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

// Add a pulse animation for the active menu item
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const AnimatedListItem = styled(ListItem)`
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(10px);
  }
  &.active {
    background-color: rgba(218, 165, 32, 0.2);
    animation: ${pulseAnimation} 2s infinite;
  }
`;

const Sidebar = ({ isLoading = false, error = null }) => {
  const [activeItem, setActiveItem] = React.useState('Dashboard');

  if (error) {
    return (
      <Box sx={{ 
        width: 240, 
        backgroundColor: '#2F4F4F',
        color: 'white',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Alert severity="error" sx={{ m: 2, backgroundColor: 'rgba(255,255,255,0.9)' }}>
          Sidebar Error: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Fade in={!isLoading} timeout={800}>
      <Box sx={{ 
        width: 240, 
        backgroundColor: '#2F4F4F',
        color: 'white',
        height: '100vh',
        position: 'fixed'
      }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar sx={{ 
            width: 64, 
            height: 64, 
            margin: 'auto',
            opacity: isLoading ? 0.5 : 1,
            transition: 'opacity 0.3s ease'
          }} />
          <Typography variant="h6">Alex Johnson</Typography>
          <Typography variant="body2">alex.johnson@gmail.com</Typography>
        </Box>
        
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Flights', icon: <FlightIcon /> },
            { text: 'Wallet', icon: <AccountBalanceWalletIcon /> },
            { text: 'Statistics', icon: <BarChartIcon /> },
            { text: 'Settings', icon: <SettingsIcon /> },
          ].map((item) => (
            <AnimatedListItem 
              button 
              key={item.text}
              className={activeItem === item.text ? 'active' : ''}
              onClick={() => setActiveItem(item.text)}
              disabled={isLoading}
            >
              <ListItemIcon sx={{ color: 'white', opacity: isLoading ? 0.5 : 1 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              />
            </AnimatedListItem>
          ))}
        </List>
      </Box>
    </Fade>
  );
};

export default Sidebar;