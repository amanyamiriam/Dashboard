import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const FunnelChart = ({ data, title }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="graphics-document"
      aria-label={title}
      sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {data.map((item, index) => {
        const width = 100 - (index * (100 / data.length));
        return (
          <motion.div
            key={item.name}
            variants={itemVariants}
            whileHover="hover"
            style={{
              width: `${width}%`,
              margin: '0 auto',
              height: '60px',
              backgroundColor: item.color,
              borderRadius: '4px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}
            role="graphics-symbol"
            aria-label={`${item.name}: ${item.value}`}
            tabIndex={0}
          >
            <Typography>{`${item.name}: ${item.value}`}</Typography>
          </motion.div>
        );
      })}
    </Box>
  );
};

export default FunnelChart;