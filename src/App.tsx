
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Navbar } from "@/components/ui/navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Trips from "./pages/Trips";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames="page-transition"
        timeout={300}
      >
        <div className="page-container min-h-[calc(100vh-4rem)] pb-16 md:pb-0">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-background">
          <AnimatedRoutes />
          <Navbar />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
