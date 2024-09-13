import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '../contexts/ApiKeyContext';
import ModelSelector from '../components/ModelSelector';
import ConfigurationPanel from '../components/ConfigurationPanel';
import GeneratedDataPanel from '../components/GeneratedDataPanel';
import { generateTrainingData } from '../utils/dataGenerator';

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

  const handleGenerateData = async () => {
    if (!apiKey) {
      toast({ title: "API Key Missing", description: "Please set your OpenAI API key in the Settings page.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setGeneratedData(null);
    setRawResponse('');

    try {
      const result = await generateTrainingData(apiKey, selectedModel, config);
      setGeneratedData(result.data);
      setRawResponse(JSON.stringify(result.rawResponse, null, 2));
      toast({ title: "Generation Complete", description: `${result.data.length} examples have been generated.` });
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
      <p className="text-strawberry-600 mb-4">
        Generate synthetic data for training your AI model. This process creates diverse, 
        high-quality examples that simulate real-world scenarios, enhancing your model's 
        performance across various domains and complex tasks.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ModelSelector onModelSelect={setSelectedModel} defaultModel="gpt-4o-mini-2024-07-18" />
            <ConfigurationPanel config={config} setConfig={setConfig} />
            <Button 
              onClick={handleGenerateData} 
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