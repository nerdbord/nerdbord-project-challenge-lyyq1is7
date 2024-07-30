"use client";

import { useSession } from "@clerk/nextjs";
import useSWR from "swr";
import { ReceiptAnalyzer } from "./ReceiptAnalyzer";

export const Expenses = () => {
  const { session } = useSession();

  return (
    <div>
      <ReceiptAnalyzer />
    </div>
  );
};
