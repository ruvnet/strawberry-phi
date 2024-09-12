import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpJobStatus = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Job Status User Manual</h2>
      <p className="text-strawberry-600 mb-4">
        The Job Status section allows you to monitor and manage your fine-tuning jobs. Here's how to use this feature effectively:
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="viewing-jobs">
          <AccordionTrigger>Viewing Jobs</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Jobs are listed in a table format, showing key information like Job ID, Model, Status, and Creation Date.</li>
              <li>Use pagination controls to navigate through your job list.</li>
              <li>The status column is color-coded for quick reference (e.g., green for succeeded, blue for running).</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="refreshing-status">
          <AccordionTrigger>Refreshing Status</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Use the "Refresh" button next to each job to update its status.</li>
              <li>The "Refresh All" button at the top updates all visible jobs simultaneously.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="viewing-details">
          <AccordionTrigger>Viewing Job Details</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Click the "View Details" button to see comprehensive information about a specific job.</li>
              <li>The details dialog includes information such as training file, validation file, and any error messages.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="managing-jobs">
          <AccordionTrigger>Managing Jobs</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Completed jobs will show the fine-tuned model name, which you can use in the Model Testing section.</li>
              <li>Failed jobs will display error information to help you troubleshoot and retry.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpJobStatus;