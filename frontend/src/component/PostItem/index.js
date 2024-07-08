import { useEffect, useState } from "react";

import "./index.css";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import BoxModel from "../Boxmodel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostItemComponent = () => {
  const [fetchedArrObj, arrObjFetchFun] = useState([]);

  const [noArrDataMsg, noArrDataMsgFun] = useState(false);
  const [oldData, OldDataFun] = useState({
    oldTitle: "",
    oldDesc: "",
    id: 0,
    isTrue: false,
  });

  console.log("CHecking changing or not=> ", oldData.isTrue);

  useEffect(() => {
    const DataFetchFun = async () => {
      try {
        const fetchData = await fetch("http://localhost:8000/getnotes");
        const data = await fetchData.json();
        console.log(data);
        if (data.length < 1) {
          noArrDataMsgFun(true);
        } else {
          noArrDataMsgFun(false);
          const arrObjFiltering = data.map((mapProp) => ({
            id: mapProp._id,
            title: mapProp.title,
            description: mapProp.content,
          }));

          arrObjFetchFun(arrObjFiltering);
        }
      } catch (err) {
        console.log("Error got while fetching data", err.message);
      }
    };
    DataFetchFun();
  }, []);

  // delete functionality

  const doDelete = async (ID) => {
    const idDel = { id: ID };

    const fetchSecArg = {
      method: "DELETE",
      body: JSON.stringify(idDel),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const delFetch = await fetch("http://localhost:8000/delete", fetchSecArg);
      const jsonDel = await delFetch.json();
      toast.success("Deleted !");
      console.log("deleted", jsonDel);
    } catch (err) {
      console.log(err.message);
    }

    // dynamically updating deleted data

    arrObjFetchFun((prevData) =>
      prevData.filter((filterPrev) => filterPrev.id !== ID)
    );
  };

  const editBtnFun = (Ids, myTitle, myDesc) => {
    OldDataFun({
      oldTitle: myTitle,
      oldDesc: myDesc,
      id: Ids,
      isTrue: true,
    });
  };

  // --------------------------------------update functionality

  const newFormDataFun = async (formNoteNew) => {
    const dataSec = {
      id: formNoteNew.id,
      title: formNoteNew.title,
      note: formNoteNew.note,
    };

    console.log("data receive from backend updated value=> ", formNoteNew);
    console.log("modified updated value=> ", dataSec);

    const fetchSecArg = {
      method: "PUT",
      body: JSON.stringify(dataSec),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const updateRes = await fetch(
        "http://localhost:8000/update",
        fetchSecArg
      );
      const jsonUpdate = await updateRes.json();
      toast.success("Updated !, Please do Refresh");
      console.log("Successfully updated=>", jsonUpdate);
    } catch (err) {
      console.log("got error while updating", err.message);
    }

    arrObjFetchFun((prevData) =>
      prevData.map((mapProp) =>
        mapProp.id === formNoteNew.id
          ? {
              ...mapProp,
              title: formNoteNew.title,
              description: formNoteNew.note,
            }
          : mapProp
      )
    );
  };

  return (
    <div className="postItem">
      <ToastContainer />
      {noArrDataMsg && <h1>No any data present please Fill some</h1>}
      {oldData.isTrue && (
        <BoxModel
          oldFormData={oldData}
          newFormDataFun={newFormDataFun}
          onClose={() => {
            OldDataFun(() => ({ ...oldData, isTrue: false }));
          }}
        />
      )}
      <div className="PostItemFlex">
        {fetchedArrObj.map((mapProp) => (
          <div key={mapProp.id} className="card">
            <h1>{mapProp.title}</h1>
            <p>{mapProp.description}</p>
            <div className="btns">
              <button
                type="button"
                className="PostItembtnAction"
                onClick={() => {
                  editBtnFun(mapProp.id, mapProp.title, mapProp.description);
                }}
              >
                <span>
                  <FaEdit size={20} />
                  Edit
                </span>
              </button>
              <button
                type="button"
                className="PostItembtnAction"
                onClick={() => {
                  doDelete(mapProp.id);
                }}
              >
                <span>
                  <MdDelete size={20} /> Delete{" "}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostItemComponent;
