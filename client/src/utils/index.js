import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  //If the number generated is the same just runs again the function
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}
