import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const LandingPage = lazy(() => import("./components/landingPage/LandingPage"));
const SignInPage = lazy(() => import("./components/auth/Sign-In"));
const SignUpPage = lazy(() => import("./components/auth/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Hospitals = lazy(() => import("./pages/Hospitals"));
const BloodBanks = lazy(() => import("./pages/BloodBanks"));
const BloodDonationPage = lazy(() => import("./pages/BloodDonationPage"));
const SeekEmergency = lazy(() => import("./pages/SeekEmergency"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/blood-banks" element={<BloodBanks />} />
              <Route path="/donation-drives" element={<BloodDonationPage />} />
              <Route path="/seek-emergency" element={<SeekEmergency />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
