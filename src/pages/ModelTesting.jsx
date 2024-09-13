import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import ModelSelector from '../components/ModelSelector';
import { useApiKey } from '../contexts/ApiKeyContext';
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/components/ui/use-toast";
import ParameterControls from '../components/ParameterControls';
import ResponseDisplay from '../components/ResponseDisplay';

const ModelTesting = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [rawResponse, setRawResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 150,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  const { apiKey } = useApiKey();
  const { toast } = useToast();

  const testModel = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please set your OpenAI API key in the Settings page.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isO1Model = selectedModel.includes('o1');
      const params = {
        model: selectedModel,
        messages: [{ role: "user", content: prompt }],
        top_p: parameters.topP,
        frequency_penalty: parameters.frequencyPenalty,
        presence_penalty: parameters.presencePenalty,
      };

      if (isO1Model) {
        params.max_completion_tokens = parameters.maxTokens;
        // For o1 models, temperature is always 1
        params.temperature = 1;
      } else {
        params.max_tokens = parameters.maxTokens;
        params.temperature = parameters.temperature;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Unknown error');
      }

      setRawResponse(JSON.stringify(data, null, 2));

      if (isO1Model) {
        // Handle o1 model response
        const content = data.choices[0].message.content;
        const refusal = data.choices[0].message.refusal;
        setResponse(content || refusal || "No content or refusal message provided.");
      } else {
        // Handle non-o1 model response
        setResponse(data.choices[0].message.content);
      }
    } catch (error) {
      console.error('Error testing model:', error);
      toast({
        title: "Error Testing Model",
        description: error.message,
        variant: "destructive",
      });
      setResponse(`Error: ${error.message}`);
      setRawResponse(JSON.stringify({ error: error.message }, null, 2));
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Model Testing</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Select Model and Configure Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ModelSelector onModelSelect={setSelectedModel} defaultModel="gpt-4o-mini" />
            <ParameterControls
              parameters={parameters}
              setParameters={setParameters}
              selectedModel={selectedModel}
            />
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
        <ResponseDisplay response={response} rawResponse={rawResponse} />
      </div>
    </div>
  );
};

export default ModelTesting;