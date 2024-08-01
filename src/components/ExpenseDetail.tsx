"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchExpenseById,
  updateExpense,
  deleteExpense,
} from "@/actions/receipt";

export const ExpenseDetail = ({ params }: { params?: { id: string } }) => {
  const router = useRouter();
  const [expense, setExpense] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    store: "",
    total: "",
    date: "",
    items: "",
    category: "",
  });

  const id = params?.id;

  async function fetcher(id: string) {
    try {
      const expenses = await fetchExpenseById(id);
      return expenses;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (id) {
      fetchExpenseById(id)
        .then((data: any) => {
          setExpense(data);
          setFormData({
            store: data.store,
            total: data.total,
            date: data.date,
            items: data.items,
            category: data.category,
          });
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

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (id) {
      try {
        await updateExpense(id, formData);
        setExpense({ ...expense, ...formData });
        setEditing(false);
      } catch (error) {
        console.error("Failed to update expense:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteExpense(id);
        router.push("/"); // Redirect to the main page after deletion
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!expense) return <div>No expense found</div>;

  return (
    <div>
      <h1>Expense Details</h1>
      {editing ? (
        <div>
          EDIT RECEIPT
          <form>
            <label>
              Store:
              <input
                type="text"
                name="store"
                value={formData.store}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Total:
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Date:
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Items:
              <input
                type="text"
                name="items"
                value={formData.items}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </label>
            <br />
            <img src={expense.image} alt="Receipt" />
            <br />
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleEditToggle}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Store:{expense.store}</p>
          <p>Total:{expense.total}</p>
          <p>Date:{expense.date}</p>
          <p>Items: {expense.items}</p>
          <p>Category:{expense.category}</p>
          {expense.image && <img src={expense.image} alt="Receipt" />}
          <br />
          <button onClick={handleEditToggle}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetail;
