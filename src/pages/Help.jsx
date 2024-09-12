import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Help = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Help</h1>
      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">How to Use Strawberry Phi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-strawberry-600">
            <h2 className="text-xl font-semibold">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Set up your API key in the Settings page.</li>
              <li>Navigate to the New Job page to start a fine-tuning job.</li>
              <li>Upload your JSONL file with training data.</li>
              <li>Select the model you want to fine-tune (GPT-4o or GPT-4o-mini).</li>
              <li>Configure the fine-tuning parameters.</li>
              <li>Start the job and monitor its progress on the Job Status page.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6">Testing Your Model</h2>
            <p>Once your model is fine-tuned, you can test it using the Model Testing page. Enter prompts and see how your model responds.</p>

            <h2 className="text-xl font-semibold mt-6">Tips for Best Results</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Ensure your JSONL file is properly formatted.</li>
              <li>Start with a small dataset and gradually increase as needed.</li>
              <li>Experiment with different learning rates and epochs to optimize performance.</li>
              <li>Regularly check the Job Status page for updates on your fine-tuning jobs.</li>
            </ul>

            <p className="mt-6">For more detailed information, please refer to the OpenAI documentation or contact our support team.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;