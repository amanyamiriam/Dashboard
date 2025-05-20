import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const AnimatedRadarChart = ({ data, title }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      role="graphics-document"
      aria-label={title}
      sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Stats"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            component={({ points, ...props }) => (
              <motion.path
                {...props}
                d={points}
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                role="graphics-symbol"
              />
            )}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnimatedRadarChart;