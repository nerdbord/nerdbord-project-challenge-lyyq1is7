"use client";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Expense } from "./Expenses";

interface ReportsGeneratorProps {
  expensesByMonth: { [key: number]: Expense[] };
}

export const ReportsGenerator: React.FC<ReportsGeneratorProps> = ({
  expensesByMonth,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const exportExpensesToXLS = () => {
    // Ensure this code only runs in the browser
    if (!isClient) return;

    // Convert expensesByMonth to a 2D array format suitable for XLSX
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

    const worksheetData: (string | number | null)[][] = [];

    // Add headers
    worksheetData.push([
      "Date",
      "Store",
      "Items",
      "Total",
      "Currency",
      "Category",
    ]);

    // Add each expense to the worksheet data
    Object.keys(expensesByMonth).forEach((monthIndex) => {
      const month = months[parseInt(monthIndex)];
      expensesByMonth[parseInt(monthIndex)].forEach((expense) => {
        worksheetData.push([
          expense.date,
          expense.store,
          expense.items,
          expense.total,
          expense.currency,
          expense.category,
        ]);
      });
    });

    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    // Write the workbook to a binary string
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    // Function to trigger download
    const s2ab = (s: string) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    // Create a Blob from the binary string and trigger a download
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses_summary.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isClient) return null;

  return (
    <button
      onClick={exportExpensesToXLS}
      className="rounded-full py-2 px-4 border border-purple-900 text-purple-900 flex items-center justify-center"
    >
      Export to XLS
    </button>
  );
};
