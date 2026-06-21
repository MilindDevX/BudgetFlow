# BudgetFlow Frontend

React-based frontend for BudgetFlow - Personal Finance Manager

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **HTTP Client**: Native Fetch API

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Update the `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

For production, set this to your deployed backend URL.

### 3. Run the Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/           # React Context
│   │   └── AuthContext.jsx
│   ├── pages/             # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   └── NewEntry.jsx
│   ├── utils/             # Utility functions
│   │   └── api.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Features

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes

### Dashboard
- Overview of total income, expenses, and balance
- Simple Moving Average (SMA) forecast
- Recent transactions

### Transactions
- View all transactions with pagination
- Filter by type (Income/Expense)
- Filter by date range
- Search by description
- Sort by date or amount
- Edit and delete transactions

### New Entry
- Create new transactions
- Edit existing transactions
- Form validation

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure build settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - `VITE_API_URL`: Your backend API URL
5. Deploy!

Alternatively, use Vercel CLI:

```bash
npm install -g vercel
vercel
```
