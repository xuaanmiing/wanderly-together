
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Calendar, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface Trip {
  id: number;
  title: string;
  dates: string;
  locations: string[];
  itinerary?: string;
  status: "upcoming" | "past" | "draft";
}

const Trips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load trips from localStorage
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    
    // If we have no trips yet, use the default ones
    if (savedTrips.length === 0) {
      const defaultTrips: Trip[] = [
        { 
          id: 1, 
          title: "Tokyo Adventure", 
          dates: "Aug 15-25, 2023", 
          locations: ["Tokyo", "Kyoto", "Osaka"],
          status: "upcoming"
        },
        { 
          id: 2, 
          title: "European Tour", 
          dates: "Sep 10-30, 2023", 
          locations: ["Paris", "Rome", "Barcelona"],
          status: "upcoming"
        },
        { 
          id: 3, 
          title: "Southeast Asia Trip", 
          dates: "Mar 5-15, 2023", 
          locations: ["Bangkok", "Singapore", "Bali"],
          status: "past" 
        },
        { 
          id: 4, 
          title: "New York Weekend", 
          dates: "Jan 20-22, 2023", 
          locations: ["New York City"],
          status: "past"
        },
        { 
          id: 5, 
          title: "South America 2024", 
          dates: "Draft (No dates set)", 
          locations: ["Peru", "Chile", "Argentina"],
          status: "draft"
        }
      ];
      setTrips(defaultTrips);
    } else {
      // Add the status field if it doesn't exist
      const formattedTrips = savedTrips.map((trip: any) => ({
        ...trip,
        // Ensure status is one of the allowed values
        status: ['upcoming', 'past', 'draft'].includes(trip.status) 
          ? trip.status as "upcoming" | "past" | "draft"
          : "upcoming" // Default to upcoming if status is invalid
      })) as Trip[];
      setTrips(formattedTrips);
    }
  }, []);

  const handleNewTrip = () => {
    navigate('/chat');
  };

  const handleTripClick = (trip: Trip) => {
    // In the future, this would navigate to a trip detail page
    if (trip.itinerary) {
      alert(`Itinerary for ${trip.title}:\n\n${trip.itinerary}`);
    }
  };

  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Trips</h1>
        <Button className="flex items-center gap-1" onClick={handleNewTrip}>
          <Plus className="h-4 w-4" />
          <span>New Trip</span>
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="space-y-4">
            {trips
              .filter(trip => trip.status === "upcoming")
              .map((trip) => (
                <Card 
                  key={trip.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTripClick(trip)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground gap-1 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.locations.join(", ")}</span>
                    </div>
                    {trip.itinerary && (
                      <div className="flex items-center text-sm text-green-500 gap-1 mt-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>AI-Generated Itinerary</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-4">
            {trips
              .filter(trip => trip.status === "past")
              .map((trip) => (
                <Card 
                  key={trip.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTripClick(trip)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground gap-1 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.locations.join(", ")}</span>
                    </div>
                    {trip.itinerary && (
                      <div className="flex items-center text-sm text-green-500 gap-1 mt-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>AI-Generated Itinerary</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts">
          <div className="space-y-4">
            {trips
              .filter(trip => trip.status === "draft")
              .map((trip) => (
                <Card 
                  key={trip.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTripClick(trip)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground gap-1 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.locations.join(", ")}</span>
                    </div>
                    {trip.itinerary && (
                      <div className="flex items-center text-sm text-green-500 gap-1 mt-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>AI-Generated Itinerary</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Trips;
