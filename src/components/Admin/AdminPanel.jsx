import React, { useState } from 'react';
import { Paper, Typography, Grid, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import UserManagement from './UserManagement';
import PermissionsManager from './PermissionsManager';
import SystemSettings from './SystemSettings';

const AdminPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('');

  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setDrawerOpen(true);
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 3, bgcolor: '#2F4F4F', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SupervisorAccountIcon sx={{ mr: 2, fontSize: 30 }} />
          <Typography variant="h6">Admin Control Panel</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SecurityIcon />}
              onClick={() => handlePanelOpen('permissions')}
              sx={{ bgcolor: '#daa520', '&:hover': { bgcolor: '#b88700' } }}
            >
              Manage User Permissions
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SettingsIcon />}
              onClick={() => handlePanelOpen('settings')}
              sx={{ bgcolor: '#daa520', '&:hover': { bgcolor: '#b88700' } }}
            >
              System Settings
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SupervisorAccountIcon />}
              onClick={() => handlePanelOpen('users')}
              sx={{ bgcolor: '#daa520', '&:hover': { bgcolor: '#b88700' } }}
            >
              User Management
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<FlightTakeoffIcon />}
              onClick={() => handlePanelOpen('flights')}
              sx={{ bgcolor: '#daa520', '&:hover': { bgcolor: '#b88700' } }}
            >
              Flight Management
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<MonetizationOnIcon />}
              onClick={() => handlePanelOpen('revenue')}
              sx={{ bgcolor: '#daa520', '&:hover': { bgcolor: '#b88700' } }}
            >
              Revenue Analytics
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<NotificationsIcon />}
              onClick={() => handlePanelOpen('notifications')}
              sx={{ bgcolor: '#daa520', '&:hover': { bgcolor: '#b88700' } }}
            >
              System Notifications
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 } } }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {activePanel === 'permissions' && 'User Permissions'}
              {activePanel === 'settings' && 'System Settings'}
              {activePanel === 'users' && 'User Management'}
              {activePanel === 'flights' && 'Flight Management'}
              {activePanel === 'revenue' && 'Revenue Analytics'}
              {activePanel === 'notifications' && 'System Notifications'}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {activePanel === 'permissions' && <PermissionsManager />}
          {activePanel === 'settings' && <SystemSettings />}
          {activePanel === 'users' && <UserManagement />}
          {/* Add other panel components */}
        </Box>
      </Drawer>
    </>
  );
};

export default AdminPanel;