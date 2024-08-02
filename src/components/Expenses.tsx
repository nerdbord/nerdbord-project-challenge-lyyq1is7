"use client";

import "./styles.css";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetchExpenses, deleteExpense } from "@/actions/receipt";
import Link from "next/link";
import { ReceiptAnalyzer } from "./ReceiptAnalyzer";
import ManualReceiptForm from "./ManualReceiptForm";

async function fetcher() {
  try {
    const expenses = await fetchExpenses();
    return expenses;
  } catch (error) {
    throw error;
  }
}

export const Expenses = () => {
  const { data, error } = useSWR("expenses", fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (error) return <div>Failed to load expenses: {error.message}</div>;
  if (!data) return <div>Fetching expenses...</div>;

  /* 
  // dodac do buttona jak bedzie gotowy ui
  const handleAddExpense = async (newExpense: any) => {
    mutate([...data, newExpense], false);
    await mutate("expenses", fetcher, false);
  }; */

  const handleDeleteExpense = async (id: string) => {
    try {
      mutate(
        "expenses",
        data.filter((expense) => expense.id !== id),
        false
      );
      await deleteExpense(id);
      await mutate("expenses", fetcher, false);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  //pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ul>
        {currentData.length === 0 && <p>No expenses found</p>}
        {currentData.map((expense) => (
          <li key={expense.id}>
            <Link href={`/${expense.id}`} passHref>
              <div>
                <p>
                  <strong>Store:</strong> {expense.store}
                </p>
                <p>
                  <strong>Total:</strong> {expense.total} {expense.currency}
                </p>
                <p>
                  <strong>Date:</strong> {expense.date}
                </p>
              </div>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteExpense(expense.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <ReceiptAnalyzer
        onAddExpense={() => mutate("expenses", fetcher, false)}
      />
    </div>
  );
};

export default Expenses;
