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
import FileUploadSection from '../components/FileUploadSection';
import ParameterSection from '../components/ParameterSection';
import JsonDisplay from '../components/JsonDisplay';

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
              <FileUploadSection
                usePreExistingFile={usePreExistingFile}
                setUsePreExistingFile={setUsePreExistingFile}
                file={file}
                setFile={setFile}
                jsonContent={jsonContent}
                setJsonContent={setJsonContent}
              />
              <Button onClick={() => setActiveTab("model")} disabled={!file && !usePreExistingFile} className="bg-strawberry-500 hover:bg-strawberry-600 text-white mt-4">Continue</Button>
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
              <ParameterSection
                learningRate={learningRate}
                setLearningRate={setLearningRate}
                epochs={epochs}
                setEpochs={setEpochs}
                batchSize={batchSize}
                setBatchSize={setBatchSize}
              />
              <div className="space-x-2 mt-4">
                <Button onClick={() => setActiveTab("model")} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                <Button onClick={handleSubmit} disabled={isLoading} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
                  {isLoading ? 'Creating Job...' : 'Start Job'}
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default NewJob;