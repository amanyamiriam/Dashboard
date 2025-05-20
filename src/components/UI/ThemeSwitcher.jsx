import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSwitcher = ({ toggleTheme, isDark }) => {
  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <IconButton onClick={toggleTheme} color="inherit">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </motion.div>
      </IconButton>
    </motion.div>
  );
};

export default ThemeSwitcher;