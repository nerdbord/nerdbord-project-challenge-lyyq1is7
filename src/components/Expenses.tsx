"use client";

import "./styles.css";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetchExpenses, deleteExpense } from "@/actions/receipt";
import { ExpenseItem } from "./ExpenseItem";
import { DateFilter } from "./DateFilter";
import { ReportGenerator } from "./RaportGenerator";
import ReceiptAnalyzer from "./ReceiptAnalyzer";

export interface Expense {
  id: string;
  image: string | null;
  date: string | null;
  store: string | null;
  items: string | null;
  total: number | null;
  currency: string | null;
  category: string | null;
  createdAt: Date;
  userId: string | null;
}

interface ExpensesByMonth {
  [key: number]: Expense[];
}

async function fetcher(): Promise<Expense[]> {
  try {
    const expenses = await fetchExpenses();
    return expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Failed to fetch expenses.");
  }
}

export const Expenses: React.FC = () => {
  const { data, error } = useSWR<Expense[]>("expenses", fetcher);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  if (error) return <div>Failed to load expenses: {error.message}</div>;
  if (!data) return <div>Fetching expenses...</div>;

  const handleDeleteExpense = async (id: string) => {
    try {
      mutate(
        "expenses",
        data?.filter((expense) => expense.id !== id) || [],
        false
      );
      await deleteExpense(id);
      await mutate("expenses", fetcher, false);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter expenses based on date range
  const filteredData = data.filter((expense) => {
    const expenseDate = expense.date ? new Date(expense.date) : null;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (!expenseDate) return false;

    if (start && expenseDate < start) return false;
    if (end && expenseDate > end) return false;

    return true;
  });

  // Group expenses by month for filtered data
  const expensesByMonth: ExpensesByMonth = filteredData.reduce<ExpensesByMonth>(
    (acc, expense) => {
      const date = expense.date ? new Date(expense.date) : null;
      const month = date?.getMonth();
      if (month !== undefined && !acc[month]) {
        acc[month] = [];
      }
      if (month !== undefined) {
        acc[month].push(expense);
      }
      return acc;
    },
    {}
  );
  const handleAddExpense = async (newExpense: any) => {
    mutate([...data, newExpense], false);
    await mutate("expenses", fetcher, false);
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-hidden">
      <div id="filtered-expenses">
        {Object.keys(expensesByMonth).length === 0 ? (
          <p>No expenses found for the selected date range.</p>
        ) : (
          Object.keys(expensesByMonth).map((monthIndex) => (
            <div key={monthIndex} className="mb-6">
              <h2 className="text-xl font-bold mb-4">
                {months[parseInt(monthIndex)]}
              </h2>
              <ul className="flex flex-col justify-between w-full gap-2">
                {expensesByMonth[parseInt(monthIndex)]?.map((expense) => (
                  <ExpenseItem key={expense.id} expense={expense} />
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
