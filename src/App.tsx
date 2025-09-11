import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PlanSelection from "./pages/PlanSelection";
import GuidedSetup from "./pages/GuidedSetup";
import ContentCalendar from "./pages/ContentCalendar";
import PostCreation from "./pages/PostCreation";
import ABTesting from "./pages/ABTesting";
import BrandVoice from "./pages/BrandVoice";
import RegionalTargeting from "./pages/RegionalTargeting";
import PlatformOptimizer from "./pages/PlatformOptimizer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plan-selection" element={<PlanSelection />} />
          <Route path="/guided-setup" element={<GuidedSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<ContentCalendar />} />
          <Route path="/create" element={<PostCreation />} />
          <Route path="/ab-testing" element={<ABTesting />} />
          <Route path="/brand-voice" element={<BrandVoice />} />
          <Route path="/regional" element={<RegionalTargeting />} />
          <Route path="/platform-optimizer" element={<PlatformOptimizer />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
