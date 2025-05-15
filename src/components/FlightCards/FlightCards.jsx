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

const FlightCards = ({ stats, onUpdate }) => {
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: '#daa520',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Boeing 787</Typography>
              {canViewPricing ? (
                <Typography variant="h4">${stats?.boeing787?.price || 0}</Typography>
              ) : (
                <Typography variant="body2">Price hidden</Typography>
              )}
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AirplanemodeActiveIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              {(canEdit || canDelete) && (
                <Tooltip title="More options">
                  <IconButton
                    onClick={(e) => handleMenuClick(e, 'boeing787')}
                    sx={{ ml: 1, color: 'white' }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Similar updates for other flight cards */}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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

      <Dialog open={editModal} onClose={() => setEditModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Flight Details</DialogTitle>
        <DialogContent>
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
        <DialogActions>
          <Button onClick={() => setEditModal(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlightCards;