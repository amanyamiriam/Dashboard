import { CircularProgress, Alert } from '@mui/material';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const FlightSchedule = ({ schedule, isLoading, error }) => {
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
        <Alert severity="error">Failed to load schedule data</Alert>
      </Paper>
    );
  }

  if (!schedule?.length) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="info">No schedule data available</Alert>
      </Paper>
    );
  }

  const data = {
    labels: schedule.map(item => item.month),
    datasets: [{
      fill: true,
      label: 'Passengers',
      data: schedule.map(item => item.passengers),
      borderColor: '#2F4F4F',
      backgroundColor: 'rgba(47, 79, 79, 0.1)',
    }],
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
      <Typography variant="h6" gutterBottom>Flights Schedule</Typography>
      <Line data={data} options={options} />
    </Paper>
  );
};

export default FlightSchedule;