import React, { ChangeEventHandler, useState } from "react";
import { analyzeReceipt } from "../actions/receipt"; // Ensure this path is correct

export const ReceiptAnalyzer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<{ expense: any } | null>(null);
  const [error, setError] = useState("");

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
    try {
      if (image) {
        const analysis = await analyzeReceipt(image);
        setResult(analysis);
      }
    } catch (error) {
      setError("Failed to analyze receipt");
    }
  };

  return (
    <div>
      <h1>Receipt Analyzer</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleAnalyzeReceipt}>Analyze Receipt</button>
      {error && <p>{error}</p>}
      {result && result.expense && (
        <div>
          <h2>Analysis Result</h2>
          <form>
            <label>
              Store:
              <input type="text" value={result.expense.store} />
            </label>
            <br />
            <label>
              Expense:
              <input type="text" value={result.expense.expense} />
            </label>
            <br />
            <label>
              Amount:
              <input type="text" value={result.expense.amount} />
            </label>
            <br />
            <label>
              Category:
              <input type="text" value={result.expense.expense_category} />
            </label>
            <br />
            <label>
              Date:
              <input type="text" value={result.expense.date} />
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReceiptAnalyzer;
