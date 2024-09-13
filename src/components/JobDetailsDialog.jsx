import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchJobEvents } from '../utils/openaiApi';

const JobDetailsDialog = ({ job, onClose, apiKey }) => {
  const [jobEvents, setJobEvents] = useState([]);

  useEffect(() => {
    if (job && apiKey) {
      fetchJobEvents(apiKey, job.id).then(setJobEvents).catch(console.error);
    }
  }, [job, apiKey]);

  if (!job) return null;

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-strawberry-700">Job Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[300px] rounded-md border p-4">
          <div className="space-y-2">
            <p><strong>Job ID:</strong> {job.id}</p>
            <p><strong>Model:</strong> {job.fine_tuned_model || job.model}</p>
            <p><strong>Status:</strong> <span className={getStatusColor(job.status)}>{job.status}</span></p>
            <p><strong>Created At:</strong> {formatDate(job.created_at)}</p>
            <p><strong>Updated At:</strong> {formatDate(job.updated_at)}</p>
            <p><strong>Organization ID:</strong> {job.organization_id}</p>
            <p><strong>Training File:</strong> {job.training_file}</p>
            <p><strong>Validation File:</strong> {job.validation_file || 'N/A'}</p>
            {job.result_files && (
              <p><strong>Result Files:</strong> {job.result_files.join(', ')}</p>
            )}
            {job.trained_tokens && (
              <p><strong>Trained Tokens:</strong> {job.trained_tokens}</p>
            )}
            {job.error && (
              <p><strong>Error:</strong> {job.error.message}</p>
            )}
            <h3 className="font-semibold mt-4">Job Events:</h3>
            <ul className="list-disc pl-5">
              {jobEvents.map((event, index) => (
                <li key={index} className="text-sm">
                  {formatDate(event.created_at)}: {event.message}
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;