import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.default',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            fontWeight: 500,
            background: 'linear-gradient(45deg, #2F4F4F 30%, #daa520 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          Loading Dashboard...
        </Typography>
      </Box>
    </motion.div>
  );
};

export default LoadingScreen;