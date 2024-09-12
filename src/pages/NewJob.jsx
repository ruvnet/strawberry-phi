import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '../contexts/ApiKeyContext';
import { createFineTuningJob } from '../utils/openaiApi';

const NewJob = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [model, setModel] = useState('gpt-4o');
  const [learningRate, setLearningRate] = useState('0.001');
  const [epochs, setEpochs] = useState('3');
  const [batchSize, setBatchSize] = useState('8');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey } = useApiKey();
  const { toast } = useToast();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('model', model);
      formData.append('learning_rate', learningRate);
      formData.append('epochs', epochs);
      formData.append('batch_size', batchSize);

      const response = await createFineTuningJob(apiKey, formData);
      toast({
        title: "Job Created Successfully",
        description: `Job ID: ${response.id}`,
      });
      // Reset form or redirect to job status page
    } catch (error) {
      toast({
        title: "Error Creating Job",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">New Fine-tuning Job</h1>
      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">Step {step} of 3</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <Label htmlFor="file" className="text-strawberry-600">Upload JSONL File</Label>
              <Input id="file" type="file" accept=".jsonl" onChange={handleFileChange} className="border-strawberry-300 focus:border-strawberry-500" />
              <Textarea
                className="mt-2 text-strawberry-600"
                readOnly
                value="The JSONL file should contain prompt-completion pairs for fine-tuning. Each line should be a JSON object with 'prompt' and 'completion' keys. Example:
                {'prompt': 'Translate the following English text to French: Hello, how are you?', 'completion': 'Bonjour, comment allez-vous?'}
                {'prompt': 'What is the capital of France?', 'completion': 'The capital of France is Paris.'}"
              />
              <Button onClick={nextStep} disabled={!file} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Continue</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-strawberry-600">Select Model</Label>
              <RadioGroup defaultValue={model} onValueChange={setModel}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt-4o" id="gpt4o" className="border-strawberry-400 text-strawberry-600" />
                  <Label htmlFor="gpt4o" className="text-strawberry-600">GPT-4o</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt-4o-mini" id="gpt4omini" className="border-strawberry-400 text-strawberry-600" />
                  <Label htmlFor="gpt4omini" className="text-strawberry-600">GPT-4o-mini</Label>
                </div>
              </RadioGroup>
              <Textarea
                className="mt-2 text-strawberry-600"
                readOnly
                value={`${model === 'gpt-4o' ? 'GPT-4o is the full-sized model with maximum capabilities, suitable for complex tasks and high-quality outputs.' : 'GPT-4o-mini is a smaller version that offers faster processing and lower resource requirements, suitable for quicker deployments or less complex tasks.'}`}
              />
              <div className="space-x-2">
                <Button onClick={prevStep} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                <Button onClick={nextStep} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Continue</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <Label htmlFor="learningRate" className="text-strawberry-600">Learning Rate</Label>
              <Input
                id="learningRate"
                type="number"
                value={learningRate}
                onChange={(e) => setLearningRate(e.target.value)}
                min="0.00001"
                max="0.1"
                step="0.00001"
                className="border-strawberry-300 focus:border-strawberry-500"
              />
              <Textarea
                className="mt-2 text-strawberry-600"
                readOnly
                value="The learning rate determines how quickly the model adapts to the new data. A typical range is between 0.00001 and 0.1. Lower values result in slower learning but can lead to better convergence."
              />
              <Label htmlFor="epochs" className="text-strawberry-600">Epochs</Label>
              <Input
                id="epochs"
                type="number"
                value={epochs}
                onChange={(e) => setEpochs(e.target.value)}
                min="1"
                max="10"
                className="border-strawberry-300 focus:border-strawberry-500"
              />
              <Textarea
                className="mt-2 text-strawberry-600"
                readOnly
                value="Epochs represent the number of times the model will cycle through the entire dataset. More epochs can lead to better learning but may also result in overfitting. A typical range is 1-5 epochs."
              />
              <Label htmlFor="batchSize" className="text-strawberry-600">Batch Size</Label>
              <Select value={batchSize} onValueChange={setBatchSize}>
                <SelectTrigger id="batchSize" className="border-strawberry-300 focus:border-strawberry-500">
                  <SelectValue placeholder="Select batch size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="32">32</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                className="mt-2 text-strawberry-600"
                readOnly
                value="Batch size determines how many examples the model processes before updating its parameters. Larger batch sizes can lead to faster training but may require more memory. Common values are 8, 16, or 32."
              />
              <div className="space-x-2">
                <Button onClick={prevStep} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                <Button onClick={handleSubmit} disabled={isLoading} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
                  {isLoading ? 'Creating Job...' : 'Start Job'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewJob;