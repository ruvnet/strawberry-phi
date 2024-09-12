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
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">OpenAI Fine-tuning Application</h2>
                <p className="text-strawberry-600 mb-4">
                  This application provides a user-friendly interface for fine-tuning OpenAI's GPT models, specifically GPT-4o and GPT-4o-mini. It allows you to customize these powerful language models for your specific needs, enhancing their performance on domain-specific tasks.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Easy-to-use interface for creating and managing fine-tuning jobs</li>
                  <li>Support for GPT-4o and GPT-4o-mini models</li>
                  <li>Real-time job status monitoring and detailed logs</li>
                  <li>Interactive model testing environment</li>
                  <li>Secure API key management</li>
                  <li>Customizable fine-tuning parameters</li>
                </ul>
                <p className="text-strawberry-600 mt-4">
                  This application streamlines the process of fine-tuning OpenAI models, making it accessible to both beginners and experienced users. It provides a comprehensive suite of tools for creating, monitoring, and testing custom language models tailored to your specific requirements.
                </p>
                <h3 className="text-lg font-semibold mb-2 mt-4 text-strawberry-700">Strawberry Phi by rUv: Reflection-Utilized Validation</h3>
                <p className="text-strawberry-600 mb-2">
                  Strawberry Phi is an advanced multi-modal, agentic AI assistant designed for complex task handling across various domains. Developed by rUv, it uses reflection-tuning techniques to self-evaluate and correct reasoning errors.
                </p>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li><strong>Reflection:</strong> Emphasizes the model's core capability of self-reflection and self-correction.</li>
                  <li><strong>Utilized:</strong> Highlights the active use of reflection in improving the model's reasoning process.</li>
                  <li><strong>Validation:</strong> Signifies the model's ability to validate its reasoning, detect errors, and refine outputs for accuracy.</li>
                </ul>
                <p className="text-strawberry-600 mt-2">
                  The model leverages advanced methodologies such as sequential, concurrent, recurrent, and reinforcement learning approaches for task management, planning, and execution. By incorporating multi-modal inputs and outputs (e.g., text, images, audio), it can manage various task complexities, adapt dynamically to user requirements, and continuously improve its performance.
                </p>
              </TabsContent>
              <TabsContent value="finetune">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Fine-tuning User Manual</h2>
                <p className="text-strawberry-600 mb-4">
                  This section provides a comprehensive guide to the fine-tuning process, explaining each step and option in detail.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="file-upload">
                    <AccordionTrigger>1. File Upload</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-strawberry-600 mb-2">The file upload step is crucial for providing your training data to the model.</p>
                      <h4 className="text-lg font-semibold mb-2 text-strawberry-700">Options:</h4>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li><strong>Upload new file:</strong> Choose this option to upload your own custom dataset.</li>
                        <li><strong>Use pre-existing file (strawberry-phi.jsonl):</strong> Select this for a quick start using our pre-prepared dataset.</li>
                      </ul>
                      <h4 className="text-lg font-semibold mb-2 mt-4 text-strawberry-700">File Types:</h4>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li><strong>JSONL:</strong> JavaScript Object Notation Lines format. Each line is a valid JSON object.</li>
                        <li><strong>CSV:</strong> Comma-Separated Values. Will be automatically converted to JSONL.</li>
                        <li><strong>Parquet:</strong> A columnar storage file format. Will be automatically converted to JSONL.</li>
                      </ul>
                      <p className="text-strawberry-600 mt-2">
                        After uploading, you can preview the content to ensure it's correct before proceeding.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="model-selection">
                    <AccordionTrigger>2. Model Selection</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-strawberry-600 mb-2">Choose the base model for fine-tuning. Your options are:</p>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li><strong>GPT-4o:</strong> The full-sized model with maximum capabilities, suitable for complex tasks and high-quality outputs.</li>
                        <li><strong>GPT-4o-mini:</strong> A smaller version that offers faster processing and lower resource requirements, suitable for quicker deployments or less complex tasks.</li>
                      </ul>
                      <p className="text-strawberry-600 mt-2">
                        Consider your specific use case, required model capabilities, and resource constraints when making your selection.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="parameters">
                    <AccordionTrigger>3. Fine-tuning Parameters</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-strawberry-600 mb-2">Adjust these parameters to optimize the fine-tuning process:</p>
                      <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                        <li><strong>Learning Rate:</strong> Controls how quickly the model adapts to new information. Range: 0.00001 to 0.1
                          <ul className="list-disc list-inside ml-4">
                            <li>Lower values (e.g., 0.00001) result in slower but potentially more stable learning.</li>
                            <li>Higher values (e.g., 0.1) lead to faster learning but may cause instability.</li>
                            <li>Recommended to start with 0.001 and adjust based on results.</li>
                          </ul>
                        </li>
                        <li><strong>Epochs:</strong> The number of times the model will cycle through the entire dataset. Range: 1 to 10
                          <ul className="list-disc list-inside ml-4">
                            <li>More epochs can lead to better learning but may result in overfitting.</li>
                            <li>Start with 3-5 epochs and adjust based on validation performance.</li>
                          </ul>
                        </li>
                        <li><strong>Batch Size:</strong> The number of training examples used in one iteration. Options: 8, 16, 32
                          <ul className="list-disc list-inside ml-4">
                            <li>Larger batch sizes can lead to faster training but may require more memory.</li>
                            <li>Smaller batch sizes can sometimes lead to better generalization.</li>
                            <li>Choose based on your available computational resources and dataset size.</li>
                          </ul>
                        </li>
                      </ul>
                      <p className="text-strawberry-600 mt-2">
                        These parameters significantly impact the fine-tuning process and the resulting model's performance. Experiment with different combinations to find the optimal settings for your specific use case.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="start-job">
                    <AccordionTrigger>4. Starting the Fine-tuning Job</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-strawberry-600 mb-2">Once you've configured all settings, you can start the fine-tuning job:</p>
                      <ol className="list-decimal list-inside space-y-2 text-strawberry-600">
                        <li>Review all your selections and parameters.</li>
                        <li>Click the "Start Job" button to begin the fine-tuning process.</li>
                        <li>The application will submit the job to OpenAI's servers.</li>
                        <li>You'll receive a job ID, which you can use to track the progress in the Job Status section.</li>
                      </ol>
                      <p className="text-strawberry-600 mt-2">
                        The fine-tuning process can take several hours depending on your dataset size and chosen parameters. You can monitor the progress in the Job Status section.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="text-strawberry-600 mt-4">
                  Remember, fine-tuning is an iterative process. You may need to experiment with different datasets, parameters, and model selections to achieve optimal results for your specific use case.
                </p>
              </TabsContent>
              <TabsContent value="jobstatus">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Job Status</h2>
                <p className="text-strawberry-600 mb-4">
                  The Job Status page provides a comprehensive overview of all your fine-tuning jobs, allowing you to track progress, manage resources, and analyze results efficiently.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Real-time status updates for all fine-tuning jobs</li>
                  <li>Detailed job information, including model type, creation date, and current status</li>
                  <li>Individual job refresh functionality for immediate status checks</li>
                  <li>"Refresh All" button to update all job statuses simultaneously</li>
                  <li>Pagination for easy navigation through multiple jobs</li>
                  <li>Sorting and filtering options to quickly find specific jobs</li>
                  <li>Detailed view for each job, including:
                    <ul className="list-disc list-inside ml-4">
                      <li>Training progress and metrics</li>
                      <li>Error logs and warnings</li>
                      <li>Resource usage statistics</li>
                      <li>Estimated completion time</li>
                    </ul>
                  </li>
                  <li>Options to pause, resume, or cancel ongoing jobs</li>
                  <li>Download functionality for trained model files and training logs</li>
                  <li>Integration with the Model Testing page for quick evaluation of completed models</li>
                </ul>
                <p className="text-strawberry-600 mt-4">
                  The Job Status page is designed to give you full visibility and control over your fine-tuning processes. It helps you optimize resource allocation, troubleshoot issues quickly, and make data-driven decisions about your model development pipeline.
                </p>
              </TabsContent>
              <TabsContent value="modeltesting">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Model Testing</h2>
                <p className="text-strawberry-600 mb-4">
                  The Model Testing page provides an interactive environment to evaluate and compare your fine-tuned models. It allows you to input custom prompts, adjust various parameters, and analyze model outputs in real-time.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Key Features:</h3>
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
                  <li>Side-by-side comparison tool to evaluate fine-tuned model against base model</li>
                  <li>Performance metrics calculation and display:
                    <ul className="list-disc list-inside ml-4">
                      <li>Response time</li>
                      <li>Token usage (prompt tokens, completion tokens, total tokens)</li>
                      <li>Cost estimation based on current OpenAI pricing</li>
                    </ul>
                  </li>
                  <li>Option to view raw API response for detailed analysis</li>
                  <li>History of test prompts and responses for easy reference and comparison</li>
                  <li>Export functionality for test results in various formats (CSV, JSON)</li>
                  <li>Integration with fine-tuning job creation for iterative model improvement</li>
                </ul>
                <p className="text-strawberry-600 mt-4">
                  The Model Testing page is an essential tool for validating the performance of your fine-tuned models. It allows you to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Verify that the model has learned the desired behavior from the fine-tuning process</li>
                  <li>Compare the performance of different fine-tuned versions of a model</li>
                  <li>Identify areas where the model may need further improvement</li>
                  <li>Generate examples and case studies for stakeholder presentations</li>
                  <li>Experiment with different prompt engineering techniques to optimize model outputs</li>
                </ul>
                <p className="text-strawberry-600 mt-4">
                  By providing a user-friendly interface for interacting with your models, the Model Testing page bridges the gap between development and practical application, ensuring that your fine-tuned models meet your specific requirements and performance standards.
                </p>
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