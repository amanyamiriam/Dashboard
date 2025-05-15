import React from 'react';
import { Paper, Typography, Grid, Box, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  height: '100%',
  background: '#ffffff',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(47, 79, 79, 0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: value >= 70 ? '#4caf50' : value >= 40 ? '#daa520' : '#f44336',
  },
}));

const FlightBookingStats = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StatsCard>
          <Typography variant="h6" gutterBottom>
            Flight Booking Statistics
          </Typography>
          
          <Grid container spacing={4}>
            {/* Booking Rate */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Booking Rate
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="h4" sx={{ mr: 1 }}>
                    {stats?.bookingRate || 0}%
                  </Typography>
                  {(stats?.bookingRate || 0) > 50 ? (
                    <TrendingUpIcon color="success" />
                  ) : (
                    <TrendingDownIcon color="error" />
                  )}
                </Box>
                <ProgressBar 
                  variant="determinate" 
                  value={stats?.bookingRate || 0} 
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* Seat Occupancy */}
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Seat Occupancy
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="h4" sx={{ mr: 1 }}>
                    {stats?.seatOccupancy || 0}%
                  </Typography>
                  {(stats?.seatOccupancy || 0) > 60 ? (
                    <TrendingUpIcon color="success" />
                  ) : (
                    <TrendingDownIcon color="error" />
                  )}
                </Box>
                <ProgressBar 
                  variant="determinate" 
                  value={stats?.seatOccupancy || 0} 
                  sx={{ mt: 1 }}
                />
              </Box>
            </Grid>

            {/* Monthly Stats */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Monthly Overview
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: '#2F4F4F', color: 'white' }}>
                      <Typography variant="subtitle2">Total Bookings</Typography>
                      <Typography variant="h5">{stats?.totalBookings || 0}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: '#daa520' }}>
                      <Typography variant="subtitle2">Revenue</Typography>
                      <Typography variant="h5">${stats?.revenue || 0}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Popular Routes */}
              <Box>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Popular Routes
                </Typography>
                {(stats?.popularRoutes || []).map((route, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {route.from} → {route.to}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {route.bookings} bookings
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </StatsCard>
      </Grid>
    </Grid>
  );
};

export default FlightBookingStats;