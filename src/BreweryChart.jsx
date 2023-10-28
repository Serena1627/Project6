import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import PropTypes from 'prop-types';

function BreweryChart({ breweriesByState }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const states = breweriesByState.map((stateData) => stateData.state);
    const breweryCounts = breweriesByState.map((stateData) => stateData.count);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: states,
        datasets: [
          {
            label: 'Breweries per State',
            data: breweryCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }, [breweriesByState]);

  return <canvas ref={chartRef} />;
}

BreweryChart.propTypes = {
  breweriesByState: PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.string,
      count: PropTypes.number,
    })
  ).isRequired,
};

export default BreweryChart;
