import React from 'react';
import { Box, Skeleton, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const EnhancedSkeletonLoader = ({ variant = 'dashboard', count = 1 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const variants = {
    dashboard: (
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
        <Skeleton variant="rectangular" width={isMobile ? '100%' : 300} height={200} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" width="80%" />
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Box>
      </Box>
    ),
    table: (
      <Box>
        <Skeleton variant="rectangular" height={50} />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="text" height={40} sx={{ my: 1 }} />
        ))}
      </Box>
    ),
    stats: (
      <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 2 }}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={120} />
        ))}
      </Box>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {[...Array(count)].map((_, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          {variants[variant]}
        </Box>
      ))}
    </motion.div>
  );
};

export default EnhancedSkeletonLoader;