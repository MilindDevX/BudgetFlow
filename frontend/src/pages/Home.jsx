import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            💰 <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">BudgetFlow</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            The Personalized Finance & Forecasting Manager
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Take control of your finances with intelligent tracking and AI-powered forecasting. 
            Make smarter financial decisions with data-driven insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <Link 
              to="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg hover:shadow-xl border-2 border-blue-600 transform hover:-translate-y-1"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Secure Authentication</h3>
              <p className="text-gray-600">
                Bank-level security with JWT authentication and encrypted passwords. Your financial data is completely private and protected.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Smart Forecasting</h3>
              <p className="text-gray-600">
                Simple Moving Average (SMA) analysis predicts your future expenses based on the last 3 months of spending patterns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">💸</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Transaction Management</h3>
              <p className="text-gray-600">
                Easily track all your income and expenses. Create, edit, delete, and categorize transactions with a few clicks.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Advanced Filtering</h3>
              <p className="text-gray-600">
                Filter by income/expense, date ranges, search descriptions, and sort by date or amount. Find exactly what you need instantly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Real-Time Dashboard</h3>
              <p className="text-gray-600">
                Get instant insights with live statistics showing total income, expenses, balance, and recent transaction activity.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Responsive Design</h3>
              <p className="text-gray-600">
                Access your finances from anywhere. Fully responsive design works seamlessly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16 bg-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account in seconds</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600 mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Add Transactions</h3>
              <p className="text-gray-600">Log your income and expenses easily</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-pink-600 mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Get Insights</h3>
              <p className="text-gray-600">View your spending patterns and forecasts</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-green-600 mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Make Better Decisions</h3>
              <p className="text-gray-600">Use data to improve your finances</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Built With Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl mb-2">⚛️</div>
              <h3 className="font-bold text-gray-800">React 18</h3>
              <p className="text-sm text-gray-600">Modern UI Framework</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl mb-2">🟢</div>
              <h3 className="font-bold text-gray-800">Node.js</h3>
              <p className="text-sm text-gray-600">Backend Runtime</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl mb-2">🐘</div>
              <h3 className="font-bold text-gray-800">PostgreSQL</h3>
              <p className="text-sm text-gray-600">Reliable Database</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl mb-2">🎨</div>
              <h3 className="font-bold text-gray-800">TailwindCSS</h3>
              <p className="text-sm text-gray-600">Beautiful Styling</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose BudgetFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-xl">Free to Use</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">🔒</div>
              <p className="text-xl">Bank-Level Security</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">⚡</div>
              <p className="text-xl">Lightning Fast</p>
            </div>
          </div>
        </div>

        {/* Key Features List */}
        <div className="mb-16 bg-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Complete Feature Set
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">Full CRUD Operations</h3>
                <p className="text-gray-600">Create, Read, Update, Delete transactions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">Dynamic Filtering</h3>
                <p className="text-gray-600">Filter by type, date, and search terms</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">Smart Sorting</h3>
                <p className="text-gray-600">Sort by date or amount, ascending/descending</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">Pagination</h3>
                <p className="text-gray-600">Efficient loading with page navigation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">SMA Forecasting</h3>
                <p className="text-gray-600">3-month expense trend analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">Category Support</h3>
                <p className="text-gray-600">Organize transactions by category</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">JWT Authentication</h3>
                <p className="text-gray-600">Secure token-based auth system</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-800">Data Ownership</h3>
                <p className="text-gray-600">Your data is private and protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already managing their money smarter
          </p>
          <Link 
            to="/register"
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-lg inline-block transform hover:scale-105"
          >
            Start Free Today →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            © 2025 BudgetFlow. Built with ❤️ using React, Node.js, and PostgreSQL
          </p>
          <p className="text-sm text-gray-500">
            A capstone project demonstrating full-stack development
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
