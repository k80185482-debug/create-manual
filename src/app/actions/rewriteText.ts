"use server"

import OpenAI from "openai";

const openai = new OpenAI({ apiKey:process.env.NEXT_PUBLIC_OPENAI_KEY});

export async function rewriteText(ManualText: string) {
  const response =await openai.chat.completions.create({
    model:"gpt-5-mini",
    messages:[
      {
        role:'system',
        content:"あなたは日本語校正者です。誤字脱字、不自然もしくは曖昧な表現を修正してください。",
      },
      {
        role:'user',
        content: ManualText,
      },
    ],   
  });
  const text = response.choices[0].message.content
  return text ?? ""
}