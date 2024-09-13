import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiKeyProvider } from './contexts/ApiKeyContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewJob from './pages/NewJob';
import JobStatus from './pages/JobStatus';
import ModelTesting from './pages/ModelTesting';
import Settings from './pages/Settings';
import Help from './pages/Help';
import TrainingData from './pages/TrainingData';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiKeyProvider>
      <TooltipProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-job" element={<NewJob />} />
              <Route path="/jobs" element={<JobStatus />} />
              <Route path="/test" element={<ModelTesting />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/training-data" element={<TrainingData />} />
            </Routes>
          </Layout>
        </Router>
        <Toaster />
      </TooltipProvider>
    </ApiKeyProvider>
  </QueryClientProvider>
);

export default App;