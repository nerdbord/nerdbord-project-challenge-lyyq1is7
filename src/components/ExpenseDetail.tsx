"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchExpenseById } from "@/actions/receipt";

export const ExpenseDetail = ({ params }: { params?: { id: string } }) => {
  const router = useRouter();
  const [expense, setExpense] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Ensure params is defined and has an id
  const id = params?.id;

  useEffect(() => {
    if (id) {
      fetchExpenseById(id)
        .then((data: any) => {
          setExpense(data);
          setLoading(false);
        })
        .catch((error: any) => {
          console.error("Failed to load expense:", error);
          setLoading(false);
        });
    } else {
      console.error("ID is undefined");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!expense) return <div>No expense found</div>;

  return (
    <div>
      <h1>Expense Details</h1>
      <p>
        <strong>Store:</strong> {expense.store}
      </p>
      <p>
        <strong>Total:</strong> {expense.total}
      </p>
      <p>
        <strong>Date:</strong> {expense.date}
      </p>
      <p>
        <strong>Items:</strong> {expense.items}
      </p>
      <p>
        <strong>Category:</strong> {expense.category}
      </p>
      {expense.image && <img src={expense.image} alt="Receipt" />}
    </div>
  );
};

export default ExpenseDetail;
