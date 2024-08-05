"use client";
import { generateReport } from "@/actions/receipt";
import { useRef, useState } from "react";

type Expense = {
  date: string;
  store: string;
  items: string;
  total: number;
  currency: string;
  category: string;
  id: string;
  image: string;
  createdAt: Date;
  userId: string;
};

type XlsModalProps = {
  title: string;
  description: string;
  expenses: Expense[];
  startDate: string;
  endDate: string;
};

export const XlsModal = ({
  title,
  description,
  expenses,
  startDate,
  endDate,
}: XlsModalProps) => {
  const myExportModal = useRef<HTMLDialogElement>(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null)
  // const title = "Export document";
  // const description =
  //   "Do you want to export the document for the selected month as XLS?";

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try{
      await generateReport(expenses, startDate, endDate);
      myExportModal.current?.close()
    } catch (error) {
      console.error("Error generating report:", error);
      setError("Failed to generate report. Please try again later.");
    } finally {
      setLoading(false)
    }
    
  };
  return (
    <div className="modal-width">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => myExportModal.current?.showModal()}
      >
        open xls modal
      </button>
      <dialog
        id="my_modal_5"
        ref={myExportModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box modal-width">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => myExportModal.current?.close()}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg export-modal-title">{title}</h3>
          <p className="py-4 export-modal-description">{description}</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-ghost modal-export-cancel-btn"
                onClick={() => myExportModal.current?.close()}
              >
                Cancel
              </button>
              <button className="btn modal-export-btn" onClick={handleExport} disabled={loading}>
                {loading ? "Exporting" : "Export document"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
