"use client";

import "./styles.css";
import React from "react";
import useSWR, { mutate } from "swr";
import { fetchExpenses, deleteExpense } from "@/actions/receipt";
import Link from "next/link";
import * as XLSX from "xlsx";

interface Expense {
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
    throw error;
  }
}

export const Expenses: React.FC = () => {
  const { data, error } = useSWR<Expense[]>("expenses", fetcher);

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

  const generateReport = () => {
    const worksheetData = data.map((expense) => ({
      Date: expense.date || "N/A",
      Store: expense.store || "N/A",
      Items: expense.items || "N/A",
      Total: expense.total !== null ? expense.total.toString() : "N/A",
      Currency: expense.currency || "N/A",
      Category: expense.category || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses_Report.xlsx");
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

  // Group expenses by month
  const expensesByMonth: ExpensesByMonth = data.reduce<ExpensesByMonth>(
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

  return (
    <div className="h-screen overflow-y-auto p-4">
      <button
        onClick={generateReport}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Generate Report
      </button>
      {Object.keys(expensesByMonth).map((monthIndex) => (
        <div key={monthIndex} className="mb-6">
          <h2 className="text-xl font-bold mb-4">
            {months[parseInt(monthIndex)]}
          </h2>
          <ul className="flex flex-col w-full gap-4">
            {expensesByMonth[parseInt(monthIndex)]?.map((expense) => (
              <li key={expense.id} className="flex w-full gap-4">
                <Link href={`/${expense.id}`} passHref>
                  <div className="flex justify-between items-center h-24 gap-4 w-full">
                    <img
                      className="w-32 h-24 object-cover"
                      src={expense.image ?? ""}
                      alt="receipt image"
                    />

                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <p>{expense.date}</p>
                        <p>
                          {expense.total} {expense.currency}
                        </p>
                      </div>
                      <p className="font-bold"> {expense.store}</p>
                      <p> {expense.category}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Expenses;
