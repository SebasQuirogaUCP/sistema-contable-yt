import { useEffect, useState } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { TransactionTable } from "./components/TransactionTable";
import type { Transaction } from "./types/transaction";

type Page = "dashboard" | "datos";

function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleUpdateTransaction = (
    id: string,
    transaction: Omit<Transaction, "id">
  ) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...transaction, id } : t))
    );
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      <main className="lg:pl-64">
        {activePage === "dashboard" && (
          <Dashboard transactions={transactions} />
        )}
        {activePage === "datos" && (
          <TransactionTable
            transactions={transactions}
            onAdd={handleAddTransaction}
            onUpdate={handleUpdateTransaction}
            onDelete={handleDeleteTransaction}
          />
        )}
      </main>
    </div>
  );
}

export default App;
