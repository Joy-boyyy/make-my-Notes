const express = require("express");
const ErrorMiddle = require("./errorHandlingMiddleware/ErrorMiddleware");
const cors = require("cors");
require("dotenv").config();
const CustomError = require("./errorHandlingMiddleware/CustomErrHandle");

const Note = require("./Model/NotesModel");

const app = express();
app.use(cors());

app.use(express.json());

const portNum = process.env.PORT || 5000;

app.post("/addnote", async (req, res, next) => {
  const { id, title, checkbox } = req.body;
  console.log("checking data is receiving or not=> ", req.body);

  if (!id || !title || !checkbox) {
    return next(new CustomError("All fields are required", 400));
  }

  try {
    const noteObj = new Note({ _id: id, title: title, content: checkbox });
    await noteObj.save();

    console.log("note added successfully");
    res.status(200).json({ message: "note added successfully" });
  } catch (err) {
    console.log("found error while inserting into Data Db", err.message);
    next(err);
  }
});

app.get("/getnotes", async (req, res, next) => {
  const noteRes = await Note.find({});
  console.log(noteRes);
  res.json(noteRes);
});

app.delete("/delete", async (req, res, next) => {
  // const {id}=req.body
  try {
    const remoVed = await Note.deleteOne({ _id: req.body.id });
    res.status(200).send(remoVed);
  } catch (err) {
    next(err);
  }
});

app.put("/update", async (req, res, next) => {
  const { id, title, note } = req.body;

  try {
    const updateRes = await Note.updateOne(
      { _id: id },
      { $set: { title: title, content: note } }
    );
    console.log(updateRes);
    res.status(200).send(updateRes);
  } catch (err) {
    next(err);
  }
});

app.use(ErrorMiddle);

app.listen(portNum, () => {
  console.log(`we are in server and port number is ${portNum}`);
});
