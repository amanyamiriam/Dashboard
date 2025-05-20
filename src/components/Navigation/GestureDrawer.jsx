import React, { useState } from 'react';
import { Box, Drawer, useTheme } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const GestureDrawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0], [0, 1]);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        component: motion.div,
        style: { x, opacity },
        drag: "x",
        dragConstraints: { left: -100, right: 0 },
        dragElastic: 0.1,
        onDragEnd: (_, info) => {
          if (info.offset.x < -50) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        }
      }}
    >
      <Box
        component={motion.div}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        sx={{ width: 280, p: 2 }}
      >
        {children}
      </Box>
    </Drawer>
  );
};

export default GestureDrawer;