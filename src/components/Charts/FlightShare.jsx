import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

const FlightShare = ({ data }) => {
  const chartData = {
    labels: ['Domestic', 'International', 'Charter'],
    datasets: [{
      data: [data?.domestic || 0, data?.international || 0, data?.charter || 0],
      backgroundColor: ['#2F4F4F', '#daa520', '#4682B4'],
      borderWidth: 0,
    }],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Flights Share</Typography>
      <Doughnut data={chartData} options={options} />
    </Paper>
  );
};

export default FlightShare;