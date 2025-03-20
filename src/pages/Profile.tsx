
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Settings, Camera, Heart, Globe } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto">
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">Jane Doe</h1>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Singapore</span>
        </div>
        <p className="mt-2 text-sm max-w-md">
          Travel enthusiast exploring the world one country at a time. 
          Lover of local cuisine and hidden gems.
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div>
          <p className="font-bold text-xl">24</p>
          <p className="text-sm text-muted-foreground">Countries</p>
        </div>
        <div>
          <p className="font-bold text-xl">156</p>
          <p className="text-sm text-muted-foreground">Places</p>
        </div>
        <div>
          <p className="font-bold text-xl">48</p>
          <p className="text-sm text-muted-foreground">Trips</p>
        </div>
      </div>
      
      <Tabs defaultValue="photos">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="photos">
            <Camera className="h-4 w-4 mr-2" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="h-4 w-4 mr-2" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="badges">
            <Globe className="h-4 w-4 mr-2" />
            Badges
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="photos" className="mt-0">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="aspect-square bg-muted rounded-md"></div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">View All Photos</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <div className="space-y-4">
            {["Santorini, Greece", "Kyoto, Japan", "Banff, Canada"].map((place, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{place}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Saved on May 12, 2023</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="badges" className="mt-0">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { name: "Globetrotter", desc: "Visited 20+ countries" },
              { name: "Foodie", desc: "Tried local cuisine in 15+ places" },
              { name: "Photographer", desc: "Shared 100+ travel photos" },
              { name: "Adventurer", desc: "Completed 5+ adventure activities" },
              { name: "Culture Vulture", desc: "Visited 30+ cultural sites" },
              { name: "Social Butterfly", desc: "Connected with 50+ travelers" }
            ].map((badge, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                  <span className="text-xs">Icon</span>
                </div>
                <h3 className="font-medium text-sm">{badge.name}</h3>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
