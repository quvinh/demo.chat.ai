import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 2000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);


app.post("/", async (req, res) => {
  const { chats } = req.body;
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
 
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
