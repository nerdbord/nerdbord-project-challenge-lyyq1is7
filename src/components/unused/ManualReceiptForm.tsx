import React, { useState } from "react";
import { saveReceipt } from "@/actions/receipt";
import { useSession } from "@clerk/nextjs";

export const ManualReceiptForm = () => {
  const [expense, setExpense] = useState({
    store: "",
    items: "",
    total: "",
    category: "",
    date: "",
  });
  const [msg, setMsg] = useState("");

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSaveExpense = async () => {
    try {
      await saveReceipt(expense);
      setMsg("Expense saved successfully");
    } catch (error) {
      setMsg("Failed to save expense");
    }
  };

  return (
    <div>
      <h1>Manual Receipt Form</h1>
      <form>
        <label>
          Store:
          <input
            type="text"
            name="store"
            value={expense.store}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Items bought:
          <input
            type="text"
            name="items"
            value={expense.items}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Total:
          <input
            type="text"
            name="total"
            value={expense.total}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={expense.category}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={expense.date}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <button onClick={handleSaveExpense}>Save Expense</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ManualReceiptForm;
