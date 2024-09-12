import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiKey } from '../contexts/ApiKeyContext';
import { fetchJobs } from '../utils/openaiApi';
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { apiKey } = useApiKey();

  useEffect(() => {
    const loadJobs = async () => {
      if (apiKey) {
        try {
          setIsLoading(true);
          const response = await fetchJobs(apiKey, 1, 20); // Fetch up to 20 jobs
          const allJobs = response.data;
          
          // Filter active jobs (status: running or queued)
          const active = allJobs.filter(job => ['running', 'queued'].includes(job.status));
          setActiveJobs(active);

          // Sort remaining jobs by created_at and take the 5 most recent
          const recent = allJobs
            .filter(job => !['running', 'queued'].includes(job.status))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);
          setRecentJobs(recent);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadJobs();
  }, [apiKey]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const renderJobList = (jobs) => {
    if (isLoading) {
      return Array(3).fill(0).map((_, index) => (
        <Skeleton key={index} className="w-full h-12 mb-2" />
      ));
    }

    if (jobs.length === 0) {
      return <p className="text-strawberry-600">No jobs to display.</p>;
    }

    return jobs.map((job) => (
      <div key={job.id} className="mb-2 p-2 bg-strawberry-50 rounded-md">
        <p className="text-strawberry-700 font-semibold">{job.id}</p>
        <p className="text-strawberry-600 text-sm">Status: {job.status}</p>
        <p className="text-strawberry-600 text-sm">Created: {formatDate(job.created_at)}</p>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {renderJobList(activeJobs)}
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {renderJobList(recentJobs)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;