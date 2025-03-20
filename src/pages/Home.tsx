
import React, { useEffect, useState } from "react";
import { PlusCircle, Navigation, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface Recommendation {
  id: string;
  title: string;
  image: string;
  location: string;
  duration: string;
}

const popularDestinations: Recommendation[] = [
  {
    id: "1",
    title: "Tokyo Adventure",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1287&auto=format&fit=crop",
    location: "Tokyo, Japan",
    duration: "7 days",
  },
  {
    id: "2",
    title: "Paris Getaway",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop",
    location: "Paris, France",
    duration: "5 days",
  },
  {
    id: "3",
    title: "New York City Trip",
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1470&auto=format&fit=crop",
    location: "New York, USA",
    duration: "6 days",
  },
];

const recentTrips: Recommendation[] = [
  {
    id: "4",
    title: "Barcelona Beach",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1470&auto=format&fit=crop",
    location: "Barcelona, Spain",
    duration: "4 days",
  },
  {
    id: "5",
    title: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
    location: "Interlaken, Switzerland",
    duration: "3 days",
  },
];

const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`container max-w-5xl mx-auto px-4 pt-4 md:pt-8 pb-20 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      {/* Hero Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <p className="text-sm font-medium text-primary">Good morning</p>
            <h1 className="text-3xl font-bold">Where to next?</h1>
          </div>
          
          <div className="mt-4 md:mt-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button className="btn-primary group">
              <PlusCircle size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
              New Trip
            </Button>
          </div>
        </div>

        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-400/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1287&auto=format&fit=crop" 
            alt="Travel inspiration" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-end">
            <div className="bg-background/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 max-w-md">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-3">Discover Your Next Adventure</h2>
              <p className="text-white/90 text-sm mb-4">
                Plan, collaborate, and experience travel like never before with TravelTogether
              </p>
              <Button className="bg-white text-primary hover:bg-white/90">Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: "Discover Places", 
              description: "Explore curated destinations based on your interests", 
              icon: Navigation,
              color: "bg-blue-100",
              delay: "400ms"
            },
            { 
              title: "Plan Together", 
              description: "Collaborate with friends on trip planning", 
              icon: Users,
              color: "bg-green-100",
              delay: "500ms"
            },
            { 
              title: "Manage Itineraries", 
              description: "Keep all your travel plans organized", 
              icon: Calendar,
              color: "bg-amber-100",
              delay: "600ms"
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 glass-card card-hover animate-slide-up" 
              style={{ animationDelay: feature.delay }}
            >
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className="text-foreground" size={20} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="mb-12 animate-slide-up" style={{ animationDelay: "700ms" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">Popular Destinations</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80">View all</Button>
        </div>
        
        <div className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
          {popularDestinations.map((destination, index) => (
            <div 
              key={destination.id} 
              className="min-w-72 snap-start animate-slide-up" 
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-3">
                <img 
                  src={destination.image} 
                  alt={destination.title} 
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{destination.title}</h3>
                  <div className="flex items-center text-white/80 text-xs">
                    <span>{destination.location}</span>
                    <span className="mx-2">•</span>
                    <span>{destination.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Trips */}
      <section className="mb-10 animate-slide-up" style={{ animationDelay: "1000ms" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">Your Recent Trips</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80">View all</Button>
        </div>
        
        <div className="space-y-4">
          {recentTrips.map((trip, index) => (
            <div 
              key={trip.id} 
              className="flex gap-4 items-center glass-card p-3 rounded-xl card-hover animate-slide-up" 
              style={{ animationDelay: `${1100 + index * 100}ms` }}
            >
              <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{trip.title}</h3>
                <div className="flex items-center text-muted-foreground text-xs">
                  <span>{trip.location}</span>
                  <span className="mx-2">•</span>
                  <span>{trip.duration}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Calendar size={18} />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
