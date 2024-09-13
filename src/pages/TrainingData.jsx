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

const TrainingData = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    apiKey: '',
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

  const generateTrainingData = async () => {
    // This function would typically call the backend to run the data creation script
    // For now, we'll just simulate the process
    toast({
      title: "Generation Started",
      description: "Training data generation has begun. This may take a while.",
    });

    // Simulating a delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    toast({
      title: "Generation Complete",
      description: `${config.numExamples} examples have been generated and saved to ${config.outputFile}`,
    });
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
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" name="apiKey" value={config.apiKey} onChange={handleInputChange} type="password" />
                </div>
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
              </div>
            </TabsContent>
            <TabsContent value="advanced">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="concurrentRequests">Concurrent Requests</Label>
                  <Slider
                    id="concurrentRequests"
                    min={1}
                    max={20}
                    step={1}
                    value={[config.concurrentRequests]}
                    onValueChange={(value) => handleSliderChange('concurrentRequests', value)}
                  />
                  <span>{config.concurrentRequests}</span>
                </div>
                <div>
                  <Label htmlFor="retryLimit">Retry Limit</Label>
                  <Input id="retryLimit" name="retryLimit" value={config.retryLimit} onChange={handleInputChange} type="number" />
                </div>
                <div>
                  <Label htmlFor="backoffFactor">Backoff Factor</Label>
                  <Input id="backoffFactor" name="backoffFactor" value={config.backoffFactor} onChange={handleInputChange} type="number" />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature</Label>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1}
                    step={0.1}
                    value={[config.temperature]}
                    onValueChange={(value) => handleSliderChange('temperature', value)}
                  />
                  <span>{config.temperature}</span>
                </div>
                <div>
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <Input id="maxTokens" name="maxTokens" value={config.maxTokens} onChange={handleInputChange} type="number" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="prompt">
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
            </TabsContent>
          </Tabs>
          <Button onClick={generateTrainingData} className="mt-4 bg-strawberry-500 hover:bg-strawberry-600 text-white">
            Generate Training Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingData;