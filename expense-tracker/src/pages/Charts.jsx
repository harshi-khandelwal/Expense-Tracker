import React from 'react';
import { useSelector } from 'react-redux';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';


const COLORS = ['#087CA7', '#824C71', '#4A2545', '#065A82', '#87B6A7', '#6B4E71'];

const getMonthName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('default', { month: 'short' });
};
const Charts = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const pieData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const item = acc.find(i => i.name === t.category);
      item ? item.value += t.amount : acc.push({ name: t.category, value: t.amount });
      return acc;
    }, []);

  
  const monthMap = {};
  transactions.forEach(t => {
    if (t.type === 'expense') {
      const month = getMonthName(t.date);
      monthMap[month] = (monthMap[month] || 0) + t.amount;
    }
  })
  const barData = Object.entries(monthMap).map(([month, value]) => ({ month, value }));

  return (
  <div className="w-full h-full bg-gray-100 dark:bg-gray-900 p-6">
  <h1 className="text-4xl font-bold text-center text-blue-950 dark:text-blue-300 mb-4">Analytics</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* pie chart*/}
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-3xl mb-2 text-gray-900 dark:text-white font-bold text-center">
        Expenses by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
            formatter={(value, name) => {
              const total = pieData.reduce((sum, entry) => sum + entry.value, 0);
              const percent = ((value / total) * 100).toFixed(1);
              return [`Rs. ${value} (${percent}%)`, name];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* monthly bar chart */}
    <div className="bg-blue-100 dark:bg-blue-950 p-4 rounded shadow">
      <h2 className="text-3xl mb-2 text-gray-900 dark:text-white font-bold text-center">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
          />
          <Bar dataKey="value" fill="#2F4858" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>


  );
};

export default Charts;
