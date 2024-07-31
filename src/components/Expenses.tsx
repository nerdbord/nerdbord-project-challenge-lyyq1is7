"use client";

import { useState, useEffect } from "react";
import { ReceiptAnalyzer } from "./ReceiptAnalyzer";
import { fetchExpenses } from "@/actions/receipt";
import ManualReceiptForm from "./ManualReceiptForm";

export const Expenses = () => {
  const [expenses, setExpenses] = useState<
    { store: string; total: number; date: string }[]
  >([]);

  useEffect(() => {
    async function loadExpenses() {
      const rawExpenses = await fetchExpenses();

      const transformedExpenses = rawExpenses.map((expense) => ({
        store: expense.store ?? "Unknown Store",
        total: expense.total ? parseFloat(expense.total) : 0,
        date: expense.date ?? "Unknown Date",
      }));

      setExpenses(transformedExpenses);
    }
    loadExpenses();
  }, []);

  return (
    <div>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <p>
              <strong>Store:</strong> {expense.store}
            </p>
            <p>
              <strong>Total:</strong> {expense.total}
            </p>
            <p>
              <strong>Date:</strong> {expense.date}
            </p>
          </li>
        ))}
      </ul>
      <ReceiptAnalyzer />
      <ManualReceiptForm />
    </div>
  );
};
