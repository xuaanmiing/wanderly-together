
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Trips: React.FC = () => {
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Trips</h1>
        <Button className="flex items-center gap-1">
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
            {[
              { title: "Tokyo Adventure", dates: "Aug 15-25, 2023", locations: ["Tokyo", "Kyoto", "Osaka"] },
              { title: "European Tour", dates: "Sep 10-30, 2023", locations: ["Paris", "Rome", "Barcelona"] }
            ].map((trip, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-4">
            {[
              { title: "Southeast Asia Trip", dates: "Mar 5-15, 2023", locations: ["Bangkok", "Singapore", "Bali"] },
              { title: "New York Weekend", dates: "Jan 20-22, 2023", locations: ["New York City"] }
            ].map((trip, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts">
          <div className="space-y-4">
            <Card key="draft" className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">South America 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground gap-1 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Draft (No dates set)</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Peru, Chile, Argentina</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Trips;
