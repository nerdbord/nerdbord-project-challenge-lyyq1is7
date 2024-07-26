"use client";

import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/lib/supabaseClient";

interface Expense {
  id: number;
  name: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { user } = useUser();
  const { session } = useSession();
  const [client, setClient] = useState<any>(null);

  console.log("user", user);
  console.log("session", session);
  console.log("client", client);

  // Initialize Supabase client when session is available
  useEffect(() => {
    async function initializeClient() {
      if (session) {
        try {
          const token = await session.getToken({ template: "supabase" });
          //imported client from supabaseClient.ts
          const supabaseClient = createClerkSupabaseClient(() =>
            Promise.resolve(token)
          );
          setClient(supabaseClient);
        } catch (error) {
          setErrorMsg("Failed to initialize Supabase client");
        }
      }
    }

    initializeClient();
  }, [session]); // reload only when session changes

  // Load expenses when client and user are available
  useEffect(() => {
    if (!client || !user) return;

    async function loadExpenses() {
      setLoading(true);
      try {
        const { data, error } = await client.from("expenses").select();
        if (error) {
          throw error;
        }
        setExpenses(data);
      } catch (error) {
        setErrorMsg("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    }

    loadExpenses();
  }, [client, user]); //reload only when client or user changes

  // Handle creating a new expense
  async function createExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await client.from("expenses").insert({
        name,
      });

      if (error) {
        throw error;
      }

      setExpenses((prevExpenses) => [...prevExpenses, data[0]]);
      setName("");
    } catch (error) {
      setErrorMsg("Failed to create expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Expenses</h1>
      {loading && <p>Loading...</p>}
      {!loading &&
        expenses.length > 0 &&
        expenses.map((expense) => <p key={expense.id}>{expense.name}</p>)}
      {!loading && errorMsg && <p>{errorMsg}</p>}
      {!loading && !errorMsg && expenses.length === 0 && (
        <p>No expenses found</p>
      )}
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
