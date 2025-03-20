import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";

interface Trip {
  id: number;
  title: string;
  dates: string;
  locations: string[];
  itinerary?: string;
  status: "upcoming" | "past" | "draft";
}

const Calendar: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayTrips, setSelectedDayTrips] = useState<Trip[]>([]);

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
        }
      ];
      setTrips(defaultTrips);
    } else {
      // Add the status field if it doesn't exist
      const formattedTrips = savedTrips.map((trip: any) => ({
        ...trip,
        status: trip.status || "upcoming"
      })) as Trip[];
      setTrips(formattedTrips);
    }
  }, []);

  useEffect(() => {
    if (!date) return;
    
    // Filter trips for the selected date
    // This is simplified logic - in a real app, you'd parse actual date ranges
    const formattedDate = format(date, "MMM dd, yyyy");
    const tripsForDay = trips.filter(trip => {
      // Simple check to see if the selected date's month is mentioned in the trip dates
      return trip.dates.includes(format(date, "MMM"));
    });
    
    setSelectedDayTrips(tripsForDay);
  }, [date, trips]);

  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trip Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-3 pointer-events-auto"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? `Events for ${format(date, "MMMM d, yyyy")}` : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayTrips.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No trips scheduled for this day.
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayTrips.map(trip => (
                  <div key={trip.id} className="p-3 bg-muted rounded-lg">
                    <h3 className="font-medium">{trip.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.locations.join(", ")}</span>
                    </div>
                    {trip.itinerary && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => alert(`Itinerary for ${trip.title}:\n\n${trip.itinerary}`)}
                      >
                        View Itinerary
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
