import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import ModelSelector from '../components/ModelSelector';
import { useApiKey } from '../contexts/ApiKeyContext';
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/components/ui/use-toast";

const ModelTesting = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [rawResponse, setRawResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(150);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
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
        temperature: temperature,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
      };

      // Use the correct parameter based on the model
      if (isO1Model) {
        params.max_completion_tokens = maxTokens;
      } else {
        params.max_tokens = maxTokens;
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

      setResponse(data.choices[0].message.content);
      setRawResponse(JSON.stringify(data, null, 2));
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
            <ModelSelector onModelSelect={setSelectedModel} defaultModel="gpt-4o-mini" />
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
            <Tabs defaultValue="rendered">
              <TabsList className="mb-4">
                <TabsTrigger value="rendered">Rendered</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>
              <TabsContent value="rendered">
                {response ? (
                  <div className="prose prose-strawberry max-w-none">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-strawberry-600">No response yet. Test the model to see results.</p>
                )}
              </TabsContent>
              <TabsContent value="raw">
                {rawResponse ? (
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code className="text-sm text-strawberry-800">{rawResponse}</code>
                  </pre>
                ) : (
                  <p className="text-strawberry-600">No response yet. Test the model to see results.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModelTesting;