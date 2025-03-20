
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your AI travel assistant. How can I help you plan your next adventure?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const newUserMessage = { id: messages.length + 1, text: inputValue, isUser: true };
    setMessages([...messages, newUserMessage]);
    setInputValue("");
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const responseText = getAIResponse(inputValue);
      const newAIMessage = { id: messages.length + 2, text: responseText, isUser: false };
      setMessages(prev => [...prev, newAIMessage]);
    }, 1000);
  };
  
  // Simple mock AI response function
  const getAIResponse = (userInput: string) => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes("recommendation") || userInputLower.includes("suggest")) {
      return "Based on your preferences, I recommend visiting Tokyo, Japan. It offers a unique blend of traditional culture and modern technology. The best time to visit is during cherry blossom season (late March to early April) or autumn (October to November).";
    } else if (userInputLower.includes("budget") || userInputLower.includes("cost")) {
      return "For a week-long trip to Europe, I recommend budgeting around $1,500-$2,500 per person, excluding flights. This covers mid-range accommodations, meals, local transportation, and some activities. Would you like more detailed breakdown?";
    } else if (userInputLower.includes("itinerary") || userInputLower.includes("plan")) {
      return "I can help you create a customized itinerary! Please tell me your destination, travel dates, and any specific interests (like food, history, nature, etc.) so I can suggest the perfect plan for you.";
    } else {
      return "That's a great question! To provide you with the best travel advice, could you share more details about your travel preferences, destination interests, or specific questions you have?";
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
        </CardContent>
      </Card>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me about travel recommendations, itineraries, budgeting..."
          className="flex-1 px-4 py-2 rounded-md border"
        />
        <Button onClick={handleSendMessage} className="p-2">
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Chat;
