type XlsModalProps = {
  title: string;
  description: string;
};

export const XlsModal = (props: XlsModalProps) => {
  const title = "Export document";
  const description =
    "Do you want to export the document for the selected month as XLS?";
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        // onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-ghost modal-export-cancel-btn">Cancel</button>
              <button className="btn modal-export-btn">Export the document</button>

            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
