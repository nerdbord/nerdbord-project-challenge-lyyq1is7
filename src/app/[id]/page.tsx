import React from "react";
import { redirect } from "next/navigation";
import { ExpenseDetail } from "@/components/ExpenseDetail";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
    return null;
  }

  return <ExpenseDetail params={params} />;
};

export default Page;
