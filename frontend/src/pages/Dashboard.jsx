import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, Wallet, 
  ArrowRight, Activity, Calendar, Receipt
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const [forecast, setForecast] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
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

      // Calculate stats and prepare chart data
      const allTransactions = await api.getTransactions({ limit: 1000 });
      let income = 0;
      let expense = 0;
      
      // Group by date for chart (simple mock aggregation)
      const dataByDate = {};

      allTransactions.transactions.forEach(t => {
        if (t.type === 'Income') income += t.amount;
        if (t.type === 'Expense') expense += t.amount;

        const date = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (!dataByDate[date]) {
          dataByDate[date] = { date, income: 0, expense: 0 };
        }
        if (t.type === 'Income') dataByDate[date].income += t.amount;
        if (t.type === 'Expense') dataByDate[date].expense += t.amount;
      });

      const formattedChartData = Object.values(dataByDate).slice(-14); // Last 14 days
      setChartData(formattedChartData);
      
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
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Balance',
      amount: stats.balance,
      icon: <Wallet className="h-6 w-6 text-primary-600" />,
      bg: 'bg-primary-50',
      color: stats.balance >= 0 ? 'text-slate-900' : 'text-danger',
    },
    {
      title: 'Total Income',
      amount: stats.totalIncome,
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      bg: 'bg-green-50',
      color: 'text-green-600',
    },
    {
      title: 'Total Expenses',
      amount: stats.totalExpense,
      icon: <TrendingDown className="h-6 w-6 text-red-600" />,
      bg: 'bg-red-50',
      color: 'text-red-600',
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <Link to="/new-entry">
            <Button className="gap-2">
              <DollarSign className="h-4 w-4" /> Add Transaction
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-slate-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                      <h3 className={`text-3xl font-bold ${stat.color}`}>
                        ${Math.abs(stat.amount).toFixed(2)}
                      </h3>
                    </div>
                    <div className={`${stat.bg} p-3 rounded-2xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-slate-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary-500" />
                    Cash Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full mt-4">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value) => [`$${value}`, '']}
                          />
                          <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                          <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-400">
                        No sufficient data for chart
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary-500 opacity-20 blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white/10 p-2 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-primary-300" />
                    </div>
                    <h2 className="text-2xl font-bold">AI Expense Forecast</h2>
                  </div>
                  
                  {forecast ? (
                    <div>
                      <div className="flex items-end gap-3 mb-4">
                        <span className="text-4xl font-bold">${forecast.sma}</span>
                        <span className="text-slate-300 mb-1">/ next month</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-lg">
                        {forecast.forecast}
                      </p>
                      <div className="flex gap-4">
                        <div className="bg-white/10 rounded-xl px-4 py-2 border border-white/10">
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Analysis Period</p>
                          <p className="font-semibold">{forecast.period}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl px-4 py-2 border border-white/10">
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Data Points</p>
                          <p className="font-semibold">{forecast.dataPoints} Months</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400">Add more transactions over multiple months to unlock AI predictions.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-slate-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <Link to="/transactions" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All
                  </Link>
                </CardHeader>
                <CardContent className="pt-4">
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center group">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${transaction.type === 'Income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                              {transaction.type === 'Income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">{transaction.description}</p>
                              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                <Calendar className="h-3 w-3" />
                                {new Date(transaction.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold text-sm ${transaction.type === 'Income' ? 'text-green-600' : 'text-slate-900'}`}>
                              {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </p>
                            <Badge variant={transaction.type === 'Income' ? 'success' : 'default'} className="mt-1 text-[10px] px-1.5 py-0">
                              {transaction.category || transaction.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Receipt className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-slate-500 text-sm">No recent activity.</p>
                      <Link to="/new-entry">
                        <Button variant="ghost" size="sm" className="mt-2 text-primary-600">
                          Add Transaction
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
