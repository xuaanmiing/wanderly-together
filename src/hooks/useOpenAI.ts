
import { useState } from 'react';
import { toast } from "sonner";

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
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an expert travel assistant. You help users plan trips, recommend destinations, 
              provide travel tips, suggest itineraries, and answer questions about travel costs, logistics, 
              and local attractions. Be concise, friendly, and helpful.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("OpenAI API error:", error);
        
        if (response.status === 401) {
          localStorage.removeItem('openai_api_key');
          setApiKey(null);
          throw new Error("Invalid API key. Please try again with a valid key.");
        }
        
        throw new Error(error.error?.message || "Failed to get response from OpenAI");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error: any) {
      console.error("Error generating response:", error);
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
