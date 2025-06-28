# 💸 Expense Tracker

A powerful and user-friendly Expense Tracker app built with **React**, **Tailwind CSS** and **Redux**. It allows users to track their income, expenses, set budgets and goals, manage recurring subscriptions, and visualize financial summaries in real-time.

## 🔗 Live Demo

Check out the live app here: [Expense Tracker App](https://expense-tracker-blue-three-11.vercel.app/)

## 🧰 Tech Stack

- React
- Tailwind CSS
- Redux Toolkit
- Vite
- React Router DOM
- html2canvas + jsPDF (for PDF generation)

---

## 🚀 Features


### 💼 Income & Expenses
- Add, edit, and delete transactions
- Mark transactions as income or expense
- Assign categories (e.g., Food, Rent, Travel, etc.)

### 📊 Summary Dashboard
- Displays current balance
- Total income and total expenses
- Percentage breakdowns
- Budget exhaustion alert modal

### 📅 Filtering & Sorting
- Filter transactions by:
  - Date range
  - Category

### 📈 Analytics & Charts
- Monthly overview
- Interactive charts (bar, pie)
- Track spending trends visually

### 📑 Monthly Report (PDF)
- Generate a professional monthly report
- Includes charts, summary, and transaction history
- Export/download as PDF using jsPDF + html2canvas

### 🧾 Budget Management
- Set monthly budgets
- Get notified when 80% of the budget is used
- Prevent or confirm over-budget transactions

### 🎯 Goal Tracker
- Create multiple financial goals (e.g., "Buy a bike", "Emergency Fund")
- Automatically allocate income percentage to each goal
- Manual and automatic income transfer to goals
- Goal percentage auto-adjusts when new goals are added
- Modal to manually update goal distribution
- Prevent transfers beyond goal target amount

### 🔁 Recurring Subscriptions
- Add recurring monthly subscriptions (e.g., Netflix, Spotify)
- Automatically added to expense on scheduled date
- Categorize and edit subscription details

### 📆 Income Settings
- Set a fixed monthly income (used for budget/goal calculations)
- Income reflected in all summaries and goal allocations
- Income does not require transaction entry

### ⚙️ Admin-Like Tools
- Reset budgets/goals
- Manual percentage override for goal distributions
- Transfer income manually or auto on monthly creation date

---

## 📁 Project Setup

```bash
git clone https://github.com/harshi-khandelwal/expense-tracker.git
cd expense-tracker
npm install
npm run dev
