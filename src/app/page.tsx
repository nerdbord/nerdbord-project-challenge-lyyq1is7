import React from "react";
import { Expenses } from "@/components/Expenses";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div>
      {user ? (
        <>
          <h1>Expenses</h1>
          <Expenses />
        </>
      ) : (
        <p>Landing</p>
      )}
    </div>
  );
}
