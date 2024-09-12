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
          <CardTitle className="text-strawberry-700">Strawberry Phi Documentation</CardTitle>
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
                  Our application provides a user-friendly interface for fine-tuning OpenAI's GPT-4o and GPT-4o-mini models. It offers customization options to adapt these powerful language models for specific tasks and domains.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Fine-tuning capabilities for GPT-4o and GPT-4o-mini</li>
                  <li>User-friendly interface for uploading training data</li>
                  <li>Customizable fine-tuning parameters</li>
                  <li>Real-time job monitoring and status updates</li>
                  <li>Model testing interface for immediate results</li>
                  <li>Secure API key management</li>
                </ul>
              </TabsContent>
              <TabsContent value="finetune">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Fine-tuning Process</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="file-upload">
                    <AccordionTrigger>File Upload</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li>Upload JSONL, CSV, or Parquet files</li>
                        <li>Option to use a pre-existing file (strawberry-phi.jsonl)</li>
                        <li>Automatic conversion of CSV and Parquet files to JSONL format</li>
                        <li>File preview functionality</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="model-selection">
                    <AccordionTrigger>Model Selection</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li>Choose between GPT-4o and GPT-4o-mini</li>
                        <li>Model search functionality</li>
                        <li>Information about each model's capabilities and context window</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="parameters">
                    <AccordionTrigger>Fine-tuning Parameters</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li>Learning rate: Controls the step size during optimization</li>
                        <li>Epochs: Number of complete passes through the training dataset</li>
                        <li>Batch size: Number of training examples used in one iteration</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              <TabsContent value="jobstatus">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Job Status Monitoring</h2>
                <p className="text-strawberry-600 mb-4">
                  The Job Status page allows you to monitor and manage your fine-tuning jobs. It displays all your current and past fine-tuning tasks, allowing you to track progress, view details, and manage your custom models efficiently.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Real-time status updates for all jobs</li>
                  <li>Individual job refresh functionality</li>
                  <li>"Refresh All" button to update all job statuses at once</li>
                  <li>Detailed job information view</li>
                  <li>Pagination for managing multiple jobs</li>
                </ul>
              </TabsContent>
              <TabsContent value="modeltesting">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Model Testing</h2>
                <p className="text-strawberry-600 mb-4">
                  The Model Testing page allows you to interact with your fine-tuned models and test their performance with custom prompts.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Model selection from available fine-tuned models</li>
                  <li>Custom prompt input</li>
                  <li>Adjustable parameters:
                    <ul className="list-disc list-inside ml-4">
                      <li>Temperature: Controls randomness (0-2)</li>
                      <li>Max Tokens: Maximum length of the generated response (1-2048)</li>
                      <li>Top P: Controls diversity via nucleus sampling (0-1)</li>
                      <li>Frequency Penalty: Decreases repetition (-2 to 2)</li>
                      <li>Presence Penalty: Increases topic diversity (-2 to 2)</li>
                    </ul>
                  </li>
                  <li>Real-time model response display</li>
                  <li>Option to view raw API response</li>
                </ul>
              </TabsContent>
              <TabsContent value="settings">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Settings</h2>
                <p className="text-strawberry-600 mb-4">
                  The Settings page allows you to manage your OpenAI API key and configure other application settings.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Secure API key management</li>
                  <li>Option to show/hide API key</li>
                  <li>Encrypted storage of API key in local storage</li>
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