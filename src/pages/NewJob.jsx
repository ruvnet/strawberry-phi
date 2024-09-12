import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiKey } from '../contexts/ApiKeyContext';
import { createFineTuningJob } from '../utils/openaiApi';

const NewJob = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [model, setModel] = useState('gpt-4o');
  const [learningRate, setLearningRate] = useState('0.001');
  const [epochs, setEpochs] = useState('3');
  const [batchSize, setBatchSize] = useState('8');
  const [isLoading, setIsLoading] = useState(false);
  const [jsonContent, setJsonContent] = useState('');
  const [usePreExistingFile, setUsePreExistingFile] = useState(false);
  const { apiKey } = useApiKey();
  const { toast } = useToast();

  useEffect(() => {
    if (usePreExistingFile) {
      fetch('/finetune/strawberry-phi.jsonl')
        .then(response => response.text())
        .then(data => setJsonContent(data))
        .catch(error => console.error('Error loading pre-existing file:', error));
    }
  }, [usePreExistingFile]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setJsonContent(content);
        // Save to local storage
        localStorage.setItem('uploadedJsonFile', content);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (usePreExistingFile) {
        const preExistingFileBlob = new Blob([jsonContent], { type: 'application/json' });
        formData.append('file', preExistingFileBlob, 'strawberry-phi.jsonl');
      } else {
        formData.append('file', file);
      }
      formData.append('model', model);
      formData.append('learning_rate', learningRate);
      formData.append('epochs', epochs);
      formData.append('batch_size', batchSize);

      const response = await createFineTuningJob(apiKey, formData);
      toast({
        title: "Job Created Successfully",
        description: `Job ID: ${response.id}`,
      });
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-pink-100">
          <TabsTrigger value="upload" className="data-[state=active]:bg-pink-300">Upload File</TabsTrigger>
          <TabsTrigger value="model" className="data-[state=active]:bg-pink-300">Select Model</TabsTrigger>
          <TabsTrigger value="configure" className="data-[state=active]:bg-pink-300">Configure</TabsTrigger>
        </TabsList>
        <Card className="mt-4 bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardContent className="pt-6">
            <TabsContent value="upload">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fileSource" className="text-strawberry-600">File Source</Label>
                  <RadioGroup defaultValue={usePreExistingFile ? "preExisting" : "upload"} onValueChange={(value) => setUsePreExistingFile(value === "preExisting")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upload" id="upload" />
                      <Label htmlFor="upload">Upload new file</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="preExisting" id="preExisting" />
                      <Label htmlFor="preExisting">Use pre-existing file (strawberry-phi.jsonl)</Label>
                    </div>
                  </RadioGroup>
                </div>
                {!usePreExistingFile && (
                  <div>
                    <Label htmlFor="file" className="text-strawberry-600">Upload JSONL File</Label>
                    <Input id="file" type="file" accept=".jsonl" onChange={handleFileChange} className="border-strawberry-300 focus:border-strawberry-500" />
                  </div>
                )}
                <Textarea
                  className="mt-2 text-strawberry-600 h-48"
                  value={jsonContent}
                  readOnly
                  placeholder={usePreExistingFile ? "Loading pre-existing file content..." : "Upload a file to see its content here"}
                />
                <Button onClick={() => setActiveTab("model")} disabled={!file && !usePreExistingFile} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Continue</Button>
              </div>
            </TabsContent>
            <TabsContent value="model">
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
                  <Button onClick={() => setActiveTab("upload")} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                  <Button onClick={() => setActiveTab("configure")} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Continue</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="configure">
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
                  <Button onClick={() => setActiveTab("model")} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                  <Button onClick={handleSubmit} disabled={isLoading} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
                    {isLoading ? 'Creating Job...' : 'Start Job'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default NewJob;