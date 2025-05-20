import React from 'react';
import { Box, Typography, Breadcrumbs, Link, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const PageHeader = ({ title, breadcrumbs }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: { xs: 2, md: 4 } }}>
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          sx={{
            fontWeight: 600,
            mb: 1,
            background: 'linear-gradient(45deg, #2F4F4F 30%, #daa520 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        
        <Breadcrumbs
          sx={{
            '& .MuiBreadcrumbs-separator': {
              mx: 1,
              color: 'text.secondary',
            },
          }}
        >
          {breadcrumbs.map((item, index) => (
            <Link
              key={index}
              color={index === breadcrumbs.length - 1 ? 'text.primary' : 'text.secondary'}
              href={item.href}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item.text}
            </Link>
          ))}
        </Breadcrumbs>
      </Box>
    </motion.div>
  );
};

export default PageHeader;