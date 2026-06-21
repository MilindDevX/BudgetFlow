const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const {
      type,          
      startDate,
      endDate,
      search,       
      sortBy = 'date', 
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const userId = req.userId;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = { userId };

    if (type) {
      where.type = type;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    if (search) {
      where.description = {
        contains: search,
        mode: 'insensitive'
      };
    }

    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy,
      skip,
      take: parseInt(limit)
    });

    const total = await prisma.transaction.count({ where });

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Server error fetching transactions' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body;
    const userId = req.userId;

    if (!type || !amount || !description) {
      return res.status(400).json({ 
        error: 'Type, amount, and description are required' 
      });
    }

    if (!['Income', 'Expense'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "Income" or "Expense"' 
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amount: parseFloat(amount),
        description,
        category: category || null,
        date: date ? new Date(date) : new Date()
      }
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Server error creating transaction' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, description, category, date } = req.body;
    const userId = req.userId;

    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (existingTransaction.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (type && !['Income', 'Expense'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "Income" or "Expense"' 
      });
    }

    if (amount && amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        ...(type && { type }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(description && { description }),
        ...(category !== undefined && { category }),
        ...(date && { date: new Date(date) })
      }
    });

    res.json({
      message: 'Transaction updated successfully',
      transaction: updatedTransaction
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ error: 'Server error updating transaction' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (existingTransaction.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.transaction.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: 'Server error deleting transaction' });
  }
});

module.exports = router;
