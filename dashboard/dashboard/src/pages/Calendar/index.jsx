import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, MenuItem, Avatar, Grid, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('yearly'); // 'monthly' or 'yearly'

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const generateDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const renderMonth = (month, year) => {
    const days = generateDaysInMonth(month, year);
    const firstDay = days[0].getDay();
    const daysInMonth = [];

    for (let i = 0; i < firstDay; i++) {
      daysInMonth.push(null);
    }

    days.forEach(day => {
      daysInMonth.push(day);
    });

    return (
      <Box>
        <Grid container spacing={1}>
          {daysOfWeek.map((day, index) => (
            <Grid item xs key={index}>
              <Typography variant="body1" align="center" sx={{ fontWeight: 'bold' }}>{day}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          {daysInMonth.map((day, index) => (
            <Grid item xs key={index}>
              <Typography variant="body2" align="center">{day ? day.getDate() : ''}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', color: '#000', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#333' }}>Calendar</Typography>

      <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ marginBottom: 3 }}>
        Create Schedule
      </Button>

      <TextField
        select
        label="View"
        value={view}
        onChange={(e) => setView(e.target.value)}
        variant="outlined"
        sx={{ marginBottom: 3, minWidth: 200 }}
      >
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="yearly">Yearly</MenuItem>
      </TextField>

      <Card sx={{ marginBottom: 3, padding: 2, backgroundColor: '#fff' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Selected Date:</Typography>
          <Typography variant="h4" sx={{ color: '#007FFF' }}>{selectedDate.toDateString()}</Typography>
        </CardContent>
      </Card>

      {view === 'yearly' && (
        <Grid container spacing={3}>
          {months.map((month, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ backgroundColor: '#fff', border: '1px solid #ddd' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{month}</Typography>
                  {renderMonth(index, selectedDate.getFullYear())}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {view === 'monthly' && (
        <Card sx={{ backgroundColor: '#fff', border: '1px solid #ddd' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</Typography>
            {renderMonth(selectedDate.getMonth(), selectedDate.getFullYear())}
          </CardContent>
        </Card>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>People</Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 3, backgroundColor: '#fff', minWidth: 200 }}
        />
        <Box>
          {['Eddie Lobanovskiy', 'Alexey Stave', 'Anton Tkachev'].map((person, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Avatar sx={{ marginRight: 2 }} />
              <Typography variant="body1">{person}</Typography>
            </Box>
          ))}
        </Box>
        <Button variant="outlined" sx={{ color: '#000', borderColor: '#000', marginTop: 2 }}>
          My Schedule
        </Button>
      </Box>
    </Box>
  );
};

export default Calendar;
