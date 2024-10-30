const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/sma-forecast', async (req, res) => {
  try {
    const userId = req.userId;
    const now = new Date();
    
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const expenses = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'Expense',
        date: {
          gte: threeMonthsAgo,
          lte: now
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    if (expenses.length === 0) {
      return res.json({
        sma: 0,
        period: '3 months',
        dataPoints: 0,
        message: 'No expense data available for the last 3 months'
      });
    }

    const monthlyExpenses = {};
    
    expenses.forEach(expense => {
      const monthKey = `${expense.date.getFullYear()}-${expense.date.getMonth() + 1}`;
      if (!monthlyExpenses[monthKey]) {
        monthlyExpenses[monthKey] = 0;
      }
      monthlyExpenses[monthKey] += expense.amount;
    });

    const monthlyTotals = Object.values(monthlyExpenses);
    const sma = monthlyTotals.reduce((sum, total) => sum + total, 0) / monthlyTotals.length;

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({
      sma: parseFloat(sma.toFixed(2)),
      period: '3 months',
      dataPoints: expenses.length,
      monthlyTotals,
      totalExpenses: parseFloat(totalExpenses.toFixed(2)),
      forecast: `Based on your last 3 months, you're spending an average of $${sma.toFixed(2)} per month`
    });
  } catch (error) {
    console.error('SMA forecast error:', error);
    res.status(500).json({ error: 'Server error calculating forecast' });
  }
});

module.exports = router;
