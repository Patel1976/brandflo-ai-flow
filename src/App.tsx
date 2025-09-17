import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConditionalLayout } from "./components/layout/ConditionalLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MSPOnboarding from "./pages/admin/MSPOnboarding";
import ManageMSPs from "./pages/admin/ManageMSPs";
import MSPAnalytics from "./pages/admin/MSPAnalytics";
import PlanSelection from "./pages/PlanSelection";
import GuidedSetup from "./pages/GuidedSetup";
import ContentCalendar from "./pages/ContentCalendar";
import PostCreation from "./pages/PostCreation";
import ABTesting from "./pages/ABTesting";
import BrandVoice from "./pages/BrandVoice";
import RegionalTargeting from "./pages/RegionalTargeting";
import PlatformOptimizer from "./pages/PlatformOptimizer";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AIFeedback from "./pages/AIFeedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ConditionalLayout>
          <Routes>
            {/* <Route path="/" element={<Index />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/plan-selection" element={<PlanSelection />} />
            <Route path="/guided-setup" element={<GuidedSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/create" element={<PostCreation />} />
            <Route path="/ab-testing" element={<ABTesting />} />
            <Route path="/brand-voice" element={<BrandVoice />} />
            <Route path="/regional" element={<RegionalTargeting />} />
            <Route path="/platform-optimizer" element={<PlatformOptimizer />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ai-feedback" element={<AIFeedback />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/msp/onboarding" element={<MSPOnboarding />} />
            <Route path="/admin/msp/manage" element={<ManageMSPs />} />
            <Route path="/admin/msp/analytics" element={<MSPAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConditionalLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
