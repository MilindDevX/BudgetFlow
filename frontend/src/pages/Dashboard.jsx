import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const [forecast, setForecast] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch SMA forecast
      const forecastData = await api.getSMAForecast();
      setForecast(forecastData);

      // Fetch recent transactions
      const transactionsData = await api.getTransactions({ limit: 5, sortBy: 'date', sortOrder: 'desc' });
      setRecentTransactions(transactionsData.transactions);

      // Calculate stats
      const allTransactions = await api.getTransactions({ limit: 1000 });
      const income = allTransactions.transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = allTransactions.transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      setStats({
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Income</p>
                <p className="text-3xl font-bold text-green-600">
                  ${stats.totalIncome.toFixed(2)}
                </p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">
                  ${stats.totalExpense.toFixed(2)}
                </p>
              </div>
              <div className="text-4xl">📉</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Balance</p>
                <p className={`text-3xl font-bold ${stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  ${stats.balance.toFixed(2)}
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* SMA Forecast */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📊 Expense Forecast (SMA)</h2>
          {forecast ? (
            <div>
              <p className="text-lg mb-2">
                <span className="font-semibold">Average Monthly Expense:</span> ${forecast.sma}
              </p>
              <p className="text-sm opacity-90 mb-2">{forecast.forecast}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white bg-opacity-20 rounded p-3">
                  <p className="text-sm">Period</p>
                  <p className="text-xl font-bold">{forecast.period}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded p-3">
                  <p className="text-sm">Data Points</p>
                  <p className="text-xl font-bold">{forecast.dataPoints}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>No forecast data available. Add more transactions to see predictions.</p>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
            <Link to="/transactions" className="text-blue-600 hover:underline">
              View All →
            </Link>
          </div>

          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.type}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No transactions yet. <Link to="/new-entry" className="text-blue-600 hover:underline">Add your first transaction</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
