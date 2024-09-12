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

  const renderSlider = (label, value, setValue, min, max, step, description) => (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-strawberry-700 font-semibold">{label}</Label>
      <p className="text-xs text-strawberry-600 mb-2">{description}</p>
      <div className="flex items-center space-x-2">
        <Slider
          id={label}
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(value) => setValue(value[0])}
          className="flex-grow"
        />
        <span className="text-sm font-medium text-strawberry-700 w-12 text-right">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Model Testing</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Select Model and Configure Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ModelSelector onModelSelect={setSelectedModel} />
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-pink-100">
                <TabsTrigger value="basic" className="bg-pink-100 data-[state=active]:bg-pink-200">Basic</TabsTrigger>
                <TabsTrigger value="advanced" className="bg-pink-100 data-[state=active]:bg-pink-200">Advanced</TabsTrigger>
                <TabsTrigger value="penalties" className="bg-pink-100 data-[state=active]:bg-pink-200">Penalties</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                {renderSlider(
                  "Temperature",
                  temperature,
                  setTemperature,
                  0,
                  2,
                  0.1,
                  "Controls randomness: Lower values make the output more focused and deterministic."
                )}
                {renderSlider(
                  "Max Tokens",
                  maxTokens,
                  setMaxTokens,
                  1,
                  2048,
                  1,
                  "The maximum number of tokens to generate in the response."
                )}
              </TabsContent>
              <TabsContent value="advanced">
                {renderSlider(
                  "Top P",
                  topP,
                  setTopP,
                  0,
                  1,
                  0.1,
                  "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered."
                )}
              </TabsContent>
              <TabsContent value="penalties">
                {renderSlider(
                  "Frequency Penalty",
                  frequencyPenalty,
                  setFrequencyPenalty,
                  -2,
                  2,
                  0.1,
                  "Decreases the model's likelihood to repeat the same line verbatim."
                )}
                {renderSlider(
                  "Presence Penalty",
                  presencePenalty,
                  setPresencePenalty,
                  -2,
                  2,
                  0.1,
                  "Increases the model's likelihood to talk about new topics."
                )}
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