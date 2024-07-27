"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { AddExpenseForm } from "./Form";
import { useSupabaseClient } from "@/contexts/supabaseContext";
interface Expense {
  id: number;
  name: string;
}

export const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { user } = useUser();
  const { client, error } = useSupabaseClient();

  // Load expenses when client and user are available
  useEffect(() => {
    if (!client || !user) return;
    loadExpenses();
  }, [client, user]);

  async function loadExpenses() {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await client.from("expenses").select();
      if (error) {
        setErrorMsg("Failed to load expenses");
      } else if (data.length === 0) {
        setErrorMsg("No expenses found");
      } else {
        setExpenses(data);
      }
    } catch (error) {
      setErrorMsg("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading &&
        expenses.length > 0 &&
        !errorMsg &&
        expenses.map((expense) => <p key={expense.id}>{expense.name}</p>)}
      {!loading && errorMsg && <p>{errorMsg}</p>}
      {!loading && !errorMsg && expenses.length === 0 && (
        <p>No expenses found</p>
      )}

      <AddExpenseForm client={client} onExpenseAdded={loadExpenses} />
    </div>
  );
};
