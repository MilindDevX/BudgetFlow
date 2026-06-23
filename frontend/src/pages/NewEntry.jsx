import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, Tag, Calendar, FileText, CheckCircle2 } from 'lucide-react';

const NewEntry = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    type: 'Expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && location.state?.transaction) {
      const t = location.state.transaction;
      setFormData({
        type: t.type,
        amount: t.amount.toString(),
        description: t.description,
        category: t.category || '',
        date: new Date(t.date).toISOString().split('T')[0]
      });
    }
  }, [isEditMode, location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        await api.updateTransaction(id, formData);
        showToast('Transaction updated successfully! ✓', 'success');
      } else {
        await api.createTransaction(formData);
        showToast('Transaction created successfully! ✓', 'success');
      }
      navigate('/transactions');
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/transactions')}
              className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {isEditMode ? 'Edit Transaction' : 'New Transaction'}
              </h1>
              <p className="text-slate-500 text-sm">
                {isEditMode ? 'Update the details of your transaction' : 'Record a new income or expense'}
              </p>
            </div>
          </div>

          <Card className="border-slate-100 shadow-xl shadow-slate-200/40">
            <CardContent className="p-6 md:p-8">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                  <span className="font-semibold">Error:</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Transaction Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label 
                      className={`
                        relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all
                        ${formData.type === 'Income' 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-500'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="Income"
                        checked={formData.type === 'Income'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-2 rounded-full ${formData.type === 'Income' ? 'bg-green-100' : 'bg-slate-100'}`}>
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">Income</span>
                      </div>
                      {formData.type === 'Income' && (
                        <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-green-500" />
                      )}
                    </label>

                    <label 
                      className={`
                        relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all
                        ${formData.type === 'Expense' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-500'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="Expense"
                        checked={formData.type === 'Expense'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-2 rounded-full ${formData.type === 'Expense' ? 'bg-red-100' : 'bg-slate-100'}`}>
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">Expense</span>
                      </div>
                      {formData.type === 'Expense' && (
                        <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-red-500" />
                      )}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Amount</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</div>
                      <Input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="pl-8 text-lg font-semibold"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g., Grocery shopping, Salary, etc."
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Category <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g., Food, Transport, Utilities"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-4">
                  <Button
                    type="submit"
                    isLoading={loading}
                    className="flex-1"
                    size="lg"
                  >
                    {isEditMode ? 'Save Changes' : 'Create Transaction'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/transactions')}
                    className="flex-1"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NewEntry;
