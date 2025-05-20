import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { 
  Grid, Paper, Typography, Button, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, IconButton, 
  Tooltip, Menu, MenuItem 
} from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const FlightCards = ({ stats, onUpdate }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { checkPermission } = usePermissions();
  const canEdit = checkPermission('canEditFlights');
  const canDelete = checkPermission('canDeleteFlights');
  const canViewPricing = checkPermission('canViewPricing');

  const [editModal, setEditModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEdit = (flight) => {
    setSelectedFlight(flight);
    setEditModal(true);
  };

  const handleSave = async () => {
    try {
      await onUpdate(selectedFlight);
      setEditModal(false);
    } catch (error) {
      console.error('Failed to update flight:', error);
    }
  };

  const handleMenuClick = (event, flight) => {
    setAnchorEl(event.currentTarget);
    setSelectedFlight(flight);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ 
            p: isMobile ? 2 : 3, 
            backgroundColor: '#daa520',
            borderRadius: 2,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? 2 : 0
          }}>
            <Box>
              <Typography variant={isMobile ? "h6" : "subtitle1"} sx={{ mb: 1 }}>
                Boeing 787
              </Typography>
              {canViewPricing ? (
                <Typography variant={isMobile ? "h5" : "h4"}>
                  ${stats?.boeing787?.price || 0}
                </Typography>
              ) : (
                <Typography variant="body2">Price hidden</Typography>
              )}
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              alignSelf: isMobile ? 'flex-end' : 'center',
              mt: isMobile ? 'auto' : 0
            }}>
              <AirplanemodeActiveIcon sx={{ 
                fontSize: isMobile ? 32 : 40, 
                opacity: 0.8 
              }} />
              {(canEdit || canDelete) && (
                <Tooltip title="More options">
                  <IconButton
                    onClick={(e) => handleMenuClick(e, 'boeing787')}
                    sx={{ ml: 1, color: 'white' }}
                    size={isMobile ? "small" : "medium"}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Apply similar changes to other flight cards */}
      </Grid>

      <Dialog 
        open={editModal} 
        onClose={() => setEditModal(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          py: isMobile ? 2 : 3
        }}>
          Edit Flight Details
        </DialogTitle>
        <DialogContent sx={{ 
          px: isMobile ? 2 : 3,
          pb: isMobile ? 2 : 3 
        }}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            margin="normal"
            value={selectedFlight?.price || ''}
            onChange={(e) => setSelectedFlight({
              ...selectedFlight,
              price: e.target.value
            })}
          />
          <TextField
            fullWidth
            label="Capacity"
            type="number"
            margin="normal"
            value={selectedFlight?.capacity || ''}
            onChange={(e) => setSelectedFlight({
              ...selectedFlight,
              capacity: e.target.value
            })}
          />
          <TextField
            fullWidth
            label="Status"
            select
            margin="normal"
            value={selectedFlight?.status || 'active'}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
            <MenuItem value="scheduled">Scheduled</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ 
          p: isMobile ? 2 : 3,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Button 
            onClick={() => setEditModal(false)}
            fullWidth={isMobile}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            fullWidth={isMobile}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '100%' : 320,
            mt: isMobile ? 0 : 1
          }
        }}
      >
        {canEdit && (
          <MenuItem onClick={() => {
            handleEdit(selectedFlight);
            handleMenuClose();
          }}>
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
        )}
        {canDelete && (
          <MenuItem onClick={() => {
            // Handle delete
            handleMenuClose();
          }} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} /> Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default FlightCards;