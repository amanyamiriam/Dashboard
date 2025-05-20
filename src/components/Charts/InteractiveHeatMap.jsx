import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveHeatMap = ({ data, title }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const cellVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, zIndex: 1 },
    tap: { scale: 0.95 }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="grid"
      aria-label={title}
      sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Grid container spacing={1}>
        <AnimatePresence>
          {data.map((row, i) => (
            row.map((value, j) => (
              <Grid item xs={1} key={`${i}-${j}`}>
                <motion.div
                  variants={cellVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  style={{
                    backgroundColor: `hsl(200, 50%, ${100 - value}%)`,
                    height: '40px',
                    borderRadius: '4px'
                  }}
                  onHoverStart={() => setHoveredCell({ i, j, value })}
                  onHoverEnd={() => setHoveredCell(null)}
                  role="gridcell"
                  aria-label={`Value: ${value}`}
                  tabIndex={0}
                />
              </Grid>
            ))
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );
};

export default InteractiveHeatMap;