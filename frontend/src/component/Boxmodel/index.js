import { useState } from "react";
// import { IoMdClose } from "react-icons/io";
import "./index.css";

const BoxModel = ({ oldFormData, newFormDataFun, onClose }) => {
  const [formNoteNew, addNoteFun] = useState({
    title: oldFormData.oldTitle,
    note: oldFormData.oldDesc,
    id: oldFormData.id,
  });

  const doFormSubmit = (e) => {
    e.preventDefault();
    newFormDataFun(formNoteNew);
    onClose();
  };

  return (
    <div className="modelCss">
      <div className="closeBtnPare">
        <button type="button" className="closeBtn" onClick={onClose}>
          {/* <IoMdClose size={30} />  */}
          Close
        </button>
      </div>

      <div className="formDiv">
        <form onSubmit={doFormSubmit}>
          <input
            type="text"
            placeholder="Your Title"
            value={formNoteNew.title}
            onChange={(e) => {
              addNoteFun({ ...formNoteNew, title: e.target.value });
            }}
          />
          <input
            type="Text"
            placeholder="your Notes"
            value={formNoteNew.note}
            onChange={(e) => {
              addNoteFun({ ...formNoteNew, note: e.target.value });
            }}
          />
          <button type="submit" className="indertNewBtn">
            Insert New
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoxModel;
