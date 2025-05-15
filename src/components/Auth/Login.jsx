import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const LoginContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #2F4F4F 0%, #1a2f2f 100%)',
});

const LoginForm = styled(Paper)({
  padding: '2rem',
  width: '100%',
  maxWidth: '400px',
  borderRadius: '12px',
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LoginContainer>
      <LoginForm elevation={3}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <AirplanemodeActiveIcon sx={{ fontSize: 40, color: '#2F4F4F' }} />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Flight Dashboard Login
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#2F4F4F',
              '&:hover': {
                bgcolor: '#1a2f2f',
              },
            }}
          >
            Sign In
          </Button>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;