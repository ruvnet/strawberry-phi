import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[60vh] mt-4 rounded-md border border-strawberry-200 p-4">
              <TabsContent value="overview">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Strawberry Phi: Fine-tuning OpenAI Models</h2>
                <p className="text-strawberry-600 mb-4">
                  Strawberry Phi is an advanced tool designed for fine-tuning OpenAI's GPT-4o and GPT-4o-mini models. It provides a user-friendly interface for customizing these powerful language models to suit specific tasks and domains.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Fine-tuning capabilities for GPT-4o and GPT-4o-mini</li>
                  <li>User-friendly interface for uploading training data</li>
                  <li>Customizable fine-tuning parameters</li>
                  <li>Real-time job monitoring and status updates</li>
                  <li>Model testing interface for immediate results</li>
                </ul>
              </TabsContent>
              <TabsContent value="technical">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Technical Specifications</h2>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Supported Models:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>GPT-4o: OpenAI's advanced language model with enhanced capabilities</li>
                  <li>GPT-4o-mini: A more compact version of GPT-4o, suitable for faster processing and deployment</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-strawberry-700">Fine-tuning Process:</h3>
                <ol className="list-decimal list-inside space-y-2 text-strawberry-600">
                  <li>Data Preparation: Upload JSONL files containing prompt-completion pairs</li>
                  <li>Model Selection: Choose between GPT-4o and GPT-4o-mini</li>
                  <li>Hyperparameter Configuration: Set learning rate, epochs, and batch size</li>
                  <li>Training: Utilize OpenAI's API for the fine-tuning process</li>
                  <li>Evaluation: Automatic evaluation on a held-out validation set</li>
                </ol>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-strawberry-700">Security Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Encrypted storage of API keys</li>
                  <li>Secure data handling during the fine-tuning process</li>
                  <li>User authentication and authorization</li>
                </ul>
              </TabsContent>
              <TabsContent value="usage">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Using Strawberry Phi</h2>
                <ol className="list-decimal list-inside space-y-2 text-strawberry-600">
                  <li>Set up your OpenAI API key in the Settings page</li>
                  <li>Prepare your JSONL file with training data (prompt-completion pairs)</li>
                  <li>Navigate to the New Job page to start a fine-tuning job</li>
                  <li>Upload your JSONL file</li>
                  <li>Select either GPT-4o or GPT-4o-mini as your base model</li>
                  <li>Configure fine-tuning parameters (learning rate, epochs, batch size)</li>
                  <li>Start the job and monitor its progress on the Job Status page</li>
                  <li>Once fine-tuning is complete, test your model using the Model Testing page</li>
                </ol>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-strawberry-700">Tips for Best Results:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Ensure your JSONL file is properly formatted and contains high-quality data</li>
                  <li>Start with a small dataset and gradually increase as needed</li>
                  <li>Experiment with different learning rates and epochs to optimize performance</li>
                  <li>Use the Model Testing page to compare results with the base model</li>
                </ul>
              </TabsContent>
              <TabsContent value="faq">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: What's the difference between GPT-4o and GPT-4o-mini?</h3>
                    <p className="text-strawberry-600">A: GPT-4o is the full-sized model with maximum capabilities, while GPT-4o-mini is a smaller version that offers faster processing and lower resource requirements, suitable for quicker deployments or less complex tasks.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: How much data do I need for fine-tuning?</h3>
                    <p className="text-strawberry-600">A: The amount of data needed depends on your specific use case. Generally, a few hundred high-quality examples can yield good results, but more data often leads to better performance.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: How long does the fine-tuning process take?</h3>
                    <p className="text-strawberry-600">A: Fine-tuning duration varies based on the model size, amount of data, and chosen parameters. It can range from a few minutes to several hours. You can monitor the progress in real-time on the Job Status page.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: Can I use my fine-tuned model outside of Strawberry Phi?</h3>
                    <p className="text-strawberry-600">A: Yes, once fine-tuning is complete, you can use your custom model through OpenAI's API in your own applications or projects.</p>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;