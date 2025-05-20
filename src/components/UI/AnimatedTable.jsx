import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const AnimatedTable = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="table"
      aria-label="Data Table"
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                onClick={() => {
                  setSortConfig({
                    key: column.key,
                    direction: sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
                  });
                }}
                sx={{ cursor: 'pointer' }}
                role="columnheader"
                aria-sort={sortConfig.key === column.key ? sortConfig.direction : 'none'}
              >
                <motion.div
                  style={{ display: 'flex', alignItems: 'center' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {column.label}
                  {sortConfig.key === column.key && (
                    <IconButton size="small">
                      {sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  )}
                </motion.div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {sortedData.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
                role="row"
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AnimatedTable;