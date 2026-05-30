import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";
import { landingPages } from "@/data/landingPages";
import ScrollToTop from "./components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const GuidesIndex = lazy(() => import("./pages/GuidesIndex"));
const WhatIsTabata = lazy(() => import("./pages/guides/WhatIsTabata"));
const TabataVsHiit = lazy(() => import("./pages/guides/TabataVsHiit"));
const PomodoroTechnique = lazy(() => import("./pages/guides/PomodoroTechnique"));
const DeepWorkGuide = lazy(() => import("./pages/guides/DeepWorkGuide"));
const HowToUseATimer = lazy(() => import("./pages/guides/HowToUseATimer"));
const TimerLandingPage = lazy(() => import("./components/TimerLandingPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Index />} />
            {landingPages.map((p) => (
              <Route key={p.path} path={p.path} element={<TimerLandingPage page={p} />} />
            ))}
            <Route path="/guides" element={<GuidesIndex />} />
            <Route path="/guides/what-is-tabata" element={<WhatIsTabata />} />
            <Route path="/guides/tabata-vs-hiit" element={<TabataVsHiit />} />
            <Route path="/guides/pomodoro-technique" element={<PomodoroTechnique />} />
            <Route path="/guides/deep-work" element={<DeepWorkGuide />} />
            <Route path="/guides/how-to-use-a-timer-for-productivity" element={<HowToUseATimer />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
