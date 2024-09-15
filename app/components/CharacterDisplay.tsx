'use client'

import { useEffect, useState } from 'react'
 
import styles from "./chat.module.css";
import { AssistantStream } from 'openai/lib/AssistantStream';
interface Character {
  name: string
  description: string
  personality: string
}

interface ApiResult {
  id: number
  info: string
}

export default function CharacterDisplay() {
  const [characters, setCharacters] = useState<Character[]>([
    
  ])
  const [apiResults, setApiResults] = useState<ApiResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState("");
  const [message, setMessage] = useState("");
  const handleExtract = async () => {
    setIsLoading(true)
    try {
         sendMessage();
     
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

    // create a new threadID when chat component created
    useEffect(() => {
        const createThread = async () => {
          const res = await fetch(`/api/assistants/threads`, {
            method: "POST",
          });
          const data = await res.json();
          setThreadId(data.threadId);
        };
        createThread();
      }, []);

      const sendMessage = async ( ) => {
        let message=`Please provide a detailed list of characters from the book. For each character, include the following information:
                      Name: The full name of the character.
                      Description: A brief physical description of the character, including any notable features, clothing style, or other distinguishing characteristics.
                      Personality: An overview of the character's personality traits, including their motivations, moral alignment, strengths, weaknesses, and relationships with other characters.
                      Make sure to format each character's information clearly, using bullet points or a structured format for easy readability.
                      format the output as json array in camel case
                      and the personality as string
                      the output should json array only
                      `
        const response = await fetch(
          `/api/assistants/threads/${threadId}/messages`,
          {
            method: "POST",
            body: JSON.stringify({
              content: message,
            }),
          }
        );
        console.log(response.body);
        debugger;
        const stream = AssistantStream.fromReadableStream(response.body);
        handleReadableStream(stream);
      };
      const handleReadableStream = (stream: AssistantStream) => {
        stream.on("textCreated", handleTextCreated);
        stream.on("textDelta", handleTextDelta);
        stream.on("event", (event) => {
          
          if (event.event === "thread.run.completed") handleRunCompleted(stream);
        });
      };
      const handleRunCompleted = (stream: AssistantStream) => {
        setTimeout(()=>{
          debugger;
          var jsonObj=validateJson(con);

          setCharacters(jsonObj||[]);
          setIsLoading(false);
        },100)
        
      };
  // textCreated - create new assistant message
  const handleTextCreated = () => {
    setMessage("");
  };
 var con="";
  // textDelta - append text to last assistant message
  const handleTextDelta = (delta) => {
    if (delta.value != null) {
      con=con+delta.value;
      setMessage(con);
    };
    if (delta.annotations != null) {
     // annotateLastMessage(delta.annotations);
    }
  };  
  
  function validateJson(input) {
    try {
      
      input=input.replaceAll('json','').replaceAll('```','').trim(' ');
       console.log(input);
       debugger;
        const parsedData = JSON.parse(input);

        if (!Array.isArray(parsedData)) {
          
            throw new Error("Invalid format: expected an array.");
        }

 

        console.log("Valid JSON object:", parsedData);
        return parsedData;

    } catch (error) {
        console.error("Validation error:", error.message);
        return null;
    }
}

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Story Characters</h1>
      
      <table className="min-w-full bg-white border border-gray-300 characters-table ">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Character Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Personality</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{character.name}</td>
              <td className="py-2 px-4 border-b">{character.description}</td>
              <td className="py-2 px-4 border-b">{character.personality}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>

      </div>
      <button
          type="submit"
          className={styles.button}
          onClick={handleExtract}
           disabled={isLoading}
        >
         {isLoading ? 'Extracting...' : 'Extract'}
        </button>
     
          
     <style>
      {
        
        `
        .story-characters-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.story-characters-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.characters-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.characters-table th,
.characters-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.characters-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.characters-table tr:nth-child(even) {
  background-color: #f8f8f8;
}

.characters-table tr:hover {
  background-color: #e8e8e8;
}

.extract-button {
  padding: 0.5rem 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.extract-button:hover {
  background-color: #0051a2;
}

.extract-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.extracted-info-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
        `
      }
     </style>
    </div>
  )
}