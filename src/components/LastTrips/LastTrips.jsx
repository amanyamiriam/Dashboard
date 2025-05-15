import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid rgba(224, 224, 224, 0.2)',
  '&.MuiTableCell-head': {
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
}));

const LastTrips = ({ trips }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Last Trips</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Members</StyledTableCell>
              <StyledTableCell>Flight</StyledTableCell>
              <StyledTableCell>Total Members</StyledTableCell>
              <StyledTableCell align="right">Ticket Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips?.map((trip) => (
              <TableRow key={trip.id}>
                <StyledTableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar src={trip.userAvatar} />
                    <div>
                      <Typography variant="subtitle2">{trip.user}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {trip.email}
                      </Typography>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>{trip.destination}</StyledTableCell>
                <StyledTableCell>{trip.totalMembers}</StyledTableCell>
                <StyledTableCell align="right">{trip.price}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LastTrips;