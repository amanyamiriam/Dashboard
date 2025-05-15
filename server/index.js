const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample flight data
const flightData = {
  stats: {
    boeing787: { price: 548, count: 150 },
    airbus911: { price: 620, count: 200 },
    totalFlights: 850
  },
  lastTrips: [
    { id: 1, user: 'John Doe', destination: 'Qatar', price: '$546' },
    { id: 2, user: 'Martin Loness', destination: 'Emirates', price: '$546' }
  ],
  flightShare: {
    domestic: 35,
    international: 45,
    charter: 20
  },
  schedule: [
    { month: 'Jan', passengers: 2800 },
    { month: 'Feb', passengers: 3200 },
    { month: 'Mar', passengers: 3500 },
    { month: 'Apr', passengers: 3300 },
    { month: 'May', passengers: 3400 },
    { month: 'Jun', passengers: 3600 }
  ]
};

// Routes
app.get('/api/dashboard', (req, res) => {
  res.json(flightData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});