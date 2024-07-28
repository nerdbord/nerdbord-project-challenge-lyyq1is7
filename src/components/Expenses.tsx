"use client";

import { createClient } from "@/lib/clerkSupabaseClient";

export type FileData = {
  name: string;
  url: string;
};
const accept = "image/jpeg, image/jpg, image/png";

import { useState, useEffect } from "react";
import { AddExpenseForm } from "./Form";
import { useSupabaseClient } from "@/contexts/supabaseContext";
import { useSession, useAuth, useUser } from "@clerk/nextjs";
// import { uploadImage } from "@/app/api/actions";

interface Expense {
  id: number;
  name: string;
  receiptImageUrl: string;
}

export const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { client } = useSupabaseClient();
  const { session } = useSession();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (client && session) {
      loadExpenses();
    }
  }, [session, client]);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files?.[0] || null;

    if (file && file.type.startsWith("image/")) {
      setFile(file);
    }
    // if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    //   setFile(file);
    // }
  };
  const uploadImage = async (file: File, user: string | null | undefined) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
  
    let { data, error: uploadError } = await client.storage
      .from('images')
      .upload(filePath, file);
  
    if (uploadError) {
      throw uploadError;
    }
  
    const { publicURL, error: urlError } = client.storage
      .from('images')
      .getPublicUrl(filePath);
  
    if (urlError) {
      throw urlError;
    }
  
    const { error: insertError } = await client.from('expenses').insert({
      user_id: userId,
      name: file.name,
      receiptImageUrl: publicURL,
    });
  
    if (insertError) {
      throw insertError;
    }
  
    return publicURL;
  }
  const handleUpload = async () => {
    if (!file || !user) return;

    setLoading(true);
    try {
      await uploadImage(file, userId);
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMsg("Failed to upload image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const user = useUser();
  const { userId } = useAuth();
  console.log(
    "userId is:",
    userId,
    "user is: ",
    user,
    "your email address is: ",
    user.user?.emailAddresses[0].emailAddress
  );

  // const compareUserId = async () => {
  //   let { data: expenses, error } = await supabase
  //     .from("expenses")
  //     .select("*")
  //     .eq("user_id", userId);
  //   console.log(userId);
  // };
  const Hello = () => {
    // compareUserId();
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
      return null;
    }
    console.log(user.id, "I AM THAT USER");
    return <div className="hello">Hello, {userId}.</div>;
  };
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading &&
        expenses.length > 0 &&
        !errorMsg &&
        expenses.map((expense) => <p key={expense.id}>{expense.name}{expense.receiptImageUrl && <img src={expense.receiptImageUrl} alt={expense.name} />}</p>)}
      {!loading && errorMsg && <p>{errorMsg}</p>}

      {/* <AddExpenseForm client={client} onExpenseAdded={loadExpenses} /> */}
      <input
        autoFocus
        accept={accept}
        type="file"
        name="name"
        placeholder="Enter new expense"
        onChange={(e) => handleFileChange(e)}
        
      />
      <button type="submit" onClick={(e) => handleUpload()}>
        Upload
      </button>
      {/* <Hello /> */}
    </div>
  );
};
