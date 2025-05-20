import React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBadge = ({ count }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <IconButton color="inherit">
        <Badge
          badgeContent={
            <AnimatePresence>
              <motion.div
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {count}
              </motion.div>
            </AnimatePresence>
          }
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </motion.div>
  );
};

export default NotificationBadge;