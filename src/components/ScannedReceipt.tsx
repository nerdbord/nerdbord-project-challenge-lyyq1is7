"use client";
import React, { useState } from "react";

type ReceiptDetailsProps = {
  result: any;
};

export const ReceiptDetails: React.FC<ReceiptDetailsProps> = ({ result }) => {
  const [store, setStore] = useState(result.expense?.store || "N/A");
  const [date, setDate] = useState(result.expense?.date || "N/A");
  const [total, setTotal] = useState(result.expense?.total || "N/A");
  const [currency, setCurrency] = useState(result.expense?.currency || "N/A");
  const [category, setCategory] = useState(result.expense?.category || "N/A");

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl space-y-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <label className="w-24 font-semibold">Merchant:</label>
          <input
            type="text"
            className="border rounded-md w-full p-2"
            value={store}
            onChange={(e) => setStore(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 font-semibold">Date:</label>
          <input
            type="text"
            className="border rounded-md w-full p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <label className="w-24 font-semibold">Total:</label>
          <input
            type="text"
            className="border rounded-md w-full p-2"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 font-semibold">Currency:</label>
          <input
            type="text"
            className="border rounded-md w-full p-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
        <label className="w-24 font-semibold">Category:</label>
        <input
          type="text"
          className="border rounded-md w-full p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
    </div>
  );
};
