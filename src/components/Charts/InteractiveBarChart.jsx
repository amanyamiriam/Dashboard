import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const InteractiveBarChart = ({ data, title }) => {
  const theme = useTheme();
  const [activeBar, setActiveBar] = useState(null);

  const barVariants = {
    hover: { scale: 1.1, opacity: 0.9 },
    tap: { scale: 0.95 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <Box
      component={motion.div}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      whileTap={{ cursor: 'grabbing' }}
      role="graphics-document"
      aria-label={title}
      sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill={theme.palette.primary.main}
            shape={(props) => (
              <motion.rect
                {...props}
                variants={barVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActiveBar(props.index)}
                onMouseLeave={() => setActiveBar(null)}
                role="graphics-symbol"
                aria-label={`Value: ${props.value}`}
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InteractiveBarChart;