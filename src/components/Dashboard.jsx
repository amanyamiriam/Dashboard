import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar/Sidebar';
import FlightCards from './FlightCards/FlightCards';
import LastTrips from './LastTrips/LastTrips';
import FlightShare from './Charts/FlightShare';
import FlightSchedule from './Charts/FlightSchedule';
import FlightBookingStats from './Stats/FlightBookingStats';
import AdminPanel from './Admin/AdminPanel';

const Dashboard = ({ dashboardData, isLoading, error }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || isAdmin;
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Sidebar userRole={user?.role} />
      <Box component="main" sx={{ flexGrow: 1, ml: '240px', p: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Admin Panel - Only visible to admins */}
            {isAdmin && (
              <Grid item xs={12}>
                <AdminPanel />
              </Grid>
            )}

            {/* Flight Cards Section - Visible to all authenticated users */}
            <Grid item xs={12}>
              <FlightCards stats={dashboardData?.stats} />
            </Grid>

            {/* Booking Stats Section - Visible to admins and managers */}
            {(isAdmin || isManager) && (
              <Grid item xs={12}>
                <FlightBookingStats stats={dashboardData?.bookingStats} />
              </Grid>
            )}

            {/* Charts and Tables Section - Permission based */}
            {hasPermission('view_trips') && (
              <Grid item xs={12} md={6}>
                <LastTrips 
                  trips={dashboardData?.lastTrips}
                  canEdit={hasPermission('edit_trips')} 
                />
              </Grid>
            )}

            {hasPermission('view_statistics') && (
              <>
                <Grid item xs={12} md={6}>
                  <FlightShare data={dashboardData?.flightShare} />
                </Grid>

                <Grid item xs={12}>
                  <FlightSchedule 
                    data={dashboardData?.schedule}
                    canEdit={hasPermission('edit_schedule')}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;