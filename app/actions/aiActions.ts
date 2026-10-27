"use server"
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    //JO BHI cheez you don't want to keep in the code we write in the .env file
    //we are keeping all our secrets in the .env file jo ki internet pe bilkul bhi available nhi hone chahiye
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
})


export async function generateTextAction(prompt:string): Promise<string>{

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt,
    });

    return interaction.output_text ||"No output generated";
}