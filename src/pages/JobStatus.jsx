import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useApiKey } from '../contexts/ApiKeyContext';
import { fetchJobs, fetchJobStatus, fetchJobEvents } from '../utils/openaiApi';
import JobDetailsDialog from '../components/JobDetailsDialog';
import Pagination from '../components/Pagination';
import { useToast } from "@/components/ui/use-toast";

const JobStatus = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey } = useApiKey();
  const { toast } = useToast();
  const jobsPerPage = 5;

  const loadJobs = async () => {
    if (apiKey) {
      setIsLoading(true);
      try {
        const response = await fetchJobs(apiKey, currentPage, jobsPerPage);
        setJobs(response.data);
        setTotalJobs(response.total || 0); // Ensure totalJobs is set to 0 if response.total is undefined
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch jobs. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadJobs();
  }, [apiKey, currentPage]);

  const refreshJobStatus = async (jobId) => {
    if (apiKey) {
      try {
        const updatedJob = await fetchJobStatus(apiKey, jobId);
        setJobs(jobs.map(job => job.id === jobId ? updatedJob : job));
      } catch (error) {
        console.error('Error refreshing job status:', error);
        toast({
          title: "Error",
          description: "Failed to refresh job status. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const refreshAllJobs = async () => {
    setIsLoading(true);
    try {
      const updatedJobs = await Promise.all(jobs.map(job => fetchJobStatus(apiKey, job.id)));
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error refreshing all job statuses:', error);
      toast({
        title: "Error",
        description: "Failed to refresh all job statuses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded': return 'text-green-600';
      case 'running': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      case 'queued': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const totalPages = Math.max(1, Math.ceil(totalJobs / jobsPerPage));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-strawberry-800">Job Status</h1>
        <Button onClick={refreshAllJobs} disabled={isLoading} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh All
        </Button>
      </div>
      <p className="text-strawberry-600 mb-6">
        Monitor and manage your fine-tuning jobs here. This page displays all your current and past fine-tuning tasks,
        allowing you to track progress, view details, and manage your custom models efficiently.
      </p>
      <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-strawberry-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-strawberry-100">
              <TableHead className="text-strawberry-700">Job ID</TableHead>
              <TableHead className="text-strawberry-700">Model</TableHead>
              <TableHead className="text-strawberry-700">Status</TableHead>
              <TableHead className="text-strawberry-700">Created At</TableHead>
              <TableHead className="text-strawberry-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-strawberry-50">
                <TableCell className="text-strawberry-600">{job.id}</TableCell>
                <TableCell className="text-strawberry-600">{job.fine_tuned_model || job.model}</TableCell>
                <TableCell className={`font-semibold ${getStatusColor(job.status)}`}>{job.status}</TableCell>
                <TableCell className="text-strawberry-600">{formatDate(job.created_at)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => refreshJobStatus(job.id)}>
                      <RefreshCw className="h-4 w-4 mr-1" /> Refresh
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                      View Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <JobDetailsDialog
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        apiKey={apiKey}
      />
    </div>
  );
};

export default JobStatus;