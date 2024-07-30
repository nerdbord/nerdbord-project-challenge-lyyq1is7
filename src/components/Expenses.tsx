"use client";

import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import { ReceiptAnalyzer } from "./ReceiptAnalyzer";
import { fetchExpenses } from "@/actions/receipt";

export const Expenses = () => {
  const { session } = useSession();
  console.log(session);
  const [expenses, setExpenses] = useState<
    { store: string; total: number; date: string }[]
  >([]);

  useEffect(() => {
    async function loadExpenses() {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
    }
    loadExpenses();
  }, []);

  return (
    <div>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <p>
              <strong>Description:</strong> {expense.store}
            </p>
            <p>
              <strong>Amount:</strong> {expense.total}
            </p>
            <p>
              <strong>Date:</strong> {expense.date}
            </p>
          </li>
        ))}
      </ul>
      <ReceiptAnalyzer />
    </div>
  );
};
