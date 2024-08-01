import React, { ChangeEventHandler, useState } from "react";
import { analyzeReceipt, saveReceipt } from "../actions/receipt"; // Upewnij się, że ścieżka jest poprawna
import { useSession } from "@clerk/nextjs";
import "./styles.css";

export const ReceiptAnalyzer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<{ expense: any } | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

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
      }
    } catch (error) {
      setMsg("Failed to analyze receipt");
    }
    setLoading(false);
  };

  const handleSaveExpense = async () => {
    if (result && result.expense) {
      try {
        await saveReceipt({ ...result.expense, image });
        setMsg("Expense saved successfully");
      } catch (error) {
        setMsg("Failed to save expense");
      }
    }
  };

  return (
    <div>
      <h1>Receipt Analyzer</h1>
      {image && <img src={image} alt="Receipt" />}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleAnalyzeReceipt}>Analyze Receipt</button>

      {loading && <p>Analyzing...</p>}
      {msg && <p>{msg}</p>}

      {result && result.expense && (
        <div>
          <h2>Analysis Result</h2>
          <form>
            <label>
              Store:
              <input type="text" value={result.expense.store} readOnly />
            </label>
            <br />
            <label>
              Items bought:
              <input type="text" value={result.expense.items} readOnly />
            </label>
            <br />
            <label>
              Total:
              <input type="text" value={result.expense.total} readOnly />
            </label>
            <br />
            <label>
              Category:
              <input type="text" value={result.expense.category} readOnly />
            </label>
            <br />
            <label>
              Date:
              <input type="text" value={result.expense.date} readOnly />
            </label>
          </form>
          <button onClick={handleSaveExpense}>Save Expense</button>
        </div>
      )}
    </div>
  );
};

export default ReceiptAnalyzer;
