"use client"

import { useRef } from "react";

type ErrorModalProps = {
    title: string;
    description: string;
}

export const ErrorModal = (props: ErrorModalProps) => {
  const myErrorModal = useRef<HTMLDialogElement>(null)
    const title = "The photo is too dark.";
    const description = "The photo is too dark, please try again on better light."
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={()=>myErrorModal.current?.showModal()}>open modal</button>
      <dialog id="my_modal_3" className="modal" ref={myErrorModal}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>myErrorModal.current?.close()}>
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg err-modal-title">{title}</h3>
          <p className="py-4 err-modal-description">{description}</p>
        </div>
      </dialog>
    </div>
  );
};


