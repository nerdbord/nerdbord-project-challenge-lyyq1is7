"use client";

import { AddExpenseForm } from "./Form";
import { useSupabaseClient } from "@/contexts/supabaseContext";
import { useSession } from "@clerk/nextjs";
import useSWR from "swr";

interface Expense {
  id: number;
  name: string;
}

const fetcher = async (client: any) => {
  const { data, error } = await client.from("expenses").select();
  if (error) {
    throw new Error("Failed to load expenses");
  }
  return data;
};

export const Expenses = () => {
  const { client } = useSupabaseClient();
  const { session } = useSession();

  const {
    data: expenses,
    error,
    mutate,
  } = useSWR(client && session ? "expenses" : null, () => fetcher(client), {
    revalidateOnFocus: false,
  });

  const isLoading = !expenses && !error;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {expenses && expenses.length === 0 && <p>No expenses found</p>}
      {expenses &&
        expenses.length > 0 &&
        expenses.map((expense: Expense) => (
          <p key={expense.id}>{expense.name}</p>
        ))}
      <AddExpenseForm client={client} onExpenseAdded={() => mutate()} />
    </div>
  );
};
