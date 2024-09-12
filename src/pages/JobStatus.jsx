import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const JobStatus = () => {
  const jobs = [
    { id: '1', model: 'GPT-4o', status: 'In Progress', createdAt: '2023-04-01 10:00:00' },
    { id: '2', model: 'GPT-4o-mini', status: 'Completed', createdAt: '2023-03-31 15:30:00' },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Job Status</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.model}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{job.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobStatus;