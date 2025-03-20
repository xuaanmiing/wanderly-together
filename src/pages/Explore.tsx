
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Explore: React.FC = () => {
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Explore Destinations</h1>
      
      <div className="relative mb-6">
        <div className="flex items-center border rounded-lg bg-background overflow-hidden">
          <div className="px-3 py-2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input 
            type="text" 
            placeholder="Search destinations, activities..." 
            className="flex-1 py-3 outline-none bg-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Tokyo", "Paris", "New York", "Bali", "Rome", "Sydney"].map((destination) => (
              <Card key={destination} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Image: {destination}</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{destination}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Explore the wonders of {destination}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Trending Activities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Hiking", "Beach Hopping", "Food Tours", "Museum Visits"].map((activity) => (
              <Card key={activity} className="flex overflow-hidden">
                <div className="w-24 h-24 bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Image</span>
                </div>
                <CardContent className="p-4 flex-1">
                  <h3 className="font-semibold">{activity}</h3>
                  <p className="text-sm text-muted-foreground">Discover {activity.toLowerCase()} experiences</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  );
}

export default Explore;
