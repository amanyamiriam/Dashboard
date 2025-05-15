import { CircularProgress, Alert } from '@mui/material';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FlightShare = ({ shareData, isLoading, error }) => {
  if (isLoading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="error">Failed to load flight share data</Alert>
      </Paper>
    );
  }

  if (!shareData) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="info">No flight share data available</Alert>
      </Paper>
    );
  }

  const data = {
    labels: ['Domestic', 'International', 'Charter'],
    datasets: [{
      data: [shareData.domestic, shareData.international, shareData.charter],
      backgroundColor: ['#2F4F4F', '#daa520', '#4682B4'],
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Flights Share</Typography>
      <Pie data={data} options={options} />
    </Paper>
  );
};

export default FlightShare;