import React from "react";
import { Expenses } from "@/components/Expenses";
import { currentUser } from "@clerk/nextjs/server";
import { checkUserInDatabase } from "@/actions/user";

export default async function Home() {
  const user = await currentUser();

  const prisma_user = await checkUserInDatabase();
  console.log(prisma_user);

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
