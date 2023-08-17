import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);

const completionRouter = Router();

/**
 * @description: list files
 * @param: model
 * @param: prompt
 */
completionRouter.post(
  "/",
  body(["model", "prompt"]).notEmpty(),
  async (req, res) => {
    try {
      const validator = validationResult(req);
      if (validator.isEmpty()) {
        const result = await openai.createCompletion({
          model: req.body.model,
          prompt: req.body.prompt,
        });

        res.json(result.data);
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

export default completionRouter;
