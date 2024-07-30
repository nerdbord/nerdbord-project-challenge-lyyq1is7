import React from "react";
import { Expenses } from "@/components/Expenses";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  console.log(user);
  return (
    <div>
      {user ? (
        <>
          <p>Hello, {user.firstName} ! 💜</p>

          <h1>Expenses</h1>
          <Expenses />
        </>
      ) : (
        <p>Landing</p>
      )}
    </div>
  );
}
