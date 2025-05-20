import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion';

const ResponsiveMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuVariants = {
    hidden: { x: -300 },
    visible: { x: 0 },
    exit: { x: -300 }
  };

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} sx={{ display: { md: 'none' } }}>
        <MenuIcon />
      </IconButton>

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <List sx={{ width: 250 }}>
                {menuItems.map((item, index) => (
                  <ListItem
                    key={index}
                    component={motion.div}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.04)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveMenu;