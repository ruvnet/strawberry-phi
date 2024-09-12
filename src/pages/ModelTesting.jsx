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
      <h1 className="text-2xl font-bold">Model Testing</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enter Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here"
              rows={4}
            />
            <Button onClick={testModel} className="mt-4">Test Model</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Model Response</CardTitle>
          </CardHeader>
          <CardContent>
            {response ? (
              <p>{response}</p>
            ) : (
              <p>No response yet. Test the model to see results.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModelTesting;