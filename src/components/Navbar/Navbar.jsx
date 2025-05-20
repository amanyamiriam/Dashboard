import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100],
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const Navbar = () => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Flight Dashboard
        </Typography>

        <SearchWrapper>
          <IconButton sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
        </SearchWrapper>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar sx={{ width: 40, height: 40 }} src="/path-to-profile-image.jpg" />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;