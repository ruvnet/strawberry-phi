import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const ModelTesting = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const testModel = () => {
    // Simulated API call
    setResponse('This is a sample response from the model.');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Model Testing</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Enter Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here"
              rows={4}
              className="border-strawberry-300 focus:border-strawberry-500"
            />
            <Button onClick={testModel} className="mt-4 bg-strawberry-500 hover:bg-strawberry-600 text-white">Test Model</Button>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Model Response</CardTitle>
          </CardHeader>
          <CardContent>
            {response ? (
              <p className="text-strawberry-600">{response}</p>
            ) : (
              <p className="text-strawberry-600">No response yet. Test the model to see results.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModelTesting;