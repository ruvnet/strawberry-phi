import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '../contexts/ApiKeyContext';
import { generateTrainingData } from '../../finetune/data-creator';
import TrainingDataDisplay from '../components/TrainingDataDisplay';

const TrainingData = () => {
  const { toast } = useToast();
  const { apiKey } = useApiKey();
  const [config, setConfig] = useState({
    modelName: 'gpt-o1-mini',
    outputFile: 'training_data.jsonl',
    numExamples: 150,
    concurrentRequests: 10,
    retryLimit: 3,
    backoffFactor: 2,
    guidancePrompt: `Generate a diverse set of user requests for an advanced AI assistant. 
Requests should cover various domains such as marketing, finance, technology, 
healthcare, education, and more. Each request should be a complex task that 
an executive or professional might ask, requiring detailed analysis, planning, 
or creative solutions.`,
    temperature: 0.8,
    maxTokens: 200,
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

  const handleSelectChange = (name, value) => {
    setConfig(prevConfig => ({ ...prevConfig, [name]: value }));
  };

  const handleGenerateTrainingData = async () => {
    if (!apiKey) {
      toast({ title: "API Key Missing", description: "Please set your OpenAI API key in the Settings page.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    toast({ title: "Generation Started", description: "Training data generation has begun. This may take a while." });

    try {
      const result = await generateTrainingData({ ...config, API_KEY: apiKey });
      setGeneratedData(result.trainingData);
      toast({ title: "Generation Complete", description: `${result.numExamples} examples have been generated.` });
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
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3 bg-pink-100">
              <TabsTrigger value="basic" className="bg-pink-100 data-[state=active]:bg-pink-200">Basic</TabsTrigger>
              <TabsTrigger value="advanced" className="bg-pink-100 data-[state=active]:bg-pink-200">Advanced</TabsTrigger>
              <TabsTrigger value="prompt" className="bg-pink-100 data-[state=active]:bg-pink-200">Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <ConfigSection config={config} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedConfigSection config={config} handleInputChange={handleInputChange} handleSliderChange={handleSliderChange} />
            </TabsContent>
            <TabsContent value="prompt">
              <PromptSection config={config} handleInputChange={handleInputChange} />
            </TabsContent>
          </Tabs>
          <Button 
            onClick={handleGenerateTrainingData} 
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

const ConfigSection = ({ config, handleInputChange, handleSelectChange }) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="modelName">Model Name</Label>
      <Select value={config.modelName} onValueChange={(value) => handleSelectChange('modelName', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-o1-mini">GPT-o1-mini</SelectItem>
          <SelectItem value="gpt-o1">GPT-o1</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="numExamples">Number of Examples</Label>
      <Input id="numExamples" name="numExamples" value={config.numExamples} onChange={handleInputChange} type="number" />
    </div>
    <div>
      <Label htmlFor="outputFile">Output File Name</Label>
      <Input id="outputFile" name="outputFile" value={config.outputFile} onChange={handleInputChange} />
    </div>
  </div>
);

const AdvancedConfigSection = ({ config, handleInputChange, handleSliderChange }) => (
  <div className="space-y-4">
    <SliderInput label="Concurrent Requests" id="concurrentRequests" value={config.concurrentRequests} onChange={handleSliderChange} min={1} max={20} step={1} />
    <SliderInput label="Temperature" id="temperature" value={config.temperature} onChange={handleSliderChange} min={0} max={1} step={0.1} />
    <div>
      <Label htmlFor="retryLimit">Retry Limit</Label>
      <Input id="retryLimit" name="retryLimit" value={config.retryLimit} onChange={handleInputChange} type="number" />
    </div>
    <div>
      <Label htmlFor="backoffFactor">Backoff Factor</Label>
      <Input id="backoffFactor" name="backoffFactor" value={config.backoffFactor} onChange={handleInputChange} type="number" />
    </div>
    <div>
      <Label htmlFor="maxTokens">Max Tokens</Label>
      <Input id="maxTokens" name="maxTokens" value={config.maxTokens} onChange={handleInputChange} type="number" />
    </div>
  </div>
);

const SliderInput = ({ label, id, value, onChange, min, max, step }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Slider
      id={id}
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(value) => onChange(id, value)}
    />
    <span>{value}</span>
  </div>
);

const PromptSection = ({ config, handleInputChange }) => (
  <div>
    <Label htmlFor="guidancePrompt">Guidance Prompt</Label>
    <Textarea
      id="guidancePrompt"
      name="guidancePrompt"
      value={config.guidancePrompt}
      onChange={handleInputChange}
      rows={10}
    />
  </div>
);

export default TrainingData;