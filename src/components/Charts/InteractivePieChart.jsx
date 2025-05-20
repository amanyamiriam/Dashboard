import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const InteractivePieChart = ({ data, title }) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="figure"
      aria-label={title}
      sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            onMouseEnter={onPieEnter}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={theme.palette.primary[`${(index + 3) * 100}`]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <motion.g>
      <motion.path
        d={`M ${cx},${cy} L ${cx + outerRadius},${cy} A ${outerRadius},${outerRadius} 0 0 1 ${cx},${cy + outerRadius}`}
        fill="none"
        stroke={fill}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={innerRadius}
        fill={fill}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.g>
  );
};

export default InteractivePieChart;