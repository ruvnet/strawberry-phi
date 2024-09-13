import React from 'react';
import { Button } from "@/components/ui/button";

const JobSubmissionSection = ({ onBack, onSubmit, isLoading }) => {
  return (
    <div className="space-x-2 mt-4">
      <Button onClick={onBack} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
      <Button onClick={onSubmit} disabled={isLoading} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
        {isLoading ? 'Creating Job...' : 'Start Job'}
      </Button>
    </div>
  );
};

export default JobSubmissionSection;