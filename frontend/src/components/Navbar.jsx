import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { Wallet, LayoutDashboard, Receipt, PlusCircle, LogOut, User } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: Receipt },
    { name: 'New Entry', path: '/new-entry', icon: PlusCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b-0 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to={isAuthenticated ? "/dashboard" : "/"} 
          className="flex items-center gap-2 group"
        >
          <div className="bg-primary-100 p-2 rounded-xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            BudgetFlow
          </span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-6">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-primary-50 text-primary-700" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                  <div className="bg-slate-100 p-1.5 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium truncate max-w-[120px]">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-danger hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
