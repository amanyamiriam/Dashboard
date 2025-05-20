import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BubbleChart = ({ data, title }) => {
  const theme = useTheme();
  const [activeBubble, setActiveBubble] = useState(null);

  const bubbleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.2, stroke: theme.palette.secondary.main }
  };

  return (
    <Box
      component={motion.div}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      whileDrag={{ scale: 0.98 }}
      role="graphics-document"
      aria-label={title}
      sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="x" name="Size" />
          <YAxis dataKey="y" name="Value" />
          <ZAxis dataKey="z" range={[100, 1000]} name="Score" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            name="Values"
            data={data}
            fill={theme.palette.primary.main}
            shape={(props) => (
              <motion.circle
                {...props}
                variants={bubbleVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onMouseEnter={() => setActiveBubble(props.index)}
                onMouseLeave={() => setActiveBubble(null)}
                role="graphics-symbol"
                aria-label={`Value: ${props.payload.value}`}
              />
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BubbleChart;