import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpFineTuning = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Fine-tuning User Manual</h2>
      <p className="text-strawberry-600 mb-4">
        Fine-tuning allows you to create custom models tailored to your specific needs. Follow these steps to start a new fine-tuning job:
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="file-upload">
          <AccordionTrigger>1. File Upload</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Use the drag-and-drop area or file selector to upload your JSONL file.</li>
              <li>Ensure your file follows the required format for fine-tuning.</li>
              <li>The application will validate your file and provide feedback.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="model-selection">
          <AccordionTrigger>2. Model Selection</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Choose between GPT-4o and GPT-4o-mini as your base model.</li>
              <li>GPT-4o offers maximum capabilities for complex tasks.</li>
              <li>GPT-4o-mini is smaller and faster, suitable for simpler tasks or quicker deployments.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="parameter-configuration">
          <AccordionTrigger>3. Parameter Configuration</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Set the learning rate (typically between 0.00001 and 0.1).</li>
              <li>Choose the number of epochs (1-10 recommended).</li>
              <li>Select a batch size (8, 16, or 32) based on your dataset and available resources.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="job-initiation">
          <AccordionTrigger>4. Job Initiation</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Review your settings before starting the job.</li>
              <li>Click the "Start Job" button to begin the fine-tuning process.</li>
              <li>Monitor the job status in the Job Status section.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpFineTuning;