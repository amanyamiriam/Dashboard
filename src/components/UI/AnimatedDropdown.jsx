import React, { useState } from 'react';
import { Button, Paper, MenuList, MenuItem, Grow, Popper, ClickAwayListener } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AnimatedDropdown = ({ options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <>
      <Button
        endIcon={
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <KeyboardArrowDownIcon />
          </motion.div>
        }
        onClick={handleClick}
      >
        Select Option
      </Button>
      <Popper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList>
                  <AnimatePresence>
                    {options.map((option, index) => (
                      <MenuItem
                        key={index}
                        component={motion.div}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          onSelect(option);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </AnimatePresence>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default AnimatedDropdown;