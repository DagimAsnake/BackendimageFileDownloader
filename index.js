const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");
const Image = require("./model/Image");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1/imageDownloader")
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((err) => {
    console.log("ERROR WHILE CONNECTING TO DATABASE");
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/reportFiles", express.static(path.join(__dirname, "reportFiles")));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(
  cors({
    origin: "*",
  })
);

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "reportFiles");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getMonth() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const additional_file = upload.single("file");

app.post("/img", additional_file, async (req, res) => {
  const data = req.file;
  // const firstName = req.body.name;
  console.log(data);
  const newImg = new Image({
    path: data.path,
    name: data.filename,
    // firstName: firstName,
  });
  await newImg.save();
  res.send("Sent");
});
app.get("/img", async function (req, res) {
  const data = await Image.find();
  return res.json({
    msg: data,
  });
});

app.listen(5000, () => {
  console.log("LISTENING TO PORT 5000");
});
