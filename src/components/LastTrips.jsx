import { CircularProgress, Alert } from '@mui/material';import React from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const LastTrips = ({ trips, isLoading, error }) => {
  if (isLoading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="error">Failed to load trips data</Alert>
      </Paper>
    );
  }

  if (!trips?.length) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="info">No trips available</Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Last Trips</Typography>
      <List>
        {trips.map((trip) => (
          <ListItem key={trip.id}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={trip.user}
              secondary={trip.destination}
            />
            <Typography variant="body2" color="text.secondary">
              {trip.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default LastTrips;