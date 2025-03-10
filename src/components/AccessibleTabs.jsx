import { Tabs, Tab, Box, Typography, Button, InputBase } from '@mui/material';
import { useState } from 'react';

export default function AccessibleTabs() {
  const [parentTabIndex, setParentTabIndex] = useState(0);
  const [childTabIndex, setChildTabIndex] = useState(0);

  return (
    <Box sx={{ p: 4 }}>
      {/* Parent Navigation Tabs */}
      <Tabs
        value={parentTabIndex}
        onChange={(e, newIndex) => setParentTabIndex(newIndex)}
        aria-label="Dashboard Navigation Tabs"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { backgroundColor: '#2B5DFF' } }}
      >
        <Tab label="Dashboard" id="tab-0" aria-controls="tabpanel-0" sx={{ fontWeight: 'bold' }} />
        <Tab label="Library" id="tab-1" aria-controls="tabpanel-1" sx={{ fontWeight: 'bold' }} />
        <Tab label="Report" id="tab-2" aria-controls="tabpanel-2" sx={{ fontWeight: 'bold' }} />
        <Tab label="Compare" id="tab-3" aria-controls="tabpanel-3" sx={{ fontWeight: 'bold' }} />
        <Tab label="Settings" id="tab-4" aria-controls="tabpanel-4" sx={{ fontWeight: 'bold' }} />
      </Tabs>

      {/* Parent Tab Panels */}
      <TabPanel value={parentTabIndex} index={0}>
        <Typography variant="h5" fontWeight="bold">Document Timeline</Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>Select Filters Above to View Timeline</Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, my: 4 }}>
          <Button variant="outlined" aria-label="Filter by Flow">Flow</Button>
          <Button variant="outlined" aria-label="Filter by Date Range">Date Range</Button>
          <InputBase placeholder="Search..." sx={{ border: '1px solid gray', p: 1, borderRadius: 1, width: '30%' }} inputProps={{ 'aria-label': 'Search Documents' }} />
          <Button variant="contained" sx={{ backgroundColor: '#2B5DFF', color: 'white' }} aria-label="View Results">View Results</Button>
        </Box>

        {/* Nested Tabs (Only Inside Report Section) */}
        <Tabs
          value={childTabIndex}
          onChange={(e, newIndex) => setChildTabIndex(newIndex)}
          aria-label="Nested Report Tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mt: 2 }}
        >
          <Tab label="Monthly Report" />
          <Tab label="Yearly Report" />
        </Tabs>

        {/* Nested Tab Panels */}
        <TabPanel value={childTabIndex} index={0}>
          <Typography variant="h6">Monthly Report Data</Typography>
          <Typography variant="body1">Data for the monthly report...</Typography>
        </TabPanel>

        <TabPanel value={childTabIndex} index={1}>
          <Typography variant="h6">Yearly Report Data</Typography>
          <Typography variant="body1">Data for the yearly report...</Typography>
        </TabPanel>
      </TabPanel>
    </Box>
  );
}

// Reusable TabPanel Component
function TabPanel({ children, value, index }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      tabIndex={value === index ? 0 : -1}
      sx={{ mt: 4, p: 4, border: '1px solid gray', borderRadius: 2, boxShadow: 1 }}
    >
      {value === index && children}
    </Box>
  );
}
