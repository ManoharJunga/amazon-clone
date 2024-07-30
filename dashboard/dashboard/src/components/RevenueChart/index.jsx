import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueChart = ({ filter }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/revenues?filter=${filter}`);

        if (!response.ok) {
          throw new Error('Error fetching chart data');
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Data format error');
        }

        // Map the data correctly to the chart's format
        const labels = data.length > 0 ? data.map(item => new Date(item.period_end).toLocaleDateString()) : ['No Data'];
        const values = data.length > 0 ? data.map(item => item.total_revenue) : [0];

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Revenue',
              data: values,
              borderColor: '#0044ff',
              backgroundColor: 'rgba(0, 68, 255, 0.2)',
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to load chart data');
      }
    };

    fetchChartData();
  }, [filter]);

  if (error) {
    return <div className="alert alert-danger text-center" role="alert">{error}</div>;
  }

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => `Revenue: $${context.parsed.y.toFixed(2)}`,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Amount',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RevenueChart;
