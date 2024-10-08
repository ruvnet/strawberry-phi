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
import JobSubmissionSection from '../components/JobSubmissionSection';
import ApiResponseDisplay from '../components/ApiResponseDisplay';

const NewJob = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [jsonContent, setJsonContent] = useState('');
  const [model, setModel] = useState('gpt-4o-2024-08-06');
  const [learningRate, setLearningRate] = useState('0.001');
  const [epochs, setEpochs] = useState('3');
  const [batchSize, setBatchSize] = useState('8');
  const [jobSuffix, setJobSuffix] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usePreExistingFile, setUsePreExistingFile] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
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
    setApiResponse(null);
    try {
      let fileId;
      if (usePreExistingFile) {
        fileId = 'file-abc123'; // Replace with actual file ID for pre-existing file
      } else if (jsonContent) {
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const file = new File([blob], 'training_data.jsonl', { type: 'application/json' });
        fileId = await uploadFile(file);
      } else {
        throw new Error('No file selected or JSONL content provided');
      }

      const jobData = {
        training_file: fileId,
        model: model,
        suffix: jobSuffix,
        hyperparameters: {
          learning_rate_multiplier: parseFloat(learningRate),
          n_epochs: parseInt(epochs, 10),
          batch_size: parseInt(batchSize, 10)
        }
      };

      const response = await createFineTuningJob(apiKey, jobData);
      setApiResponse(response);
      toast({
        title: "Job Created Successfully",
        description: `Job ID: ${response.id}`,
      });
    } catch (error) {
      setApiResponse({ error: error.message });
      toast({
        title: "Error Creating Job",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', 'fine-tune');

    const response = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload file');
    }

    const data = await response.json();
    return data.id;
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
                jsonContent={jsonContent}
                setJsonContent={setJsonContent}
              />
              <Button 
                onClick={() => setActiveTab("model")} 
                disabled={!jsonContent} 
                className="bg-strawberry-500 hover:bg-strawberry-600 text-white mt-4"
              >
                Continue
              </Button>
            </TabsContent>
            <TabsContent value="model">
              <ModelSelector model={model} setModel={setModel} forFineTuning={true} />
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
                jobSuffix={jobSuffix}
                setJobSuffix={setJobSuffix}
              />
              <JobSubmissionSection
                onBack={() => setActiveTab("model")}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      <ApiResponseDisplay apiResponse={apiResponse} />
    </div>
  );
};

export default NewJob;