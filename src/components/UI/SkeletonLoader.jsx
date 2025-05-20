import React from 'react';
import { Skeleton, Box, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getSkeletonByType = () => {
    switch (type) {
      case 'card':
        return (
          <Box sx={{ p: 2, width: '100%' }}>
            <Skeleton variant="rectangular" height={isMobile ? 120 : 180} />
            <Skeleton variant="text" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
        );
      case 'list':
        return (
          <Box sx={{ p: 1 }}>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={40} />
          </Box>
        );
      default:
        return <Skeleton variant="rectangular" height={100} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(count)].map((_, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          {getSkeletonByType()}
        </Box>
      ))}
    </motion.div>
  );
};

export default SkeletonLoader;