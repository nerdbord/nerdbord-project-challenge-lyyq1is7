"use client";

import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/lib/supabaseClient";

export default function Home() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const { user } = useUser();
  const { session } = useSession();
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    async function initializeClient() {
      if (session) {
        const token = await session.getToken({ template: "supabase" });
        const supabaseClient = createClerkSupabaseClient(() =>
          Promise.resolve(token)
        );
        setClient(supabaseClient);
      }
    }

    initializeClient();
  }, [session]);

  useEffect(() => {
    if (!client || !user) return;

    async function loadExpenses() {
      setLoading(true);
      const { data, error } = await client.from("expenses").select();
      if (!error) setExpenses(data);
      setLoading(false);
    }

    loadExpenses();
  }, [client, user]);

  async function createExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { data, error } = await client.from("expenses").insert({
        name,
      });

      if (error) {
        throw error;
      }

      setExpenses([...expenses, data[0]]);
      setName("");
    } catch (error) {
      console.error("Error inserting expense:", error);
    }
  }

  return (
    <div>
      <h1>Expenses</h1>

      {loading && <p>Loading...</p>}

      {!loading &&
        expenses.length > 0 &&
        expenses.map((expense: any, index: number) => (
          <p key={index}>{expense.name}</p>
        ))}

      {!loading && expenses.length === 0 && <p>No expenses found</p>}

      <form onSubmit={createExpense}>
        <input
          autoFocus
          type="text"
          name="name"
          placeholder="Enter new expense"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
