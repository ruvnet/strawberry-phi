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
or creative solutions.

This configuration file defines an advanced multi-modal, agentic AI assistant named **AdvancedMultiModalAgenticAssistant**, built upon the **phi-mini-128k** base model. Designed to handle complex tasks across various domains, it leverages Glaive's schema-based approach and synthetic data generation capabilities for customization and efficiency.

**Agentic Approaches:**
The assistant incorporates a variety of AI methodologies, including sequential, concurrent, recurrent, and reinforcement learning techniques. It also utilizes advanced strategies like Q* and other hybrid approaches to enhance task management, planning, and execution.

**Dataset Schema:**
A comprehensive dataset schema defines structured input and output formats, encompassing fields for task understanding, planning, execution, and self-reflection. This structured approach ensures the assistant can effectively interpret and manage complex tasks.

**Training Parameters:**
The training process specifies key parameters such as the number of epochs, batch size, and learning rate. It outlines both initial and specialized training phases, with provisions for continual learning to adapt over time.

**Evaluation Metrics:**
Various metrics are listed to assess model performance, including accuracy, efficiency, and error rates. Performance tracking allows for ongoing optimization and ensures the assistant meets desired standards.

**Advanced Features:**

- **Error Handling Mechanisms:** Robust systems are in place to detect and correct errors during task execution.
- **Bias Mitigation Strategies:** Techniques are employed to minimize biases in the assistant's responses.
- **Personalization Capabilities:** The model can adapt to individual user preferences for a tailored experience.
- **Performance Tracking:** Continuous monitoring of performance metrics enables ongoing improvement.
- **Multi-Task Learning Support:** The assistant can handle multiple tasks simultaneously, increasing productivity.
- **Human-in-the-Loop Integration:** Incorporates human feedback to refine and enhance outputs.

By combining these components, the **AdvancedMultiModalAgenticAssistant** is equipped to manage complex, multi-modal tasks effectively. Its design emphasizes adaptability, efficiency, and continuous improvement, making it a versatile tool suitable for a wide range of applications. The integration of advanced methodologies and comprehensive training strategies positions it as a cutting-edge solution in the field of AI assistants.`,
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