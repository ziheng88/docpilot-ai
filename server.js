import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import chat from "./chat.js";


dotenv.config();
const app = express();
app.use(cors());


let filePath;


//init multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let fileName = `${Date.now()}_${file.originalname}`;
    filePath = `./uploads/${fileName}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });


app.get("/test", (req, res) => {
  console.log("request", req);
  res.send(process.env.REACT_APP_OPENAI_API_KEY);
});


app.post("/upload", upload.single("file"), (req, res) => {
  res.send(filePath + " upload successfully");
});


app.get("/chat", async (req, res) => {
  const resp = await chat(filePath, req.query.question);
  res.send(resp.text);
});


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
