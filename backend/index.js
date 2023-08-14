import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

// const multer = require("multer");
const app = express();
const port = 2000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);

// SET STORAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });

app.post("/", async (req, res) => {
  const { chats } = req.body;
  console.log(chats);
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      // {
      //   role: "system",
      //   content: "Hi, Chào cậu!",
      // },
      ...chats,
    ],
  });

  res.json({
    output: result.data.choices[0].message,
  });
});

// -----

app
  .route("/files")
  .get(async (req, res) => {
    const openai = new OpenAIApi(configuration);
    const result = await openai.listFiles();
    const { data } = result;
    res.json(data);
  })
  // .post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  //   const file = req.file;
  //   if (!file) {
  //     const error = new Error("Please upload a file");
  //     error.httpStatusCode = 400;
  //     return next(error);
  //   }
  //   res.send(file);
  // });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
