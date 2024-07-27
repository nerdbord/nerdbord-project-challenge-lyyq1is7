"use client";

import { useState, useEffect } from "react";
import { AddExpenseForm } from "./Form";
import { useSupabaseClient } from "@/contexts/supabaseContext";
import { useSession } from "@clerk/nextjs";

interface Expense {
  id: number;
  name: string;
}

export const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { client } = useSupabaseClient();
  const { session } = useSession();

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else if (client && session) {
      loadExpenses();
    }
  }, [session, client]);

  async function loadExpenses() {
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data, error } = await client.from("expenses").select();
      if (error) {
        setErrorMsg("Failed to load expenses");
      } else if (data.length === 0) {
        setErrorMsg("No expenses found");
      } else {
        setExpenses(data);
        localStorage.setItem("expenses", JSON.stringify(data));
      }
    } catch (error) {
      setErrorMsg("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  const handleExpenseAdded = () => {
    loadExpenses();
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading &&
        expenses.length > 0 &&
        !errorMsg &&
        expenses.map((expense) => <p key={expense.id}>{expense.name}</p>)}
      {!loading && errorMsg && <p>{errorMsg}</p>}

      <AddExpenseForm client={client} onExpenseAdded={handleExpenseAdded} />
    </div>
  );
};
