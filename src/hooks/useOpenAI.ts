
import { useState } from 'react';
import { toast } from "sonner";
import OpenAI from "openai";

export interface OpenAIProps {
  apiKey?: string;
}

export function useOpenAI({ apiKey: initialApiKey }: OpenAIProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(
    initialApiKey || localStorage.getItem('openai_api_key')
  );

  const saveApiKey = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    toast.success("API key saved successfully!");
  };

  const generateResponse = async (prompt: string): Promise<string> => {
    if (!apiKey) {
      const key = window.prompt(
        "Please enter your OpenAI API key to continue. You can get one from https://platform.openai.com/api-keys"
      );
      
      if (!key) {
        return "I need an API key to function. Please provide your OpenAI API key to continue.";
      }
      
      saveApiKey(key);
    }
    
    setIsLoading(true);
    
    try {
      const client = new OpenAI({
        apiKey: apiKey || undefined,
        dangerouslyAllowBrowser: true // We need this flag to use OpenAI in the browser
      });
      
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert travel assistant. You help users plan trips, recommend destinations, 
            provide travel tips, suggest itineraries, and answer questions about travel costs, logistics, 
            and local attractions. Be concise, friendly, and helpful.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      return completion.choices[0].message.content || "I couldn't generate a response. Please try again.";
    } catch (error: any) {
      console.error("Error generating response:", error);
      
      if (error.status === 401) {
        localStorage.removeItem('openai_api_key');
        setApiKey(null);
        toast.error("Invalid API key. Please try again with a valid key.");
        throw new Error("Invalid API key. Please try again with a valid key.");
      }
      
      toast.error(error.message || "Failed to connect to OpenAI");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateResponse,
    isLoading,
    apiKey: !!apiKey,
    saveApiKey
  };
}
