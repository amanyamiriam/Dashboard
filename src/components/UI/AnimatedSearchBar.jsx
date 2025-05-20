import React, { useState } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedSearchBar = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <motion.div layout>
      <Paper
        component={motion.div}
        animate={{
          width: isExpanded ? 300 : 45,
          height: 45,
        }}
        sx={{ borderRadius: '25px', overflow: 'hidden' }}
      >
        <motion.div style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            <SearchIcon />
          </IconButton>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <InputBase
                  fullWidth
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && onSearch(searchValue)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Paper>
    </motion.div>
  );
};

export default AnimatedSearchBar;