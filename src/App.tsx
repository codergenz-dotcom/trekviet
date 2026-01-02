import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CreateTrip from "./pages/CreateTrip";
import CreateTripSelfOrganize from "./pages/CreateTripSelfOrganize";
import TripDetail from "./pages/TripDetail";
import MyTrips from "./pages/MyTrips";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPorters from "./pages/admin/AdminPorters";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/porters" element={<AdminPorters />} />
          {/* Main app routes */}
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/trips" element={<Index />} />
                  <Route path="/create-trip" element={<CreateTrip />} />
                  <Route path="/create-trip/self-organize" element={<CreateTripSelfOrganize />} />
                  <Route path="/trip/:id" element={<TripDetail />} />
                  <Route path="/my-trips" element={<MyTrips />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
