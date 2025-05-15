import { CircularProgress, Alert } from '@mui/material';
import React from 'react';
import { Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FlightStats = ({ schedule, isLoading, error }) => {
  if (isLoading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="error">
          Failed to load flight statistics: {error.message}
        </Alert>
      </Paper>
    );
  }

  if (!schedule || schedule.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="info">No flight statistics available</Alert>
      </Paper>
    );
  }

  const data = {
    labels: schedule.map(item => item.month),
    datasets: [
      {
        label: 'Flight Statistics',
        data: schedule.map(item => item.passengers / 1000),
        backgroundColor: '#daa520',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Statistics</Typography>
      <Bar data={data} options={options} />
    </Paper>
  );
};

export default FlightStats;