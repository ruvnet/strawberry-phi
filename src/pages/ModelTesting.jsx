import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ModelSelector from '../components/ModelSelector';
import { useApiKey } from '../contexts/ApiKeyContext';

const ModelTesting = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(150);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
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
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
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

  const renderModelOptions = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="temperature">Temperature: {temperature}</Label>
        <Slider
          id="temperature"
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(value) => setTemperature(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxTokens">Max Tokens: {maxTokens}</Label>
        <Slider
          id="maxTokens"
          min={1}
          max={2048}
          step={1}
          value={[maxTokens]}
          onValueChange={(value) => setMaxTokens(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="topP">Top P: {topP}</Label>
        <Slider
          id="topP"
          min={0}
          max={1}
          step={0.1}
          value={[topP]}
          onValueChange={(value) => setTopP(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="frequencyPenalty">Frequency Penalty: {frequencyPenalty}</Label>
        <Slider
          id="frequencyPenalty"
          min={-2}
          max={2}
          step={0.1}
          value={[frequencyPenalty]}
          onValueChange={(value) => setFrequencyPenalty(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="presencePenalty">Presence Penalty: {presencePenalty}</Label>
        <Slider
          id="presencePenalty"
          min={-2}
          max={2}
          step={0.1}
          value={[presencePenalty]}
          onValueChange={(value) => setPresencePenalty(value[0])}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Model Testing</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Select Model and Enter Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="gpt4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gpt4">GPT-4</TabsTrigger>
                <TabsTrigger value="gpt3">GPT-3.5</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              <TabsContent value="gpt4">
                <ModelSelector onModelSelect={setSelectedModel} modelPrefix="gpt-4" />
                {renderModelOptions()}
              </TabsContent>
              <TabsContent value="gpt3">
                <ModelSelector onModelSelect={setSelectedModel} modelPrefix="gpt-3.5-turbo" />
                {renderModelOptions()}
              </TabsContent>
              <TabsContent value="other">
                <ModelSelector onModelSelect={setSelectedModel} />
                {renderModelOptions()}
              </TabsContent>
            </Tabs>
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