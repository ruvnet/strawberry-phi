import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '../contexts/ApiKeyContext';
import TrainingDataDisplay from '../components/TrainingDataDisplay';
import ModelSelector from '../components/ModelSelector';
import ConfigurationPanel from '../components/ConfigurationPanel';
import GeneratedDataPanel from '../components/GeneratedDataPanel';

const TrainingData = () => {
  const { toast } = useToast();
  const { apiKey } = useApiKey();
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini-2024-07-18');
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
          max_tokens: parseInt(config.maxCompletionTokens, 10),
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

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Training Data Generation</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ModelSelector onModelSelect={setSelectedModel} defaultModel="gpt-4o-mini-2024-07-18" />
            <ConfigurationPanel config={config} setConfig={setConfig} />
            <Button 
              onClick={generateTrainingData} 
              className="mt-4 bg-strawberry-500 hover:bg-strawberry-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Training Data'}
            </Button>
          </CardContent>
        </Card>
        <GeneratedDataPanel generatedData={generatedData} rawResponse={rawResponse} />
      </div>
    </div>
  );
};

export default TrainingData;