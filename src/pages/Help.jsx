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
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Strawberry Phi: Reflection-Utilized Validation</h2>
                <p className="text-strawberry-600 mb-4">
                  Strawberry Phi is an advanced multi-modal, agentic AI assistant designed for complex task handling across various domains. Developed by rUv, it uses reflection-tuning techniques to self-evaluate and correct reasoning errors.
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Multi-modal processing (text, images, audio)</li>
                  <li>Advanced agentic approaches (sequential, concurrent, recurrent, reinforcement learning)</li>
                  <li>Self-reflection and continuous improvement</li>
                  <li>Bias mitigation and ethical decision-making</li>
                  <li>Personalization and adaptive learning</li>
                </ul>
              </TabsContent>
              <TabsContent value="technical">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Technical Specifications</h2>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Model Architecture:</h3>
                <p className="text-strawberry-600 mb-4">
                  Base Model: phi-mini-128k<br />
                  Fine-tuning: Reflection-tuning with synthetic data generation
                </p>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Agentic Approaches:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Sequential: Chain of Thought, Tree of Thoughts, Plan-and-Solve</li>
                  <li>Concurrent: Multi-agent collaboration, Ensemble methods</li>
                  <li>Recurrent: Recursive refinement, Self-reflection</li>
                  <li>Reinforcement Learning: Q-learning, Policy gradient, Actor-critic</li>
                  <li>Q*: Combination of reasoning, planning, and reinforcement learning</li>
                </ul>
                <h3 className="text-lg font-semibold mb-2 text-strawberry-700">Advanced Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Real-time data integration</li>
                  <li>Long-term and contextual memory management</li>
                  <li>Custom dataset utilization</li>
                  <li>Error handling and bias mitigation</li>
                  <li>Personalization and multi-task learning</li>
                </ul>
              </TabsContent>
              <TabsContent value="usage">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Using Strawberry Phi</h2>
                <ol className="list-decimal list-inside space-y-2 text-strawberry-600">
                  <li>Set up your API key in the Settings page.</li>
                  <li>Navigate to the New Job page to start a fine-tuning job.</li>
                  <li>Upload your JSONL file with training data.</li>
                  <li>Select the model you want to fine-tune.</li>
                  <li>Configure the fine-tuning parameters.</li>
                  <li>Start the job and monitor its progress on the Job Status page.</li>
                  <li>Once fine-tuned, test your model using the Model Testing page.</li>
                </ol>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-strawberry-700">Tips for Best Results:</h3>
                <ul className="list-disc list-inside space-y-2 text-strawberry-600">
                  <li>Ensure your JSONL file is properly formatted.</li>
                  <li>Start with a small dataset and gradually increase as needed.</li>
                  <li>Experiment with different learning rates and epochs to optimize performance.</li>
                  <li>Regularly check the Job Status page for updates on your fine-tuning jobs.</li>
                </ul>
              </TabsContent>
              <TabsContent value="faq">
                <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: What makes Strawberry Phi unique?</h3>
                    <p className="text-strawberry-600">A: Strawberry Phi's reflection-tuning technique allows it to self-evaluate and correct reasoning errors, leading to more accurate and reliable outputs.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: Can I use Strawberry Phi for multiple domains?</h3>
                    <p className="text-strawberry-600">A: Yes, Strawberry Phi is designed to handle tasks across various domains thanks to its multi-modal processing and adaptive learning capabilities.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: How does the bias mitigation work?</h3>
                    <p className="text-strawberry-600">A: Strawberry Phi analyzes outputs for potential biases related to sensitive categories and uses advanced techniques to ensure fair and unbiased responses.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-strawberry-700">Q: Is human oversight available?</h3>
                    <p className="text-strawberry-600">A: Yes, Strawberry Phi includes a human-in-the-loop feature for critical or ambiguous decision-making situations to ensure ethical and high-quality outputs.</p>
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