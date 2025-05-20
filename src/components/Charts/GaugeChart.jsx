import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, useTheme, Tooltip, IconButton, Menu, MenuItem, Slider } from '@mui/material';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import SpeedIcon from '@mui/icons-material/Speed';
import TimelineIcon from '@mui/icons-material/Timeline';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PieChartIcon from '@mui/icons-material/PieChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useSpring } from 'framer-motion';

const GaugeChart = ({ value, min = 0, max = 100, title, segments = 5, onValueChange }) => {
  const theme = useTheme();
  const [displayMode, setDisplayMode] = useState('gauge'); // 'gauge', 'linear', 'circular'
  const [anchorEl, setAnchorEl] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const progress = useMotionValue(0);
  const rotate = useTransform(progress, [0, 100], [0, 180]);
  const [chartMode, setChartMode] = useState('gauge'); // 'gauge', 'speedometer', 'donut', 'pie'
  const [showThresholds, setShowThresholds] = useState(false);

  const renderChartContent = () => {
    switch (chartMode) {
      case 'speedometer':
        return (
          <motion.svg viewBox="0 0 100 60">
            <motion.path
              d="M 10 50 A 40 40 0 1 1 90 50"
              stroke={theme.palette.grey[200]}
              strokeWidth="4"
              fill="none"
            />
            <motion.path
              d="M 50 50 L 50 20"
              stroke={color}
              strokeWidth="2"
              style={{
                transformOrigin: '50px 50px',
                rotate: useTransform(progress, [0, 100], [-90, 90])
              }}
            />
            {[0, 25, 50, 75, 100].map((tick) => (
              <motion.text
                key={tick}
                x={50 + 35 * Math.cos((tick / 100) * Math.PI - Math.PI)}
                y={50 + 35 * Math.sin((tick / 100) * Math.PI - Math.PI)}
                fontSize="4"
                textAnchor="middle"
              >
                {tick}
              </motion.text>
            ))}
          </motion.svg>
        );

      case 'donut':
        return (
          <motion.svg viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={theme.palette.grey[200]}
              strokeWidth="12"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeDasharray={251.2}
              style={{
                strokeDashoffset: useTransform(progress, [0, 100], [251.2, 0]),
                rotate: -90,
                transformOrigin: 'center'
              }}
            />
            <motion.text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill={theme.palette.text.primary}
            >
              {value}%
            </motion.text>
          </motion.svg>
        );

      case 'pie':
        return (
          <motion.svg viewBox="0 0 100 100">
            <motion.path
              d={`M 50 50 L 50 10 A 40 40 0 ${value > 50 ? 1 : 0} 1 ${
                50 + 40 * Math.cos((value / 100) * 2 * Math.PI - Math.PI / 2)
              } ${50 + 40 * Math.sin((value / 100) * 2 * Math.PI - Math.PI / 2)} Z`}
              fill={color}
            />
          </motion.svg>
        );

      default:
        return (
          <motion.svg
            viewBox="0 0 100 50"
            style={{ width: '200px', height: '100px' }}
          >
            {renderSegments()}
            <motion.path
              d="M 10 45 A 40 40 0 0 1 90 45"
              stroke={theme.palette.grey[200]}
              strokeWidth="8"
              fill="none"
            />
            <motion.path
              d="M 10 45 A 40 40 0 0 1 90 45"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray="125.6"
              style={{
                strokeDashoffset: useTransform(progress, (p) => 125.6 * (1 - p / 100)),
                transformOrigin: '50px 45px',
                rotate
              }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <motion.circle
                    cx="50"
                    cy="45"
                    r="15"
                    fill={color}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <motion.text
                    x="50"
                    y="45"
                    textAnchor="middle"
                    fill="white"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  >
                    {value}%
                  </motion.text>
                </motion.g>
              )}
            </AnimatePresence>
          </motion.svg>
        );
    }
  };

  return (
    <Box
      component={motion.div}
      variants={gaugeVariants}
      initial="normal"
      animate={isFullscreen ? "fullscreen" : "normal"}
      whileHover="hover"
      whileTap="tap"
      drag={!isFullscreen}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onKeyDown={handleKeyboardControl}
      tabIndex={0}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={`${title}: ${value}%`}
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: isHovered ? 4 : 1,
        position: 'relative',
        '&:focus': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px'
        }
      }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <motion.svg
        viewBox="0 0 100 50"
        style={{ width: '200px', height: '100px' }}
      >
        {renderSegments()}
        <motion.path
          d="M 10 45 A 40 40 0 0 1 90 45"
          stroke={theme.palette.grey[200]}
          strokeWidth="8"
          fill="none"
        />
        <motion.path
          d="M 10 45 A 40 40 0 0 1 90 45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray="125.6"
          style={{
            strokeDashoffset: useTransform(progress, (p) => 125.6 * (1 - p / 100)),
            transformOrigin: '50px 45px',
            rotate
          }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <motion.circle
                cx="50"
                cy="45"
                r="15"
                fill={color}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.text
                x="50"
                y="45"
                textAnchor="middle"
                fill="white"
                style={{ fontSize: '12px', fontWeight: 'bold' }}
              >
                {value}%
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>
      </motion.svg>
      <Tooltip title={`Current value: ${value}%`}>
        <Typography 
          variant="body2" 
          sx={{ mt: 2 }}
          role="status"
          aria-live="polite"
        >
          {value < 50 ? 'Low' : value < 75 ? 'Medium' : 'High'}
        </Typography>
      </Tooltip>
      <Box sx={{ 
        position: 'absolute', 
        top: 8, 
        right: 8, 
        display: 'flex', 
        gap: 1 
      }}>
        <IconButton
          size="small"
          onClick={() => onValueChange?.(min)}
          aria-label="Reset value"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <RefreshIcon />
          </motion.div>
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setIsFullscreen(!isFullscreen)}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <motion.div animate={{ rotate: isFullscreen ? 180 : 0 }}>
            <FullscreenIcon />
          </motion.div>
        </IconButton>
      </Box>

      <motion.div
        animate={{
          y: isDragging ? -10 : 0,
          transition: { type: "spring" }
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ mt: 2 }}
          role="status"
          aria-live="polite"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={value}
          >
            {value < 50 ? 'Low' : value < 75 ? 'Medium' : 'High'}
          </motion.span>
        </Typography>
      </motion.div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => setChartMode('gauge')}
            color={chartMode === 'gauge' ? 'primary' : 'default'}
            aria-label="Gauge view"
          >
            <SpeedIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setChartMode('speedometer')}
            color={chartMode === 'speedometer' ? 'primary' : 'default'}
            aria-label="Speedometer view"
          >
            <TimelineIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setChartMode('donut')}
            color={chartMode === 'donut' ? 'primary' : 'default'}
            aria-label="Donut view"
          >
            <DonutLargeIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setChartMode('pie')}
            color={chartMode === 'pie' ? 'primary' : 'default'}
            aria-label="Pie view"
          >
            <PieChartIcon />
          </IconButton>
        </Box>
      </Box>

      <motion.div
        layout
        transition={{
          layout: { duration: 0.6, type: 'spring' },
          opacity: { duration: 0.3 }
        }}
      >
        {renderChartContent()}
      </motion.div>

      <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <IconButton
          size="small"
          onClick={() => setChartMode('wave')}
          color={chartMode === 'wave' ? 'primary' : 'default'}
          aria-label="Wave view"
        >
          <ShowChartIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setChartMode('bar')}
          color={chartMode === 'bar' ? 'primary' : 'default'}
          aria-label="Bar view"
        >
          <BubbleChartIcon />
        </IconButton>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <Typography variant="caption">Show Labels</Typography>
          <Switch
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            inputProps={{ 'aria-label': 'Toggle labels' }}
          />
        </MenuItem>
        <MenuItem>
          <Typography variant="caption">Theme Color</Typography>
          <Select
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            size="small"
            sx={{ ml: 1 }}
          >
            <MenuItem value="primary">Primary</MenuItem>
            <MenuItem value="secondary">Secondary</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="error">Error</MenuItem>
          </Select>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default GaugeChart;