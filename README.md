# 💰 BudgetFlow

**The Personalized Finance & Forecasting Manager**

BudgetFlow is a full-stack web application that helps you track daily income and expenses while providing intelligent forecasting using Simple Moving Average (SMA) analysis.

## 🚀 Features

### Core Functionality
- ✅ **User Authentication** - Secure registration and login with JWT
- ✅ **Transaction Management** - Full CRUD operations for income and expenses
- ✅ **Advanced Filtering** - Filter by type, date range, and search
- ✅ **Smart Sorting** - Sort transactions by date or amount
- ✅ **Pagination** - Efficient data loading for large transaction lists
- ✅ **SMA Forecasting** - Predict future expenses based on last 3 months

### Dashboard Features
- 📊 Real-time statistics (Total Income, Expenses, Balance)
- 📈 Simple Moving Average forecast visualization
- 🔄 Recent transactions overview

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- TailwindCSS
- Vite
- Native Fetch API

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs for password hashing

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd BudgetFlow
```

### 2. Backend Setup

```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npx prisma migrate dev --name init
npx prisma generate

# Start the server
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your backend API URL

# Start the development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 📡 API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transactions (Protected)
- `GET /api/transactions` - Get all transactions (with query params)
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Reports (Protected)
- `GET /api/reports/sma-forecast` - Get SMA forecast

### Query Parameters
- `type` - Filter by Income/Expense
- `startDate` / `endDate` - Date range filter
- `search` - Search descriptions
- `sortBy` - Sort by date/amount
- `sortOrder` - asc/desc
- `page` - Page number
- `limit` - Items per page

## 🎯 Usage

### 1. Register an Account
Navigate to `/register` and create your account.

### 2. Add Transactions
- Click "New Entry" to add income or expenses
- Fill in amount, description, category, and date
- Submit to save

### 3. View Dashboard
- See your financial overview
- Check SMA forecast for spending predictions
- Review recent transactions

### 4. Manage Transactions
- Go to "Transactions" page
- Use filters to find specific transactions
- Search, sort, and paginate through your history
- Edit or delete transactions as needed

## 📊 SMA Forecast Explained

The Simple Moving Average (SMA) forecast analyzes your expenses from the last 3 months to predict future spending patterns:

- Calculates average monthly expenses
- Groups transactions by month
- Provides early warning of spending trends
- Helps with budget planning

## 🚀 Deployment

### Backend (Render)
1. Create a new Web Service
2. Connect GitHub repository
3. Set build command: `npm install && npx prisma generate`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy!

### Frontend (Vercel)
1. Import repository on Vercel
2. Select Vite framework
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_URL` environment variable
6. Deploy!

### Database (Supabase)
1. Create new project on Supabase
2. Copy PostgreSQL connection string
3. Update `DATABASE_URL` in backend env

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Authorization checks for data ownership
- Input validation on all endpoints

## 📝 Project Structure

```
BudgetFlow/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   └── reports.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## 🤝 Contributing

This is a capstone project. Feel free to fork and modify for your own use!

## 📄 License

MIT License

## 👨‍💻 Author

Built as a capstone project demonstrating full-stack development skills.

---

**Happy Budgeting! 💰**
