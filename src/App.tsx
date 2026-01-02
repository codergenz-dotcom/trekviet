import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PorterProvider } from "@/contexts/PorterContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DevAccountSwitcher } from "@/components/DevAccountSwitcher";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
    <AuthProvider>
      <PorterProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* Landing page */}
              <Route path="/" element={<LandingPage />} />
              {/* Admin routes - protected */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/porters" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPorters />
                  </ProtectedRoute>
                } 
              />
              {/* Main app routes */}
              <Route
                path="/*"
                element={
                  <AppLayout>
                    <Routes>
                      <Route path="/trips" element={<Index />} />
                      <Route path="/create-trip" element={<CreateTrip />} />
                      <Route path="/create-trip/self-organize" element={<CreateTrip />} />
                      <Route path="/trip/:id" element={<TripDetail />} />
                      <Route path="/my-trips" element={<MyTrips />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppLayout>
                }
              />
            </Routes>
            <DevAccountSwitcher />
          </BrowserRouter>
        </TooltipProvider>
      </PorterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
