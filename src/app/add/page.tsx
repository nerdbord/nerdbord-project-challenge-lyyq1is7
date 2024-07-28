"use client";
import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";


export default function Home() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
  const { user } = useUser();
  // The `useSession()` hook will be used to get the Clerk session object
  const { session } = useSession();

  // Create a custom supabase client that injects the Clerk Supabase token into the request headers
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          // Get the custom Supabase token from Clerk
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            // Now call the default fetch
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  // Create a `client` object for accessing Supabase data using the Clerk token
  const client = createClerkSupabaseClient();

  // This `useEffect` will wait for the User object to be loaded before requesting
  // the expenses for the logged in user
  useEffect(() => {
    if (!user) return;

    async function loadExpenses() {
      setLoading(true);
      const { data, error } = await client.from("expenses").select();
      if (!error) setExpenses(data);
      setLoading(false);
    }

    loadExpenses();
  }, [user]);

  async function createExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Insert expense into the "expenses" database
    await client.from("expenses").insert({
      name,
    });
    if (error) {
      console.error("Error creating expense:", error);
      setError("Failed to create expense. Please try again later.");
    } else {
      window.location.reload();
    }
  }


    return (
      <div>
        <h1>Expenses</h1>

        {loading && <p>Loading...</p>}

        {!loading &&
          expenses.length > 0 &&
          expenses.map((expense: any) => <p>{expense.name}</p>)}

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
  };

  /* import { auth, currentUser } from "@clerk/nextjs/server"; */
  // import styles from "./page.module.css";

  // import ReadTextFromPhoto from "@/components/ReadTextFromPhoto";

  // import { UploadForm } from "@/components/UploadForm";

  // export default function Home() {
  //   const { userId } = auth();

  //   return (
  //     <main className={styles.main}>

  //       {userId ?  <UploadForm /> : <div>Sign in to upload a photo</div>}

  //       <UploadForm />

  //     </main>
  //   );
  // }
}
