import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './RevenueChart.css';

function RevenueChart() {
  const [revenueData, setRevenueData] = useState([]);
  const [timePeriod, setTimePeriod] = useState('daily'); // Initial state

  useEffect(() => {
    fetchRevenueData(timePeriod); // Fetch data from mock data
  }, [timePeriod]);

  const fetchRevenueData = (period) => {
    let data = [];
    switch(period) {
      case 'daily':
        data = [
          { date: '2024-07-01', revenue: 400 },
          { date: '2024-07-02', revenue: 300 },
          { date: '2024-07-03', revenue: 500 },
          { date: '2024-07-04', revenue: 200 },
          { date: '2024-07-05', revenue: 600 },
          { date: '2024-07-06', revenue: 700 },
          { date: '2024-07-07', revenue: 800 },
        ];
        break;
      case 'weekly':
        data = [
          { date: 'Week 1', revenue: 1500 },
          { date: 'Week 2', revenue: 2000 },
          { date: 'Week 3', revenue: 2500 },
          { date: 'Week 4', revenue: 3000 },
        ];
        break;
      case 'monthly':
        data = [
          { date: 'January', revenue: 5000 },
          { date: 'February', revenue: 6000 },
          { date: 'March', revenue: 7000 },
          { date: 'April', revenue: 8000 },
          { date: 'May', revenue: 9000 },
          { date: 'June', revenue: 10000 },
          { date: 'July', revenue: 11000 },
        ];
        break;
      case 'yearly':
        data = [
          { date: '2020', revenue: 50000 },
          { date: '2021', revenue: 60000 },
          { date: '2022', revenue: 70000 },
          { date: '2023', revenue: 80000 },
          { date: '2024', revenue: 90000 },
        ];
        break;
      default:
        data = [];
    }
    setRevenueData(data);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div className="revenue-chart-container">
      {/* Time Period Selection */}
      <div className="dropdown-container">
        <select value={timePeriod} onChange={handleTimePeriodChange} className="time-period-dropdown">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Chart Rendering */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={revenueData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
