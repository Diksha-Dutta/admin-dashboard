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
        tension: 0.4,
        fill: true,
        pointBorderColor: '#166534',
        pointBackgroundColor: '#86efac',
      },
      {
        label: 'Revenue',
        data: [50, 70, 60, 90],
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        tension: 0.4,
        fill: true,
        pointBorderColor: '#1e3a8a',
        pointBackgroundColor: '#93c5fd',
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
          font: {
            size: 14,
            weight: 'bold'
          },
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#e5e7eb',
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#374151',
          font: { weight: '500' },
        },
        grid: {
          display: false,
        }
      },
      y: {
        ticks: {
          color: '#374151',
          font: { weight: '500' },
        },
        grid: {
          color: '#e5e7eb',
        }
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📈 Dashboard Overview</h2>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 h-[300px] transition-all hover:shadow-xl">
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">🏆 Top Product</h3>
          <p className="text-gray-600 dark:text-gray-300">Smartwatch Series 5</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">💬 Customer Feedback</h3>
          <p className="text-gray-600 dark:text-gray-300">Positive: <span className="font-bold text-green-500">87%</span></p>
        </div>
      </div>
    </div>
  );
}
