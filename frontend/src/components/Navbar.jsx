import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-2xl font-bold">
            💰 BudgetFlow
          </Link>
          
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
                <Link to="/transactions" className="hover:text-blue-200 transition">
                  Transactions
                </Link>
                <Link to="/new-entry" className="hover:text-blue-200 transition">
                  New Entry
                </Link>
                
                <div className="flex items-center space-x-4 ml-6 border-l border-blue-500 pl-6">
                  <span className="text-sm">
                    👤 {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-blue-200 transition">
                  Home
                </Link>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
