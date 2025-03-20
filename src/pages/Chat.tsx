
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useOpenAI } from "@/hooks/useOpenAI";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your AI travel assistant. How can I help you plan your next adventure?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse, isLoading } = useOpenAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const newUserMessage = { id: messages.length + 1, text: inputValue, isUser: true };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    
    try {
      // Get AI response using our custom hook
      const response = await generateResponse(inputValue);
      
      const newAIMessage = { 
        id: messages.length + 2, 
        text: response, 
        isUser: false 
      };
      
      setMessages(prev => [...prev, newAIMessage]);
    } catch (error) {
      toast.error("Sorry, I couldn't connect to the AI. Please try again.");
      console.error("Error getting AI response:", error);
    }
  };

  return (
    <div className="container px-4 py-6 flex flex-col h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Travel Assistant</h1>
      
      <Card className="flex-1 mb-4 overflow-hidden">
        <CardContent className="p-4 h-full overflow-y-auto flex flex-col space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`max-w-[80%] ${message.isUser ? 'ml-auto bg-primary text-primary-foreground' : 'mr-auto bg-muted'} rounded-lg p-3`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>
      
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          placeholder="Ask me about travel recommendations, itineraries, budgeting..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage} 
          className="p-2"
          disabled={isLoading || inputValue.trim() === ""}
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}

export default Chat;
