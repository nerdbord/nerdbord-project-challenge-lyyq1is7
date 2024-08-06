"use client";
import React from "react";
import useSWR from "swr";
import { fetchExpenses } from "@/actions/receipt";
import { ExpenseItem } from "./ExpenseItem";
import { CiFilter, CiSearch } from "react-icons/ci";
import { BsChevronLeft } from "react-icons/bs";
import { GoShareAndroid, GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";
import { Loader } from "./Loader";
import { ReportsGenerator } from "./RaportsGenerator";
import { UserButton } from "@clerk/nextjs";

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

export const Expenses: React.FC = () => {
  const fetcher = async () => await fetchExpenses();
  const { data, error } = useSWR<Expense[], Error>("expenses", fetcher);

  const router = useRouter();

  const handleCapturePicture = () => {
    router.push("/scan");
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
  const expensesByMonth: ExpensesByMonth =
    data?.reduce<ExpensesByMonth>((acc, expense) => {
      const date = expense.date ? new Date(expense.date) : null;
      const month = date?.getMonth();
      if (month !== undefined && !acc[month]) {
        acc[month] = [];
      }
      if (month !== undefined) {
        acc[month].push(expense);
      }
      return acc;
    }, {}) || {};

  if (error) return <div>Failed to load expenses: {error.message}</div>;
  if (!data) return <Loader />;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-purple-50">
      <div className="flex h-12 justify-between w-full bg-purple-900 text-white px-4 gap-52">
        <div className="flex items-center m-0">
          <BsChevronLeft className="w-4 h-4" />
          <p className="text-base font-semibold leading-6 pl-4">July 2024</p>
        </div>
        <div className="flex items-center gap-4 m-0">
          <UserButton />
          <button
            onClick={handleCapturePicture}
            className="bg-white border border-white p-1 text-white font-bold  rounded-full text-purple-900 text-base not-italic font-normal leading-6"
          >
            <GoPlus className="text-purple-900 w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex h-12 justify-between items-center w-full bg-white text-purple-900 px-4">
        <CiSearch className="w-6 h-6" />
        <input
          className="text-sm font-normal leading-5 text-purple-900 placeholder:text-purple-900 h-12 w-full bg-white border-none focus:outline-none px-4"
          type="text"
          placeholder="Search by document text"
        />
        <CiFilter className="w-6 h-6" />
      </div>
      <div id="expenses" className="flex-grow w-full overflow-y-auto p-4">
        {Object.keys(expensesByMonth).length === 0 ? (
          <div className="pt-16 text-purple-900 w-full">
            <p className="text-center text-xl font-semibold leading-7">
              It's empty here.
            </p>
            <p className="text-center text-base font-normal leading-6 pt-3">
              No expenses yet.
              <br /> Add your first document <br /> to see it here!
            </p>
            <button
              onClick={handleCapturePicture}
              className="absolute bottom-24 left-24 right-24  bg-violet-900 text-white font-bold py-5 px-6 rounded-full text-purple-50 text-base not-italic font-normal leading-6"
            ></button>
          </div>
        ) : (
          Object.keys(expensesByMonth).map((monthIndex) => (
            <div key={monthIndex} className="mb-6">
              <div className="flex justify-between items-center pb-4">
                <h2 className="text-xl not-italic font-semibold leading-7 mb-4 text-purple-900">
                  {months[parseInt(monthIndex)]}
                </h2>
                <ReportsGenerator expensesByMonth={expensesByMonth} />
              </div>

              <ul className="flex flex-col gap-2">
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
