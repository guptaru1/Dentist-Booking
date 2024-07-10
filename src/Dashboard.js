import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
    
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="X-Rays" component={Link} to="/dashboard/xrays" />
            <Tab label="View Calendar Booking" component={Link} to="/dashboard/calendar" />
          </Tabs>
        </AppBar>

    </Box>
  );
}

export default Dashboard;