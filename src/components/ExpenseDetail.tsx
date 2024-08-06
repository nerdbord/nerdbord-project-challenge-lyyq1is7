"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchExpenseById,
  updateExpense,
  deleteExpense,
} from "@/actions/receipt";
import { Loader } from "./Loader";
import { CATEGORIES_LIB } from "@/lib/categories";
import Image from "next/image";
import Pug from "@/assets/pug.png";
import { GoBackBtn } from "./GoBackBtn";

const CATEGORIES = CATEGORIES_LIB;

export const ExpenseDetail = ({ params }: { params?: { id: string } }) => {
  const router = useRouter();
  const [expense, setExpense] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    store: "",
    total: "",
    date: "",
    items: "",
    category: "",
  });

  const id = params?.id;

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
        })
        .catch((error: any) => {
          console.error("Failed to load expense:", error);
        });
    } else {
      console.error("ID is undefined");
    }
  }, [id]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
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

  const handleGoBack = () => {
    router.push("/");
  };

  if (loading) return <Loader />;
  if (!expense) return <Loader />;

  const receiptImage = expense.image || Pug;

  return (
    <div className="h-full mx-auto space-y-4 bg-purple-50 pt-20">
      <div
        onClick={handleGoBack}
        className="flex items-center justify-start px-4 text-purple-900"
      >
        <GoBackBtn />
        Back to Expenses
      </div>
      <div className="relative w-full h-52">
        <Image
          src={receiptImage}
          alt="Receipt Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-4 space-y-8">
        {editing ? (
          <div>
            <form>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex gap-4 items-center w-full max-w-md">
                  <div className="flex gap-4 flex-col items-start flex-grow">
                    <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                      Store:
                    </label>
                    <input
                      type="text"
                      name="store"
                      value={formData.store}
                      onChange={handleChange}
                      className="border rounded-md w-full p-2 bg-white"
                    />
                  </div>
                  <div className="flex gap-4 flex-col items-start flex-grow">
                    <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                      Date:
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="border rounded-md w-full p-2 bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 flex-col items-start">
                  <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                    Total:
                  </label>
                  <div className="flex gap-4 items-start w-full max-w-md">
                    <input
                      type="text"
                      name="total"
                      value={formData.total}
                      onChange={handleChange}
                      className="border w-28 rounded-md p-2 bg-white"
                    />
                    <input
                      type="text"
                      name="currency"
                      value={expense.currency}
                      className="border rounded-md w-28 p-2 bg-custom"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 flex-col items-start flex-grow">
                <label className="w-full font-semibold text-start text-xl not-italic leading-7 text-gray-900">
                  Category:
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleSelectChange}
                  className="border rounded-md w-full p-2 bg-purple-50"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="flex items-center w-full justify-evenly pt-2 pt-2 pt-5 pb-10">
                <button
                  className="rounded-full w-32 px-8 py-4 border border-purple-900 text-purple-900 flex items-center justify-center"
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="rounded-full w-32 px-8 py-4 border border-purple-900 bg-purple-900 text-white flex items-center justify-center"
                  type="button"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-8 space-y-4">
              <div className="flex gap-4 items-center w-full max-w-md">
                <div className="flex gap-2 flex-col items-start flex-grow">
                  <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                    Store:
                  </label>
                  <p className="w-full  text-start text-xl not-italic leading-7">
                    {expense.store}
                  </p>
                </div>
                <div className="flex gap-2 flex-col items-start flex-grow">
                  <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                    Date:
                  </label>
                  <p className="w-full  text-start text-xl not-italic leading-7">
                    {expense.date}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 flex-col items-start">
                <label className="w-full font-semibold text-start text-xl not-italic font-semibold leading-7 text-gray-900">
                  Total:
                </label>
                <p className="w-full  text-start text-xl not-italic leading-7">
                  {expense.total} {expense.currency}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-col items-start flex-grow">
              <label className="w-full font-semibold text-start text-xl not-italic leading-7 text-gray-900">
                Category:
              </label>
              <p className="w-full  text-start text-xl not-italic leading-7">
                {expense.category}
              </p>
            </div>
            <br />

            <div className="flex items-center w-full justify-evenly pt-2 pt-2 pt-5 pb-10">
              <button
                className="rounded-full w-32 px-8 py-4 border border-purple-900 text-purple-900 flex items-center justify-center"
                onClick={handleEditToggle}
              >
                Edit
              </button>
              <button
                className="rounded-full w-32 px-8 py-4 border border-purple-900 bg-purple-900 text-white flex items-center justify-center"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetail;
