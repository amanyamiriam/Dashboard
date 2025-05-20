import React, { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const GestureSlider = ({ label, min, max, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const x = useMotionValue(0);
  const scale = useTransform(x, [-100, 0, 100], [0.95, 1, 0.95]);

  return (
    <Box
      component={motion.div}
      style={{ scale }}
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
      role="slider"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      sx={{ p: 2 }}
    >
      <Typography gutterBottom>{label}</Typography>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x }}
        onDragEnd={(_, info) => {
          const newValue = value + Math.round(info.offset.x / 10);
          setValue(Math.max(min, Math.min(max, newValue)));
          onChange?.(newValue);
        }}
      >
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={(_, newValue) => {
            setValue(newValue);
            onChange?.(newValue);
          }}
          sx={{
            '& .MuiSlider-thumb': {
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            },
          }}
        />
      </motion.div>
      <Typography variant="body2" align="right">
        {value}
      </Typography>
    </Box>
  );
};

export default GestureSlider;