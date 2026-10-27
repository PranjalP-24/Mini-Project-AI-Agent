'use client'
import {useState} from "react";
import { generateTextAction } from "@/app/actions/aiActions";
import ReactMarkdown from "react-markdown";

export default function Home() {

  const[prompt, setPrompt] = useState<string>("");

  //jo response aaya hai usko UI me dikhana bhi hoga toh uske liye--
  //uske liye ek aur state variable create karenge -- const[output, setOutput]
  const[output, setOutput] = useState<string>("");

  const handleSendPrompt = async () =>{

    //we are passing our prompt to server action
    //aur jab ye prompt server action ke paas jayega then vo waha se humare model AI ke paas chala jayega
    //and AI uska ek response generate karke dega 
    //and jo bhi response vo generate karke dega usse yahi pe return mil jayega
    const response = await generateTextAction(prompt);

    //jo bhi response aaya hoga usko yaha pe kar denge set
    setOutput(response);
  }

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between overflow-auto py-6 px-24 pb-36">
 
      {
        output && (
          <div>
            <h1 className="text-2xl font-bold mb-4">AI Response: </h1>
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        )
      }

      <div className="input-area fixed bottom-6 px-24 py-2 overflow-auto flex items-center justify-between w-full">
        <input
          className="border p-2 rounded-md w-[80%] outline-none"
          placeholder="Type your message here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></input>
        <button
        onClick={handleSendPrompt}
        className="bg-neutral-700 text-white p-2 cursor-pointer active:scale-90 rounded-md ml-4 w-[18%]"
        >Send</button>
      </div>

    </main>
  );
}