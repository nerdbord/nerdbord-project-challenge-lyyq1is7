"use client";
import React, { ChangeEventHandler, useState } from "react";
import { analyzeReceipt, saveReceipt } from "../actions/receipt";
import "./styles.css";

export const ReceiptAnalyzer = ({
  onAddExpense,
}: {
  onAddExpense: () => void;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<{ expense: any } | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedExpense, setEditedExpense] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeReceipt = async () => {
    setLoading(true);
    setMsg("");
    try {
      if (image) {
        const analysis = await analyzeReceipt(image);
        setResult(analysis);
        setEditedExpense(analysis.expense); // Initialize editedExpense with the analysis result
      }
    } catch (error) {
      setMsg(
        "Photo unable to be analyzed - take another picture or add manually"
      );
    }
    setLoading(false);
  };

  const handleSaveExpense = async () => {
    if (editedExpense) {
      try {
        await saveReceipt({ ...editedExpense, image });
        setMsg("Expense saved successfully");
        onAddExpense();
        setIsEditing(false); // Exit editing mode
      } catch (error) {
        setMsg("Failed to save expense");
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (result) {
      setEditedExpense(result.expense); // Reset editedExpense to original analysis result
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedExpense({
      ...editedExpense,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Receipt Analyzer</h1>
      {image && <img src={image} alt="Receipt" />}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleAnalyzeReceipt} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Receipt"}
      </button>

      {msg && <p>{msg}</p>}

      {editedExpense && (
        <div>
          <h2>Analysis Result</h2>
          <form>
            <label>
              Store:
              <input
                type="text"
                name="store"
                value={editedExpense.store}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
            <br />
            <label>
              Items bought:
              <input
                type="text"
                name="items"
                value={editedExpense.items}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
            <br />
            <label>
              Total:
              <input
                type="text"
                name="total"
                value={editedExpense.total}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={editedExpense.category}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
            <br />
            <label>
              Date:
              <input
                type="text"
                name="date"
                value={editedExpense.date}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
          </form>
          {isEditing ? (
            <div>
              <button onClick={handleSaveExpense}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleSaveExpense}>Save</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReceiptAnalyzer;
