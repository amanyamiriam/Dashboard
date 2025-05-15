import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

const FlightSchedule = ({ data }) => {
  const chartData = {
    labels: data?.map(item => item.month) || [],
    datasets: [{
      label: 'Passengers',
      data: data?.map(item => item.passengers) || [],
      fill: true,
      borderColor: '#2F4F4F',
      backgroundColor: 'rgba(47, 79, 79, 0.1)',
      tension: 0.4,
    }],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Flights Schedule</Typography>
      <Line data={chartData} options={options} />
    </Paper>
  );
};

export default FlightSchedule;