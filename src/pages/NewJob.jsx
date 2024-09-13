import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '../contexts/ApiKeyContext';
import { createFineTuningJob } from '../utils/openaiApi';
import FileUploadSection from '../components/FileUploadSection';
import ParameterSection from '../components/ParameterSection';
import ModelSelector from '../components/ModelSelector';

const NewJob = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [jsonContent, setJsonContent] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [learningRate, setLearningRate] = useState('0.001');
  const [epochs, setEpochs] = useState('3');
  const [batchSize, setBatchSize] = useState('8');
  const [isLoading, setIsLoading] = useState(false);
  const [usePreExistingFile, setUsePreExistingFile] = useState(false);
  const { apiKey } = useApiKey();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('trainingData');
    if (storedData) {
      setJsonContent(storedData);
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (usePreExistingFile || jsonContent) {
        const contentToUse = usePreExistingFile ? await fetch('/finetune/strawberry-phi.jsonl').then(res => res.text()) : jsonContent;
        const jsonBlob = new Blob([contentToUse], { type: 'application/json' });
        formData.append('file', jsonBlob, 'training_data.jsonl');
      } else if (file) {
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
      <p className="text-strawberry-600 mb-6">
        Create a new fine-tuning job to customize GPT models for your specific needs. 
        Follow the steps below to upload your training data, select a model, and configure 
        the fine-tuning parameters.
      </p>
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
              <Button 
                onClick={() => setActiveTab("model")} 
                disabled={!file && !usePreExistingFile && !jsonContent} 
                className="bg-strawberry-500 hover:bg-strawberry-600 text-white mt-4"
              >
                Continue
              </Button>
            </TabsContent>
            <TabsContent value="model">
              <ModelSelector model={model} setModel={setModel} />
              <div className="space-x-2 mt-4">
                <Button onClick={() => setActiveTab("upload")} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                <Button onClick={() => setActiveTab("configure")} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Continue</Button>
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