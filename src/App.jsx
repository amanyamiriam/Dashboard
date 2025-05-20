import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import theme from './theme/theme';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/UI/LoadingScreen';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
          <LoadingScreen />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;