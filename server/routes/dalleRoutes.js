import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data?.[0]?.b64_json;
    if (!image) {
      return res.status(500).json({
        error: "OpenAI did not return an image (maybe billing limit reached)",
      });
    }
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log("RAW ERROR:", error);
    return res.status(500).json({ error: String(error) });
  }
});

export default router;
