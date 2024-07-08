import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const PostsComponent = () => {
  const [TitleTxt, titleAddFun] = useState("");
  const [CheckboxTxt, checkboxAddFun] = useState("");

  const didSubmit = async (e) => {
    e.preventDefault();

    const ArrObjStructure = {
      id: uuid(),
      title: TitleTxt,
      checkbox: CheckboxTxt,
    };

    const fetchSecArg = {
      method: "POST",
      body: JSON.stringify(ArrObjStructure),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const fetchObj = await fetch(
        "http://localhost:8000/addnote",
        fetchSecArg
      );
      const jsonConverted = await fetchObj.json();
      toast.success("Note added successfully, please do Refresh !");

      console.log(jsonConverted);
    } catch (err) {
      console.log("got error while adding new data", err.message);
    }
  };

  return (
    <div className="MainContainer">
      <ToastContainer />
      <div className="formDiv">
        <form onSubmit={didSubmit}>
          <input
            type="text"
            placeholder="Enter your Title"
            value={TitleTxt}
            onChange={(e) => {
              titleAddFun(e.target.value);
            }}
          />
          <br />
          <textarea
            name="note"
            rows="10"
            cols="50"
            placeholder="Write your note here..."
            value={CheckboxTxt}
            onChange={(e) => {
              checkboxAddFun(e.target.value);
            }}
          ></textarea>
          <br />
          <div className="btnDiv">
            <button type="submit">Add Note</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostsComponent;
