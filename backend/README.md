# BudgetFlow Backend

RESTful API for BudgetFlow - Personal Finance Manager

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/budgetflow?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
NODE_ENV=development
```

### 3. Setup Database

Run Prisma migrations to create database tables:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 4. Run the Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user

### Transactions (Protected)

- **GET** `/api/transactions` - Get all transactions (with filters, search, sort, pagination)
- **POST** `/api/transactions` - Create new transaction
- **PUT** `/api/transactions/:id` - Update transaction
- **DELETE** `/api/transactions/:id` - Delete transaction

### Reports (Protected)

- **GET** `/api/reports/sma-forecast` - Get Simple Moving Average forecast

## Query Parameters for GET /api/transactions

- `type` - Filter by Income/Expense
- `startDate` - Filter by start date (YYYY-MM-DD)
- `endDate` - Filter by end date (YYYY-MM-DD)
- `search` - Search in transaction description
- `sortBy` - Sort by: date, amount (default: date)
- `sortOrder` - asc or desc (default: desc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Deployment

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard
5. Deploy!

### Database on Supabase

1. Create a new project on Supabase
2. Copy the PostgreSQL connection string
3. Update `DATABASE_URL` in your environment variables
