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
              <li>Maximum file upload size is 1 GB, though using that much data is not recommended.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="model-selection">
          <AccordionTrigger>2. Model Selection</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Choose between available models like GPT-4o and GPT-4o-mini as your base model.</li>
              <li>Be aware of model-specific token limits for training examples:</li>
              <li>For gpt-3.5-turbo-1106, each training example is limited to 16,385 tokens.</li>
              <li>For gpt-3.5-turbo-0613, each training example is limited to 4,096 tokens.</li>
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
        <AccordionItem value="limits-quotas">
          <AccordionTrigger>5. Limits and Quotas</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Daily Limits: There are daily limits on fine-tuning jobs per model.</li>
              <li>For GPT-3.5 Turbo (gpt-3.5-turbo-0613): 5 fine-tuning requests per day.</li>
              <li>For models like gpt-4o-mini-2024-07-18: 16 fine-tuning requests per day.</li>
              <li>Concurrent Jobs: Users are typically limited to 3 concurrent fine-tuning jobs.</li>
              <li>Account Tier: Fine-tuning is not available on the Explore (free) plan. Upgrade to a paid plan to access these features.</li>
              <li>Usage Tiers: Rate limits may vary based on your usage tier. Higher tiers generally have higher limits.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="best-practices">
          <AccordionTrigger>6. Best Practices</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Start with a small dataset and gradually increase as needed.</li>
              <li>Monitor your usage to avoid hitting rate limits unexpectedly.</li>
              <li>Consider upgrading your account tier for higher limits if needed.</li>
              <li>You can request limit increases for research or testing purposes through OpenAI platform settings.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq">
          <AccordionTrigger>7. FAQ</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li><strong>Q: What does error code 429 mean?</strong></li>
              <li>A: Error 429 indicates "Too Many Requests". This means you've hit a rate limit. Wait a few minutes before trying again.</li>
              <li><strong>Q: How can I increase my limits?</strong></li>
              <li>A: You can upgrade your account tier or request an exception for higher limits through OpenAI platform settings.</li>
              <li><strong>Q: Why can't I start a fine-tuning job?</strong></li>
              <li>A: Ensure you're on a paid plan, haven't hit your daily or concurrent job limits, and your file meets all requirements.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpFineTuning;