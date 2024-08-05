"use client";
import { useRef } from "react";

type XlsModalProps = {
  title: string;
  description: string;
};

export const XlsModal = (props: XlsModalProps) => {
  const myExportModal = useRef<HTMLDialogElement>(null);
  const title = "Export document";
  const description =
    "Do you want to export the document for the selected month as XLS?";
  return (
    <div>
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
        <div className="modal-box">
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
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-ghost modal-export-cancel-btn"
                onClick={() => myExportModal.current?.close()}
              >
                Cancel
              </button>
              <button className="btn modal-export-btn">Export document</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
