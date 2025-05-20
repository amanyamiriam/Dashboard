import React from 'react';
import { Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: 'easeOut',
      }}
      whileHover={{ scale: isMobile ? 1 : 1.02 }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          },
        }}
      >
        {children}
      </Paper>
    </motion.div>
  );
};

export default AnimatedCard;