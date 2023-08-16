import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);

const fineTuneRouter = Router();

/**
 * @description: list fine tunes
 */
fineTuneRouter.get("/", async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const result = await openai.listFineTunes();
  const { data } = result;
  res.json(data);
});

/**
 * @description: retrieve fine tunes
 * @param: fine_tune_id
 */
fineTuneRouter.get("/:fine_tune_id", async (req, res) => {
  const response = await openai.retrieveFineTune(req.params.fine_tune_id);
  res.json(response.data);
});

/**
 * @description: create fine tunes
 * @param: training_file
 */
fineTuneRouter.post("/", async (req, res) => {
  const response = await openai.createFineTune(req.body);
  res.json(response.data);
});

/**
 * @description: cancel fine tunes
 * @param: fine_tune_id
 */
fineTuneRouter.post("/:fine_tune_id/cancel", async (req, res) => {
  const response = await openai.cancelFineTune(req.params.fine_tune_id);
  res.json(response.data);
});

export default fineTuneRouter;
