import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Tabs
        value={activeTab}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.div>
            }
          />
        ))}
      </Tabs>
      <motion.div
        layoutId="activeTab"
        style={{
          position: 'absolute',
          bottom: 0,
          height: 2,
          background: '#daa520',
          width: '100px',
        }}
        animate={{
          x: activeTab * 100,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
      />
    </Box>
  );
};

export default AnimatedTabs;