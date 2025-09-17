import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import PageLoader from "@/components/page-loader";
import { PageTransition } from "@/components/page-transitions";

function Router() {
  return (
    <PageTransition mode="blur" duration={0.4}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    // Simulate initial loading
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(progress);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        clearInterval(interval);
      } else {
        setLoadProgress(Math.min(progress, 90));
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {isLoading && (
            <PageLoader 
              isLoading={isLoading} 
              progress={loadProgress}
              onComplete={() => setIsLoading(false)}
            />
          )}
        </AnimatePresence>
        {!isLoading && (
          <>
            <Toaster />
            <Router />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
