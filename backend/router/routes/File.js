import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import multer from "multer";
import fs from "fs";

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);

const fileRouter = Router();

/**
 * @description: set storage: default /uploads
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

/**
 * @description: list files
 */
fileRouter.get("/", async (req, res) => {
  try {
    const openai = new OpenAIApi(configuration);
    const result = await openai.listFiles();
    const { data } = result;
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

/**
 * @description: upload file
 */
fileRouter.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const path = file.path;
    // Handle upload to openAi - file.jsonl
    const response = await openai.createFile(
      fs.createReadStream(path),
      "fine-tune"
    );
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

/**
 * @description: retrieve file
 * @param: file_id
 */
fileRouter.get("/:file_id", async (req, res) => {
  try {
    const response = await openai.retrieveFile(req.params.file_id);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

/**
 * @description: retrieve file content
 * @param: file_id
 */
fileRouter.get("/:file_id/content", async (req, res) => {
  try {
    const response = await openai.downloadFile(req.params.file_id);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

/**
 * @description: delete file
 * @param: file_id
 */
fileRouter.delete("/:file_id", async (req, res) => {
  try {
    const response = await openai.deleteFile(req.params.file_id);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

export default fileRouter;
