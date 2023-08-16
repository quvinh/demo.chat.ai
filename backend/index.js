import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import "dotenv/config";
import { chatRouter, fileRouter, fineTuneRouter } from "./router";

const app = express();
const port = 2000;
app.use(bodyParser.json());
app.use(cors());

/**
 * @description: setup routes
 */
app.use("/chat", chatRouter);
app.use("/files", fileRouter);
app.use("/fine-tunes", fineTuneRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
