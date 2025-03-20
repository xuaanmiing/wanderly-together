
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Calendar, 
  MessageSquare, 
  User,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Map, label: 'Explore', path: '/explore' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function MobileNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  const handleAddTrip = () => {
    navigate('/trips');
  };

  return (
    <div className="fixed bottom-0 inset-x-0 h-16 bg-background/80 backdrop-blur-lg border-t z-50">
      <div className="flex h-full items-center justify-around px-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 w-16 h-full transition-all duration-200",
              activeTab === item.path ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-all duration-300",
              activeTab === item.path ? "scale-110" : "scale-100"
            )} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Button 
          size="icon" 
          className="rounded-full h-12 w-12 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={handleAddTrip}
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
}

export function DesktopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="hidden md:flex h-16 items-center justify-center border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              "navbar-item transition-colors duration-300",
              activeTab === item.path ? "navbar-item-active text-primary" : "navbar-item-inactive text-muted-foreground"
            )}
          >
            <item.icon size={18} className="mr-2" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}
