import { useState } from "react";

interface AddExpenseFormProps {
  client: any;
  onExpenseAdded: () => void;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  client,
  onExpenseAdded,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle creating a new expense
  async function createExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await client.from("expenses").insert({
        name,
      });

      setName("");
      setErrorMsg(null);
      onExpenseAdded();
    } catch (error) {
      setErrorMsg("Failed to create expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={createExpense}>
      <input
        autoFocus
        type="text"
        name="name"
        placeholder="Enter new expense"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button type="submit" disabled={loading}>
        Add
      </button>
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
};
