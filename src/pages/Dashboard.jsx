import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, PieChart, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

function Dashboard({transactions}=[]) {
  const [stats, setStats] = useState({
    total: 0,
    income: 0,
    expenses: 0,
    balance: 0,
    categories: {},
    recentTransactions: [],
    trend: { income: 0, expenses: 0 },
  });

  useEffect(() => {
    const calculateStats = () => {
      if (!transactions || transactions.length === 0) {
        setStats({
          total: 0,
          income: 0,
          expenses: 0,
          balance: 0,
          categories: {},
          recentTransactions: [],
          trend: { income: 0, expenses: 0 },
        });
        return;
      }

      const total = transactions.length;

      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const balance = income - expenses;

      // Calculate spending by category (only for expenses)
      const categories = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
          const category = t.category.toLowerCase();
          if (!acc[category]) acc[category] = 0;
          acc[category] += Number(t.amount);
          return acc;
        }, {});

      // Get recent transactions (sorted by date, assuming you have a date field)
      const recentTransactions = transactions
        .sort((a, b) => new Date(b.date || b.id) - new Date(a.date || a.id))
        .slice(0, 5);

      // Calculate month-over-month trend (fixed date handling)
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      const thisMonthTransactions = transactions.filter((t) => {
        const transactionDate = new Date(t.date || t.id);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      });

      const lastMonthTransactions = transactions.filter((t) => {
        const transactionDate = new Date(t.date || t.id);
        return (
          transactionDate.getMonth() === lastMonth &&
          transactionDate.getFullYear() === lastMonthYear
        );
      });

      const thisMonthIncome = thisMonthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const lastMonthIncome = lastMonthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const thisMonthExpenses = thisMonthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const lastMonthExpenses = lastMonthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const trend = {
        income: lastMonthIncome > 0 
          ? ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100 
          : thisMonthIncome > 0 ? 100 : 0,
        expenses: lastMonthExpenses > 0 
          ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 
          : thisMonthExpenses > 0 ? 100 : 0,
      };

      setStats({
        total,
        income,
        expenses,
        balance,
        categories,
        recentTransactions,
        trend,
      });
    };

    calculateStats();
  }, [transactions]);

  return (
    <div className="main-container" style={{ padding: "20px" }}>
      <h1 className="sub-heading-large">Financial Overview</h1>
      
      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Balance Card */}
        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="sub-text" style={{ fontWeight: 600 }}>
              Total Balance
            </span>
            <TrendingUp className="sub-container-icon-medium" color="#666" />
          </CardHeader>
          <CardContent>
            <div className={`sub-heading-medium ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${stats.balance.toLocaleString()}
            </div>
            <p className="text-muted-foreground">
              From {stats.total} transactions
            </p>
          </CardContent>
        </Card>

        {/* Income Card */}
        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="sub-text" style={{ fontWeight: 600 }}>
              Income
            </span>
            {stats.trend.income >= 0 ? (
              <TrendingUp className="sub-container-icon-medium" color="green" />
            ) : (
              <TrendingDown className="sub-container-icon-medium" color="red" />
            )}
          </CardHeader>
          <CardContent>
            <div className="sub-heading-medium text-green-600">
              ${stats.income.toLocaleString()}
            </div>
            <p className="text-muted-foreground">
              {stats.trend.income >= 0 ? '+' : ''}{stats.trend.income.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="sub-text" style={{ fontWeight: 600 }}>
              Expenses
            </span>
            {stats.trend.expenses <= 0 ? (
              <TrendingDown className="sub-container-icon-medium" color="green" />
            ) : (
              <TrendingUp className="sub-container-icon-medium" color="red" />
            )}
          </CardHeader>
          <CardContent>
            <div className="sub-heading-medium text-red-600">
              ${stats.expenses.toLocaleString()}
            </div>
            <p className="text-muted-foreground">
              {stats.trend.expenses >= 0 ? '+' : ''}{stats.trend.expenses.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>

        {/* Top Category Card */}
        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="sub-text" style={{ fontWeight: 600 }}>
              Top Category
            </span>
            <PieChart className="sub-container-icon-medium" color="#666" />
          </CardHeader>
          <CardContent>
            <div className="sub-heading-medium capitalize">
              {Object.entries(stats.categories).sort(
                ([, a], [, b]) => b - a
              )[0]?.[0] || "None"}
            </div>
            <p className="text-muted-foreground">Highest spending category</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card className="card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="sub-heading-small">Recent Transactions</h2>
              <Clock className="sub-container-icon-medium text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.recentTransactions.length === 0 ? (
                <p className="text-muted-foreground">No transactions yet.</p>
              ) : (
                stats.recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="sub-text font-semibold">
                        {transaction.description}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {new Date(transaction.date || transaction.id).toLocaleDateString()} —{" "}
                        {new Date(transaction.date || transaction.id).toLocaleTimeString()}
                      </p>
                    </div>
                    <div
                      className={`sub-text font-semibold ${
                        transaction.type === "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.type === "expense" ? "-" : "+"}$
                      {Number(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Spending Categories */}
        <Card className="card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="sub-heading-small">Top Spending Categories</h2>
              <PieChart className="sub-container-icon-medium text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {Object.entries(stats.categories).length === 0 ? (
              <p className="text-muted-foreground">
                No spending data available.
              </p>
            ) : (
              <div className="space-y-2">
                {Object.entries(stats.categories)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([category, amount]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition"
                    >
                      <div className="flex-1">
                        <p className="sub-text capitalize font-semibold">
                          {category}
                        </p>
                        <div className="h-2 w-full max-w-[200px] rounded-full bg-gray-200 overflow-hidden mt-1">
                          <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{
                              width: `₹${stats.expenses > 0 ? (amount / stats.expenses) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="sub-text font-semibold ml-4">
                        ₹{amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
