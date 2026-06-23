import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { 
  TrendingUp, Shield, PieChart, Filter, Activity, 
  Smartphone, ArrowRight, CheckCircle2 
} from 'lucide-react';

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary-500" />,
      title: "Secure Authentication",
      description: "Bank-level security with JWT authentication and encrypted passwords. Your financial data is completely private and protected."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary-500" />,
      title: "Smart Forecasting",
      description: "Simple Moving Average (SMA) analysis predicts your future expenses based on the last 3 months of spending patterns."
    },
    {
      icon: <PieChart className="h-8 w-8 text-primary-500" />,
      title: "Transaction Management",
      description: "Easily track all your income and expenses. Create, edit, delete, and categorize transactions with a few clicks."
    },
    {
      icon: <Filter className="h-8 w-8 text-primary-500" />,
      title: "Advanced Filtering",
      description: "Filter by income/expense, date ranges, search descriptions, and sort by date or amount. Find exactly what you need instantly."
    },
    {
      icon: <Activity className="h-8 w-8 text-primary-500" />,
      title: "Real-Time Dashboard",
      description: "Get instant insights with live statistics showing total income, expenses, balance, and recent transaction activity."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary-500" />,
      title: "Responsive Design",
      description: "Access your finances from anywhere. Fully responsive design works seamlessly on desktop, tablet, and mobile devices."
    }
  ];

  const benefits = [
    "Full CRUD Operations", "Dynamic Filtering", "Smart Sorting", 
    "Pagination", "SMA Forecasting", "Category Support", 
    "JWT Authentication", "Data Ownership"
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-200/50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-indigo-200/50 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6 border border-primary-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              v1.0 is now live
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The Personalized <br className="hidden md:block"/>
            <span className="text-gradient">Finance & Forecasting</span> Manager
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take control of your finances with intelligent tracking and AI-powered forecasting. 
            Make smarter financial decisions with data-driven insights.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg gap-2">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Preview Mockup */}
      <motion.div 
        className="container mx-auto px-4 mt-8 mb-24 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="relative rounded-2xl md:rounded-[2rem] border border-slate-200/60 bg-white/40 p-2 md:p-4 backdrop-blur-xl shadow-2xl mx-auto max-w-5xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 top-1/2"></div>
          <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-slate-100 bg-white shadow-sm aspect-video flex items-center justify-center bg-slate-50 relative">
            {/* Fake Dashboard UI */}
            <div className="absolute inset-0 p-8 flex flex-col gap-6 opacity-80">
              <div className="flex justify-between items-center">
                <div className="w-32 h-8 bg-slate-200 rounded-lg"></div>
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="h-32 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
                  <div className="w-20 h-4 bg-slate-100 rounded"></div>
                  <div className="w-32 h-8 bg-primary-100 rounded"></div>
                </div>
                <div className="h-32 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
                  <div className="w-20 h-4 bg-slate-100 rounded"></div>
                  <div className="w-32 h-8 bg-red-100 rounded"></div>
                </div>
                <div className="h-32 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
                  <div className="w-20 h-4 bg-slate-100 rounded"></div>
                  <div className="w-32 h-8 bg-green-100 rounded"></div>
                </div>
              </div>
              <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-sm"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-white py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your personal finances effectively, 
              wrapped in a beautiful and intuitive interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-slate-100">
                  <CardContent className="p-8">
                    <div className="bg-primary-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Feature Set */}
      <div className="py-24 bg-slate-50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                A complete toolkit for your financial health
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                BudgetFlow isn't just a tracker—it's your personal financial assistant. 
                With features designed for both simplicity and depth, you'll always know exactly where your money is going.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-500" />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 transform skew-y-6 rounded-3xl opacity-20 blur-2xl"></div>
                <Card className="relative bg-white/80 backdrop-blur border-white/40 shadow-xl overflow-hidden p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Forecasted Expense</p>
                        <p className="text-3xl font-bold text-slate-900">$2,450.00</p>
                      </div>
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" /> -12%
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <Receipt className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">Grocery Shopping</p>
                              <p className="text-xs text-slate-500">Today, 2:30 PM</p>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900">-$120.50</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary-500 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to take control?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of users who are already managing their money smarter. 
              Start your journey to financial freedom today.
            </p>
            <Link to="/register" className="relative z-10">
              <Button size="lg" className="text-lg px-10 bg-white text-slate-900 hover:bg-slate-100">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wallet className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-slate-900">BudgetFlow</span>
          </div>
          <p className="text-slate-500 mb-2">
            © 2025 BudgetFlow. Built with modern web technologies.
          </p>
          <p className="text-sm text-slate-400">
            A capstone project demonstrating full-stack development
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
