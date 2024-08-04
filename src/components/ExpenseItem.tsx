import React from "react";
import Link from "next/link";
import { Expense } from "./Expenses";
interface ExpenseItemProps {
  expense: Expense;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <li className="flex justify-between w-full gap-4 ">
      <Link href={`/${expense.id}`} passHref>
        <div className="flex justify-between items-center  gap-4 w-full ">
          <img
            className="w-44 h-20 object-cover"
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
  );
};
