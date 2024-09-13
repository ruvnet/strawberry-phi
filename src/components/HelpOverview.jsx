import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-strawberry-700">OpenAI Fine-tuning Overview</h2>
      <p className="text-strawberry-600 mb-4">
        Welcome to the OpenAI Fine-tuning application. This tool allows you to customize GPT models for your specific needs. Here's a quick overview of the main features:
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="training-data">
          <AccordionTrigger>Training Data</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Generate synthetic training data for fine-tuning your models.</li>
              <li>Customize parameters like number of examples, temperature, and max tokens.</li>
              <li>Review, edit, and save generated data for use in fine-tuning jobs.</li>
              <li>Download generated data as a JSONL file or save to local storage.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="fine-tuning">
          <AccordionTrigger>Fine-tuning</AccordionTrigger>
          <AccordionContent>
            Create custom models by training on your specific data. Upload your dataset, choose a base model, and configure training parameters.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="job-status">
          <AccordionTrigger>Job Status</AccordionTrigger>
          <AccordionContent>
            Monitor the progress of your fine-tuning jobs. View details, refresh status, and manage your custom models.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="model-testing">
          <AccordionTrigger>Model Testing</AccordionTrigger>
          <AccordionContent>
            Test your fine-tuned models with custom prompts. Compare outputs, analyze performance, and optimize your models.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="settings">
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>
            Manage your API key and configure application preferences for a personalized experience.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpOverview;