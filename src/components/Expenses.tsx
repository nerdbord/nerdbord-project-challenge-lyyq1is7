"use client";

import { AddExpenseForm } from "./Form";
import { useSession } from "@clerk/nextjs";
import useSWR from "swr";
import { ReceiptAnalyzer } from "./ReceiptAnalyzer";
import { fetchExpenses } from "../actions/receipt";

interface Receipt {
  id: number;
  name: string;
}

export const Expenses = () => {
  const { session } = useSession();

  const {
    data: receipts,
    error,
    mutate,
  } = useSWR(session ? "receipts" : null, fetchExpenses, {
    revalidateOnFocus: false,
  });

  const isLoading = !receipts && !error;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {receipts && receipts.length === 0 && <p>No expenses found</p>}
      {}
      {/*       {receipts &&
        receipts.length > 0 &&
        receipts.map((receipt: Receipt) => <p key={receipt.id}>{receipt}</p>)} */}

      <ReceiptAnalyzer />
    </div>
  );
};
