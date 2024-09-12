import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Help</h1>
      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">OpenAI Fine-tuning Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex flex-wrap bg-pink-100 p-1 rounded-lg mb-4">
              <TabsTrigger value="overview" className="flex-grow mb-1 mr-1">Overview</TabsTrigger>
              <TabsTrigger value="finetune" className="flex-grow mb-1 mr-1">Fine-tuning</TabsTrigger>
              <TabsTrigger value="jobstatus" className="flex-grow mb-1 mr-1">Job Status</TabsTrigger>
              <TabsTrigger value="modeltesting" className="flex-grow mb-1 mr-1">Model Testing</TabsTrigger>
              <TabsTrigger value="settings" className="flex-grow mb-1">Settings</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[60vh] mt-4 rounded-md border border-strawberry-200 p-4">
              <TabsContent value="overview">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Fine-tuning OpenAI Models: GPT-4o and GPT-4o-mini</h2>
                <p className="text-strawberry-600 mb-4">
                  Our application provides a user-friendly interface for fine-tuning OpenAI's GPT-4o and GPT-4o-mini models. 
                  It offers customization options to adapt these powerful language models for specific tasks and domains, 
                  leveraging OpenAI's advanced AI capabilities.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Fine-tuning capabilities for OpenAI's GPT-4o and GPT-4o-mini models</li>
                  <li>User-friendly interface for uploading and managing training data</li>
                  <li>Customizable fine-tuning parameters to optimize model performance</li>
                  <li>Real-time job monitoring and status updates</li>
                  <li>Model testing interface for immediate results and performance evaluation</li>
                  <li>Secure API key management for OpenAI integration</li>
                  <li>Comprehensive documentation and guidance throughout the fine-tuning process</li>
                </ul>
              </TabsContent>
              <TabsContent value="finetune">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Fine-tuning Process</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="file-upload">
                    <AccordionTrigger>File Upload</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li>Upload JSONL, CSV, or Parquet files containing your training data</li>
                        <li>Option to use a pre-existing file (strawberry-phi.jsonl) for quick starts</li>
                        <li>Automatic conversion of CSV and Parquet files to JSONL format</li>
                        <li>File preview functionality to verify data before fine-tuning</li>
                        <li>Data validation to ensure compatibility with OpenAI's requirements</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="model-selection">
                    <AccordionTrigger>Model Selection</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li>Choose between GPT-4o and GPT-4o-mini based on your needs</li>
                        <li>Detailed information about each model's capabilities and context window</li>
                        <li>Guidance on selecting the appropriate model for your use case</li>
                        <li>Performance comparisons and trade-offs between models</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="parameters">
                    <AccordionTrigger>Fine-tuning Parameters</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li>Learning rate: Controls the step size during optimization (range: 0.0001 to 0.1)</li>
                        <li>Epochs: Number of complete passes through the training dataset (range: 1 to 50)</li>
                        <li>Batch size: Number of training examples used in one iteration (range: 1 to 256)</li>
                        <li>Guidance on selecting optimal parameters for your dataset</li>
                        <li>Advanced options for experienced users to fine-tune model behavior</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              <TabsContent value="jobstatus">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Job Status Monitoring</h2>
                <p className="text-strawberry-600 mb-4">
                  The Job Status page allows you to monitor and manage your fine-tuning jobs with OpenAI. 
                  It provides real-time updates and detailed information about each job's progress.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Real-time status updates for all fine-tuning jobs</li>
                  <li>Individual job refresh functionality for immediate status checks</li>
                  <li>"Refresh All" button to update all job statuses simultaneously</li>
                  <li>Detailed job information view, including training metrics and error logs</li>
                  <li>Pagination for managing multiple fine-tuning jobs efficiently</li>
                  <li>Job cancellation and deletion options for better resource management</li>
                  <li>Estimated completion time and resource usage statistics</li>
                </ul>
              </TabsContent>
              <TabsContent value="modeltesting">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Model Testing</h2>
                <p className="text-strawberry-600 mb-4">
                  The Model Testing page allows you to interact with your fine-tuned OpenAI models and evaluate their performance with custom prompts.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Model selection from available fine-tuned OpenAI models</li>
                  <li>Custom prompt input for testing specific scenarios</li>
                  <li>Adjustable parameters for response generation:
                    <ul className="list-disc list-inside ml-4">
                      <li>Temperature: Controls randomness (range: 0 to 2)</li>
                      <li>Max Tokens: Maximum length of the generated response (range: 1 to 4096)</li>
                      <li>Top P: Controls diversity via nucleus sampling (range: 0 to 1)</li>
                      <li>Frequency Penalty: Decreases repetition (range: -2 to 2)</li>
                      <li>Presence Penalty: Increases topic diversity (range: -2 to 2)</li>
                    </ul>
                  </li>
                  <li>Real-time model response display with formatting options</li>
                  <li>Option to view raw API response for detailed analysis</li>
                  <li>Comparison tool to evaluate fine-tuned model against base model</li>
                  <li>Performance metrics calculation (e.g., response time, token usage)</li>
                </ul>
              </TabsContent>
              <TabsContent value="settings">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Settings</h2>
                <p className="text-strawberry-600 mb-4">
                  The Settings page allows you to manage your OpenAI API key and configure other application settings for optimal performance.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Secure OpenAI API key management with encryption</li>
                  <li>Option to show/hide API key for security purposes</li>
                  <li>Encrypted storage of API key in local storage</li>
                  <li>API usage tracking and quota management</li>
                  <li>Default parameter settings for fine-tuning jobs</li>
                  <li>User interface customization options</li>
                  <li>Data retention and privacy settings</li>
                </ul>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;