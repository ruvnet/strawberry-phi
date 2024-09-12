import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApiKey } from '../contexts/ApiKeyContext';
import { fetchJobs } from '../utils/openaiApi';

const JobStatus = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const { apiKey } = useApiKey();
  const jobsPerPage = 5;

  useEffect(() => {
    const loadJobs = async () => {
      if (apiKey) {
        try {
          const response = await fetchJobs(apiKey, currentPage, jobsPerPage);
          setJobs(response.data);
          setTotalJobs(response.total);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      }
    };
    loadJobs();
  }, [apiKey, currentPage]);

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600';
      case 'running':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      case 'queued':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Job Status</h1>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-strawberry-700">Job Details</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="mt-4 h-[300px] rounded-md border p-4">
                        {selectedJob && (
                          <div className="space-y-2">
                            <p><strong>Job ID:</strong> {selectedJob.id}</p>
                            <p><strong>Model:</strong> {selectedJob.fine_tuned_model || selectedJob.model}</p>
                            <p><strong>Status:</strong> <span className={getStatusColor(selectedJob.status)}>{selectedJob.status}</span></p>
                            <p><strong>Created At:</strong> {formatDate(selectedJob.created_at)}</p>
                            <p><strong>Updated At:</strong> {formatDate(selectedJob.updated_at)}</p>
                            <p><strong>Organization ID:</strong> {selectedJob.organization_id}</p>
                            <p><strong>Training File:</strong> {selectedJob.training_file}</p>
                            <p><strong>Validation File:</strong> {selectedJob.validation_file || 'N/A'}</p>
                            {selectedJob.result_files && (
                              <p><strong>Result Files:</strong> {selectedJob.result_files.join(', ')}</p>
                            )}
                            {selectedJob.trained_tokens && (
                              <p><strong>Trained Tokens:</strong> {selectedJob.trained_tokens}</p>
                            )}
                            {selectedJob.error && (
                              <p><strong>Error:</strong> {selectedJob.error.message}</p>
                            )}
                          </div>
                        )}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={prevPage} disabled={currentPage === 1} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span className="text-strawberry-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={nextPage} disabled={currentPage === totalPages} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default JobStatus;