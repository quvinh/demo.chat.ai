import { Router } from "express";
import { body, validationResult } from "express-validator";
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
  try {
    const openai = new OpenAIApi(configuration);
    const result = await openai.listFineTunes();
    const { data } = result;
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

/**
 * @description: retrieve fine tunes
 * @param: fine_tune_id
 */
fineTuneRouter.get("/:fine_tune_id", async (req, res) => {
  try {
    const response = await openai.retrieveFineTune(req.params.fine_tune_id);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

/**
 * @description: create fine tunes
 * @param: training_file
 */
fineTuneRouter.post(
  "/",
  body(["training_file"]).notEmpty(),
  async (req, res) => {
    try {
      const validator = validationResult(req);
      if (validator.isEmpty()) {
        const response = await openai.createFineTune(req.body);
        res.json(response.data);
      } else {
        res.json({
          errors: validator.array(),
        });
      }
    } catch (error) {
      res.json(error);
    }
  }
);

/**
 * @description: cancel fine tunes
 * @param: fine_tune_id
 */
fineTuneRouter.post("/:fine_tune_id/cancel", async (req, res) => {
  try {
    const response = await openai.cancelFineTune(req.params.fine_tune_id);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

export default fineTuneRouter;
