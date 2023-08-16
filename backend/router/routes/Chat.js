import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);

const chatRouter = Router();

/**
 * @description: list files
 */
chatRouter.post("/", async (req, res) => {
  const { chats } = req.body;
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Hi, Chào cậu!",
      },
      ...chats,
    ],
  });

  res.json({
    output: result.data.choices[0].message,
  });
});

export default chatRouter;
