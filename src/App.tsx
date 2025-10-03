import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ComplaintPage from "./pages/ComplaintPage";
import LoginPage from "./pages/LoginPage";
import CitizenDashboardPage from "./pages/CitizenDashboardPage";
import ProfessionalDashboardPage from "./pages/ProfessionalDashboardPage";
import ComplaintEfilingPage from "./pages/ComplaintEfilingPage";
import ComplaintEfilingPage2 from "./pages/ComplaintEfilingPage2";
import ComplaintEfilingPage3 from "./pages/ComplaintEfilingPage3";
import ComplaintEfilingPage4 from "./pages/ComplaintEfilingPage4";
import CitizenCaseTrackingPage from "./pages/CitizenCaseTrackingPage";
import PoliceDashboardPage from "./pages/PoliceDashboardPage";
import PoliceComplaintReviewPage from "./pages/PoliceComplaintReviewPage";
import AdvocateDashboardPage from "./pages/AdvocateDashboardPage";
import JudgeDashboardPage from "./pages/JudgeDashboardPage";
import SystemDashboardPage from "./pages/SystemDashboardPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/file-complaint" element={<ComplaintPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/citizen-dashboard" element={<CitizenDashboardPage />} />
          <Route path="/police-dashboard" element={<PoliceDashboardPage />} />
          <Route path="/file-new-complaint" element={<ComplaintEfilingPage />} />
          <Route path="/file-new-complaint/narrative" element={<ComplaintEfilingPage2 />} />
          <Route path="/file-new-complaint/evidence" element={<ComplaintEfilingPage3 />} />
          <Route path="/file-new-complaint/review-submit" element={<ComplaintEfilingPage4 />} />
          <Route path="/citizen-case-tracking" element={<CitizenCaseTrackingPage />} />
          <Route path="/police/complaint-review/:id" element={<PoliceComplaintReviewPage />} />
          <Route path="/advocate-dashboard" element={<AdvocateDashboardPage />} />
          <Route path="/judge-dashboard" element={<JudgeDashboardPage />} />
          <Route path="/system-dashboard" element={<SystemDashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
