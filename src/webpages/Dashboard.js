import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

export default function Dashboard() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81],
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Revenue',
        data: [50, 70, 60, 90],
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        tension: 0.3,
      },
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#374151',
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#374151', 
        }
      },
      y: {
        ticks: {
          color: '#374151', 
        }
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 h-[300px]">
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Top Product</h3>
          <p className="text-gray-700 dark:text-gray-300">Smartwatch Series 5</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Customer Feedback</h3>
          <p className="text-gray-700 dark:text-gray-300">Positive: 87%</p>
        </div>
      </div>
    </div>
  );
}
