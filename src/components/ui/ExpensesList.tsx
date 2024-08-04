"use client";
import React from "react";
import WelcomeAllExpensesItem from "./WelcomeAllExpensesItem";

type ExpensesListProps = {
  expensesData: {
    id: string;
    image: string | null;
    date: string | null;
    store: string | null;
    items: string | null;
    total: number | null;
    category: string | null;
    createdAt: Date;
    userId: string | null;
  }[];
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expensesData }) => {
  return (
    <div>
      {expensesData.map((expense, index) => (
        <WelcomeAllExpensesItem
          key={index}
          date={expense.date}
          total={expense.total}
        />
      ))}
    </div>
  );
};

export default ExpensesList;
