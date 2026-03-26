import {NextResponse,NextRequest} from 'next/server';
import {OpenAI} from 'openai';

type openaiTypes = {
  model: string;
  system: string;
  prompt:string
}

const openai = new OpenAI({ apiKey:process.env.NEXT_PUBLIC_OPENAI_KEY});

export async function POST(req:NextRequest){
  const {model,system,prompt}=(await req.json()) as openaiTypes;
  const response=await openai.chat.completions.create({
    model:model,
    messages:[
      {
        role:'system',
        content:system,
      },
      {
        role:'user',
        content:prompt,
      },
    ],   
  });
  
  return NextResponse.json(response);
}