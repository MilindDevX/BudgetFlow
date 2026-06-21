const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  // Transaction endpoints
  getTransactions: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/transactions?${queryString}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  createTransaction: async (transactionData) => {
    const response = await fetch(`${API_URL}/api/transactions`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData)
    });
    return handleResponse(response);
  },

  updateTransaction: async (id, transactionData) => {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData)
    });
    return handleResponse(response);
  },

  deleteTransaction: async (id) => {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Reports endpoints
  getSMAForecast: async () => {
    const response = await fetch(`${API_URL}/api/reports/sma-forecast`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Helper functions
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

export default api;
