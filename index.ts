import chalk from "chalk";
import { generateText, textToSpeech } from "./ai";

const log = console.log;

import OpenAI from "openai";

const openai = new OpenAI();

const TOPIC = "usa history";

const main = async () => {
  log(chalk.bold("Started generating..."));

  const filename = `ai_${TOPIC.replaceAll(" ", "-")}_${Math.floor(
    Math.random() * 100
  )}`;

  try {
    const startTime = Date.now();

    const generatedText = await generateText(TOPIC);
    if (!generatedText) {
      log(chalk.bold.red("Did not get generated text."));
      return;
    }

    log(chalk.bold("Generating speech from text."));

    const generatedVoice = await textToSpeech(generatedText);
    if (!generatedVoice)
      throw new Error("Could not generate voice from text. Abort.");

    log(chalk.bold("Saving files..."));
    await Bun.write(
      `./generated/${filename}/${filename}.mp3`,
      await generatedVoice.arrayBuffer()
    );
    await Bun.write(`./generated/${filename}/${filename}.txt`, generatedText);

    const endTime = Date.now();
    const totalTime = endTime - startTime;
    log(
      chalk.bold(
        `Generated video about ${TOPIC} and saved in /generated/${filename}. It tooks ${new Date(
          totalTime
        ).getSeconds()} seconds.`
      )
    );
  } catch (err) {
    console.error(`Some error occupied. ${err}`);
  }
};

await main();
