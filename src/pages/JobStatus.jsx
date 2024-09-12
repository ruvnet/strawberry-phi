import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

const JobStatus = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobsPerPage = 5;

  // Mock data for jobs
  const jobs = [
    { id: '1', model: 'GPT-4o', status: 'Completed', createdAt: '2023-04-01 10:00:00', completedAt: '2023-04-01 11:30:00', trainingFile: 'data1.jsonl', epochs: 3, batchSize: 16 },
    { id: '2', model: 'GPT-4o-mini', status: 'In Progress', createdAt: '2023-04-02 09:15:00', completedAt: null, trainingFile: 'data2.jsonl', epochs: 4, batchSize: 32 },
    { id: '3', model: 'GPT-4o', status: 'Failed', createdAt: '2023-04-03 14:20:00', completedAt: '2023-04-03 14:25:00', trainingFile: 'data3.jsonl', epochs: 2, batchSize: 8 },
    { id: '4', model: 'GPT-4o-mini', status: 'Queued', createdAt: '2023-04-04 11:45:00', completedAt: null, trainingFile: 'data4.jsonl', epochs: 3, batchSize: 16 },
    { id: '5', model: 'GPT-4o', status: 'Completed', createdAt: '2023-04-05 16:30:00', completedAt: '2023-04-05 18:00:00', trainingFile: 'data5.jsonl', epochs: 5, batchSize: 32 },
    { id: '6', model: 'GPT-4o-mini', status: 'In Progress', createdAt: '2023-04-06 08:00:00', completedAt: null, trainingFile: 'data6.jsonl', epochs: 4, batchSize: 16 },
    { id: '7', model: 'GPT-4o', status: 'Completed', createdAt: '2023-04-07 13:10:00', completedAt: '2023-04-07 14:40:00', trainingFile: 'data7.jsonl', epochs: 3, batchSize: 32 },
  ];

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'In Progress':
        return 'text-blue-600';
      case 'Failed':
        return 'text-red-600';
      case 'Queued':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
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
            {currentJobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-strawberry-50">
                <TableCell className="text-strawberry-600">{job.id}</TableCell>
                <TableCell className="text-strawberry-600">{job.model}</TableCell>
                <TableCell className={`font-semibold ${getStatusColor(job.status)}`}>{job.status}</TableCell>
                <TableCell className="text-strawberry-600">{job.createdAt}</TableCell>
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
                      <ScrollArea className="mt-4 h-[200px] rounded-md border p-4">
                        {selectedJob && (
                          <div className="space-y-2">
                            <p><strong>Job ID:</strong> {selectedJob.id}</p>
                            <p><strong>Model:</strong> {selectedJob.model}</p>
                            <p><strong>Status:</strong> <span className={getStatusColor(selectedJob.status)}>{selectedJob.status}</span></p>
                            <p><strong>Created At:</strong> {selectedJob.createdAt}</p>
                            <p><strong>Completed At:</strong> {selectedJob.completedAt || 'N/A'}</p>
                            <p><strong>Training File:</strong> {selectedJob.trainingFile}</p>
                            <p><strong>Epochs:</strong> {selectedJob.epochs}</p>
                            <p><strong>Batch Size:</strong> {selectedJob.batchSize}</p>
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