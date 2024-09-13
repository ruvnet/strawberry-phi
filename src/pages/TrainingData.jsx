import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '../contexts/ApiKeyContext';
import TrainingDataDisplay from '../components/TrainingDataDisplay';
import ConfigSection from '../components/ConfigSection';

const TrainingData = () => {
  const { toast } = useToast();
  const { apiKey } = useApiKey();
  const [config, setConfig] = useState({
    modelName: 'gpt-4o-mini',
    numExamples: 10,
    temperature: 0.8,
    maxTokens: 200,
    guidancePrompt: `Generate a diverse set of user requests for an advanced AI assistant. 
Requests should cover various domains such as marketing, finance, technology, 
healthcare, education, and more. Each request should be a complex task that 
an executive or professional might ask, requiring detailed analysis, planning, 
or creative solutions.`,
  });
  const [generatedData, setGeneratedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    setGeneratedData(null);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: config.modelName,
          messages: [
            { role: "system", content: "You are an AI assistant that generates training data." },
            { role: "user", content: config.guidancePrompt }
          ],
          n: config.numExamples,
          max_tokens: config.maxTokens,
          temperature: config.temperature,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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
      setError(error.message || 'An unknown error occurred');
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
      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <ConfigSection config={config} handleInputChange={handleInputChange} handleSliderChange={handleSliderChange} />
          <Button 
            onClick={generateTrainingData} 
            className="mt-4 bg-strawberry-500 hover:bg-strawberry-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Training Data'}
          </Button>
        </CardContent>
      </Card>
      {error && (
        <Card className="bg-red-100 border-red-300 text-red-800 p-4 mt-4">
          <CardTitle>Error</CardTitle>
          <CardContent>{error}</CardContent>
        </Card>
      )}
      {generatedData && (
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200 mt-4">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Generated Training Data</CardTitle>
          </CardHeader>
          <CardContent>
            <TrainingDataDisplay data={generatedData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingData;