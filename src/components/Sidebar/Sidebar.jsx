import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  backgroundColor: '#2F4F4F',
  color: 'white',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: 0,
  top: 0,
}));

const ProfileSection = styled(Box)({
  padding: '2rem 1.5rem',
  textAlign: 'center',
});

const NavigationItem = styled(ListItem)({
  margin: '0.2rem 1rem',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&.active': {
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
  },
});

const ActiveUsers = styled(Box)({
  marginTop: 'auto',
  padding: '1.5rem',
});

const AvatarGroup = styled(Box)({
  display: 'flex',
  marginTop: '1rem',
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    border: '2px solid #2F4F4F',
    marginLeft: -8,
  },
});

const Sidebar = () => {
  const [activeItem, setActiveItem] = React.useState('Dashboard');

  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Flights', icon: <FlightIcon /> },
    { text: 'Wallet', icon: <AccountBalanceWalletIcon /> },
    { text: 'Reports', icon: <AssessmentIcon /> },
    { text: 'Statistics', icon: <BarChartIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <SidebarContainer>
      <ProfileSection>
        <Avatar
          sx={{ width: 80, height: 80, margin: '0 auto 1rem' }}
          src="/path-to-profile-image.jpg"
        />
        <Typography variant="h6" gutterBottom>
          ALEX JOHNSON
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          alex.johnson@gmail.com
        </Typography>
      </ProfileSection>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

      <List>
        {navigationItems.map((item) => (
          <NavigationItem
            button
            key={item.text}
            className={activeItem === item.text ? 'active' : ''}
            onClick={() => setActiveItem(item.text)}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </NavigationItem>
        ))}
      </List>

      <ActiveUsers>
        <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 2 }}>
          ACTIVE USERS
        </Typography>
        <AvatarGroup>
          {[1, 2, 3, 4, 5].map((user) => (
            <Avatar
              key={user}
              src={`/path-to-user-${user}-image.jpg`}
              sx={{ zIndex: 6 - user }}
            />
          ))}
        </AvatarGroup>
      </ActiveUsers>
    </SidebarContainer>
  );
};

export default Sidebar;