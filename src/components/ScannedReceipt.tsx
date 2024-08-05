"use client";
import React, { useState } from "react";
import Pug from "@/assets/pug.png";
import Image from "next/image";
import "./styles.css";
import { CATEGORIES_LIB } from "@/lib/categories";

const CATEGORIES = CATEGORIES_LIB;

interface Expense {
  store: string;
  date: string;
  total: number | null;
  currency: string;
  category: string;
}

interface Result {
  expense: Expense;
  image?: string;
}

interface ReceiptDetailsProps {
  result: Result;
}

export const ReceiptDetails: React.FC<ReceiptDetailsProps> = ({ result }) => {
  const [store, setStore] = useState(result.expense?.store || "N/A");
  const [date, setDate] = useState(result.expense?.date || "N/A");
  const [total, setTotal] = useState<number | null>(
    result.expense?.total || null
  );
  const [currency, setCurrency] = useState(result.expense?.currency || "N/A");
  const [category, setCategory] = useState(result.expense?.category || "N/A");
  const receiptImage = result.image || Pug;

  // Handle input change for total
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTotal(value ? parseFloat(value) : null);
    console.log(typeof total);
  };

  return (
    <div className="h-full mx-auto space-y-4 bg-purple-50">
      <div className="relative w-full h-52">
        <Image
          src={receiptImage}
          alt="Receipt Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-4 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex gap-4 items-center w-full max-w-md ">
            <div className="flex gap-4 flex-col items-start flex-grow ">
              <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                Merchant:
              </label>
              <input
                type="text"
                className="border rounded-md w-full p-2 bg-white"
                value={store}
                onChange={(e) => setStore(e.target.value)}
              />
            </div>
            <div className="flex gap-4 flex-col items-start flex-grow">
              <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                Date:
              </label>
              <input
                type="text"
                className="border rounded-md w-full p-2 bg-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-4 flex-col items-start">
            <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
              Total:
            </label>
            <div className="flex gap-4 items-start w-full max-w-md ">
              <input
                type="number"
                className="border w-28 rounded-md p-2 bg-white"
                value={total ?? ""}
                onChange={handleTotalChange}
              />
              <input
                type="text"
                className="border rounded-md w-28 p-2 bg-custom"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-col items-start flex-grow">
          <label className="w-full font-semibold text-start text-xl not-italic leading-7 text-gray-900">
            Category:
          </label>
          <select
            className="border rounded-md w-full p-2 bg-purple-50"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
