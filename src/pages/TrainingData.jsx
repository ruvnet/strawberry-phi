import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '../contexts/ApiKeyContext';
import TrainingDataDisplay from '../components/TrainingDataDisplay';
import ModelSelector from '../components/ModelSelector';
import ReactMarkdown from 'react-markdown';

const TrainingData = () => {
  const { toast } = useToast();
  const { apiKey } = useApiKey();
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [config, setConfig] = useState({
    numExamples: 10,
    temperature: 0.7,
    maxCompletionTokens: 200,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    guidancePrompt: `Generate a diverse set of user requests for an advanced AI assistant. 
Requests should cover various domains such as marketing, finance, technology, 
healthcare, education, and more. Each request should be a complex task that 
an executive or professional might ask, requiring detailed analysis, planning, 
or creative solutions.`,
  });
  const [generatedData, setGeneratedData] = useState(null);
  const [rawResponse, setRawResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prevConfig => ({ ...prevConfig, [name]: value }));
  };

  const handleSliderChange = (name, value) => {
    setConfig(prevConfig => ({ ...prevConfig, [name]: value[0] }));
  };

  const generateTrainingData = async () => {
    if (!apiKey) {
      toast({ title: "API Key Missing", description: "Please set your OpenAI API key in the Settings page.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setGeneratedData(null);
    setRawResponse('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: "system", content: "You are an AI assistant that generates training data." },
            { role: "user", content: config.guidancePrompt }
          ],
          n: parseInt(config.numExamples, 10),
          max_completion_tokens: parseInt(config.maxCompletionTokens, 10),
          temperature: parseFloat(config.temperature),
          top_p: parseFloat(config.topP),
          frequency_penalty: parseFloat(config.frequencyPenalty),
          presence_penalty: parseFloat(config.presencePenalty),
        }),
      });

      const data = await response.json();
      setRawResponse(JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.error?.message || 'Unknown error');
      }

      const formattedData = data.choices.map(choice => ({
        messages: [
          { role: "system", content: "You are an advanced, multi-modal autonomous AI agent with exceptional capabilities." },
          { role: "user", content: choice.message.content },
          { role: "assistant", content: "This is a placeholder response. In real training data, this would be the AI's response." }
        ]
      }));

      setGeneratedData(formattedData);
      toast({ title: "Generation Complete", description: `${formattedData.length} examples have been generated.` });
    } catch (error) {
      console.error('Error generating training data:', error);
      toast({
        title: "Generation Failed",
        description: error.message || 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
      <h1 className="text-2xl font-bold text-strawberry-800">Training Data Generation</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ModelSelector onModelSelect={setSelectedModel} defaultModel="gpt-4o-mini" />
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-pink-100">
                <TabsTrigger value="basic" className="bg-pink-100 data-[state=active]:bg-pink-200">Basic</TabsTrigger>
                <TabsTrigger value="advanced" className="bg-pink-100 data-[state=active]:bg-pink-200">Advanced</TabsTrigger>
                <TabsTrigger value="prompt" className="bg-pink-100 data-[state=active]:bg-pink-200">Prompt</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="numExamples" className="text-strawberry-700">Number of Examples</Label>
                    <Input
                      id="numExamples"
                      name="numExamples"
                      type="number"
                      value={config.numExamples}
                      onChange={handleInputChange}
                      className="border-strawberry-300 focus:border-strawberry-500"
                    />
                  </div>
                  {renderSlider(
                    "Temperature",
                    config.temperature,
                    (value) => handleSliderChange('temperature', value),
                    0,
                    2,
                    0.1,
                    "Controls randomness: Lower values make the output more focused and deterministic."
                  )}
                  {renderSlider(
                    "Max Completion Tokens",
                    config.maxCompletionTokens,
                    (value) => handleSliderChange('maxCompletionTokens', value),
                    1,
                    2048,
                    1,
                    "The maximum number of tokens to generate in the response."
                  )}
                </div>
              </TabsContent>
              <TabsContent value="advanced">
                <div className="space-y-4">
                  {renderSlider(
                    "Top P",
                    config.topP,
                    (value) => handleSliderChange('topP', value),
                    0,
                    1,
                    0.1,
                    "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered."
                  )}
                  {renderSlider(
                    "Frequency Penalty",
                    config.frequencyPenalty,
                    (value) => handleSliderChange('frequencyPenalty', value),
                    -2,
                    2,
                    0.1,
                    "Decreases the model's likelihood to repeat the same line verbatim."
                  )}
                  {renderSlider(
                    "Presence Penalty",
                    config.presencePenalty,
                    (value) => handleSliderChange('presencePenalty', value),
                    -2,
                    2,
                    0.1,
                    "Increases the model's likelihood to talk about new topics."
                  )}
                </div>
              </TabsContent>
              <TabsContent value="prompt">
                <div>
                  <Label htmlFor="guidancePrompt" className="text-strawberry-700">Guidance Prompt</Label>
                  <Textarea
                    id="guidancePrompt"
                    name="guidancePrompt"
                    value={config.guidancePrompt}
                    onChange={handleInputChange}
                    rows={6}
                    className="border-strawberry-300 focus:border-strawberry-500"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <Button 
              onClick={generateTrainingData} 
              className="mt-4 bg-strawberry-500 hover:bg-strawberry-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Training Data'}
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Generated Training Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="formatted">
              <TabsList className="mb-4">
                <TabsTrigger value="formatted">Formatted</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>
              <TabsContent value="formatted">
                {generatedData ? (
                  <TrainingDataDisplay data={generatedData} />
                ) : (
                  <p className="text-strawberry-600">No data generated yet. Configure and run the generation to see results.</p>
                )}
              </TabsContent>
              <TabsContent value="raw">
                {rawResponse ? (
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code className="text-sm text-strawberry-800">{rawResponse}</code>
                  </pre>
                ) : (
                  <p className="text-strawberry-600">No data generated yet. Configure and run the generation to see results.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingData;