import { Card, CardContent } from "@/components/ui/card";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useTransactions } from "../context/TransactionContext";

function Transactions() {

  const {transactions}=useTransactions();

  const balance = transactions.reduce((acc, item) => {
    return item.type === "expense"
      ? acc - Number(item.amount)
      : acc + Number(item.amount);
  }, 0);

  return (
    <div className="main-container" style={{ padding: "20px" }}>
      <div className="main-container">
        <h2 className="sub-heading-large">Your Transactions</h2>
        <Card>
          <CardContent style={{ padding: "24px" }}>
            <div className="main-container">
              <span className="sub-heading-small">Current Balance</span>
              <span
                className="sub-heading-medium"
                style={{ color: balance >= 0 ? "green" : "red" }}
              >
                ₹{balance.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <TransactionForm/>

      <TransactionList/>
    </div>
  );
}

export default Transactions;
