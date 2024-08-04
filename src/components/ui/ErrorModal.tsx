type ErrorModalProps = {
    title: string;
    description: string;
}

export const ErrorModal = (props: ErrorModalProps) => {
    const title = "The photo is too dark.";
    const description = "Description: The photo is too dark, please try again on better light."
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{description}</p>
        </div>
      </dialog>
    </div>
  );
};
