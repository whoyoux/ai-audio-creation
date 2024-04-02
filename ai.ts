import chalk from "chalk";
import OpenAI from "openai";

const openai = new OpenAI();

export const generateText = async (topic: string, language = "english") => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are history facts writer. Write it like for 15 years old kid. Try to generate text for at least 1 minute to speek. Write it in ${language}. Add in the beginning small text about topic you are going to tell facts.`,
        },
        {
          role: "user",
          content: `Write me 5 facts about ${topic}. Only use real facts.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    if (!completion.choices[0].message.content)
      throw new Error("Error generating text.");

    return completion.choices[0].message.content;
  } catch (err) {
    console.error(chalk.bold.red(`Error with generating text! ${err}`));
  }
};

export const textToSpeech = async (text: string) => {
  try {
    const voice = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: text,
    });

    return voice;
  } catch (err) {
    console.error(chalk.bold.red(`Error with generating voice! Error: ${err}`));
  }
};
