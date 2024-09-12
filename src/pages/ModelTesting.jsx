import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ModelSelector from '../components/ModelSelector';
import { useApiKey } from '../contexts/ApiKeyContext';

const ModelTesting = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const { apiKey } = useApiKey();

  const testModel = async () => {
    if (!apiKey) {
      setResponse('API key not found. Please set your API key in the Settings page.');
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error testing model:', error);
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Model Testing</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Select Model and Enter Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ModelSelector onModelSelect={setSelectedModel} />
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here"
              rows={4}
              className="border-strawberry-300 focus:border-strawberry-500"
            />
            <Button onClick={testModel} className="mt-4 bg-strawberry-500 hover:bg-strawberry-600 text-white" disabled={!selectedModel}>Test Model</Button>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Model Response</CardTitle>
          </CardHeader>
          <CardContent>
            {response ? (
              <p className="text-strawberry-600 whitespace-pre-wrap">{response}</p>
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