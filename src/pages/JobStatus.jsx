import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const JobStatus = () => {
  const jobs = [
    { id: '1', model: 'GPT-4o', status: 'In Progress', createdAt: '2023-04-01 10:00:00' },
    { id: '2', model: 'GPT-4o-mini', status: 'Completed', createdAt: '2023-03-31 15:30:00' },
  ];

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-strawberry-50">
                <TableCell className="text-strawberry-600">{job.id}</TableCell>
                <TableCell className="text-strawberry-600">{job.model}</TableCell>
                <TableCell className="text-strawberry-600">{job.status}</TableCell>
                <TableCell className="text-strawberry-600">{job.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobStatus;