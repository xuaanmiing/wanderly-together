
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Loader2, Check, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useOpenAI } from "@/hooks/useOpenAI";
import { useNavigate } from "react-router-dom";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your AI travel assistant. How can I help you plan your next adventure?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [lastItinerary, setLastItinerary] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse, isLoading } = useOpenAI();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if the message contains an itinerary
  const checkForItinerary = (message: string) => {
    // Simple check for itinerary-like content
    const hasItinerary = 
      (message.includes("Day") && message.includes("itinerary")) || 
      (message.toLowerCase().includes("schedule") && message.includes("Day")) ||
      (message.toLowerCase().includes("plan") && message.includes("Day"));
    
    setShowConfirmButton(hasItinerary);
    if (hasItinerary) {
      setLastItinerary(message);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const newUserMessage = { id: messages.length + 1, text: inputValue, isUser: true };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setShowConfirmButton(false);
    
    try {
      // Get AI response using our custom hook
      const response = await generateResponse(inputValue);
      
      const newAIMessage = { 
        id: messages.length + 2, 
        text: response, 
        isUser: false 
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      
      // Check if response contains an itinerary
      checkForItinerary(response);
    } catch (error) {
      toast.error("Sorry, I couldn't connect to the AI. Please try again.");
      console.error("Error getting AI response:", error);
    }
  };

  const confirmItinerary = () => {
    if (!lastItinerary) return;
    
    // Save the itinerary to localStorage for now
    // In a real app, this would go to a database
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    
    // Create a new trip from the itinerary
    const newTrip = {
      id: Date.now(),
      title: `Trip on ${new Date().toLocaleDateString()}`,
      dates: `${new Date().toLocaleDateString()} - TBD`,
      locations: ["Generated from Chat"],
      itinerary: lastItinerary,
      status: "upcoming"
    };
    
    trips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(trips));
    
    // Show success message
    toast.success("Itinerary saved! View it in your Trips section.");
    
    // Reset the confirm button
    setShowConfirmButton(false);
    
    // Navigate to trips page
    navigate('/trips');
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
          {showConfirmButton && (
            <div className="flex justify-center mt-2">
              <Button 
                onClick={confirmItinerary}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
              >
                <Check className="h-4 w-4" />
                <span>Confirm Itinerary</span>
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          )}
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
