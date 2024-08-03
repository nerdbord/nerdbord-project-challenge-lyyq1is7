import React from "react";
import styles from "./page.module.css";
import { Expenses } from "@/components/Expenses";
import { currentUser } from "@clerk/nextjs/server";
import { checkUserInDatabase } from "@/actions/user";
import { Landing } from "@/components/Landing";

export default async function Home() {
  const user = await currentUser();
  //const prisma_user = await checkUserInDatabase();
  //console.log(prisma_user);

  return (
    <div className=" overflow-y-auto">
      {!user ? (
        <>
          {/*         <p>Hello, {(user as any)?.firstName} ! 💜</p> */}
          <Expenses />
        </>
      ) : (
        <Landing />
      )}
    </div>
  );
}
