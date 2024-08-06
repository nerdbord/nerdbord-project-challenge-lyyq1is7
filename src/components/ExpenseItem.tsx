import React from "react";
import Link from "next/link";
import { Expense } from "./Expenses";
interface ExpenseItemProps {
  expense: Expense;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <li className="flex justify-start w-full gap-4 bg-white p-2">
      <Link href={`/${expense.id}`} passHref>
        <div className="flex justify-start gap-4 w-full">
          <img
            className="w-60 h-20 object-cover justify-self-start"
            src={expense.image ?? ""}
            alt="receipt image"
          />
          <div className="w-full">
            <div className="flex justify-between items-center ">
              <p className="text-xs not-italic font-normal leading-4">
                {expense.date}
              </p>
              <p className="text-center text-base not-italic font-semibold leading-6">
                {expense.total} {expense.currency}
              </p>
            </div>
            <p className="text-xl not-italic font-semibold leading-7 pt-2">
              {expense.store}
            </p>
            <p className="text-xs not-italic font-normal leading-4">
              {expense.category}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
