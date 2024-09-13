import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TrainingDataDisplay = ({ data }) => {
  const { toast } = useToast();

  const validateAndCorrectData = (inputData) => {
    let correctedData = [];
    let errors = [];

    inputData.forEach((item, index) => {
      if (typeof item === 'object' && item !== null && 'messages' in item) {
        correctedData.push(item);
      } else {
        try {
          const corrected = {
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: JSON.stringify(item) },
              { role: "assistant", content: "I'm sorry, but I don't have enough context to provide a specific response to that input." }
            ]
          };
          correctedData.push(corrected);
          errors.push(`Line ${index + 1} was automatically corrected.`);
        } catch (error) {
          errors.push(`Line ${index + 1} could not be corrected and was omitted.`);
        }
      }
    });

    if (correctedData.length < 10) {
      errors.push("Warning: The corrected data has less than 10 examples.");
    }

    return { correctedData, errors };
  };

  const handleSaveToLocalStorage = () => {
    try {
      const { correctedData, errors } = validateAndCorrectData(data);
      const jsonlData = correctedData.map(item => JSON.stringify(item)).join('\n');
      localStorage.setItem('trainingData', jsonlData);
      
      if (errors.length > 0) {
        toast({
          title: "Data Corrected",
          description: `Training data saved with corrections. ${errors.join(' ')}`,
          variant: "warning",
        });
      } else {
        toast({
          title: "Saved",
          description: "Training data saved to local storage.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save training data to local storage.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const { correctedData, errors } = validateAndCorrectData(data);
    const jsonlData = correctedData.map(item => JSON.stringify(item)).join('\n');
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsonlData);
    const exportFileDefaultName = 'training_data.jsonl';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    if (errors.length > 0) {
      toast({
        title: "Data Corrected",
        description: `Training data downloaded with corrections. ${errors.join(' ')}`,
        variant: "warning",
      });
    } else {
      toast({
        title: "Downloaded",
        description: "Training data downloaded successfully.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </ScrollArea>
      <div className="flex space-x-2">
        <Button onClick={handleSaveToLocalStorage} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
          Save to Local Storage
        </Button>
        <Button onClick={handleDownload} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
          Download JSONL
        </Button>
      </div>
    </div>
  );
};

export default TrainingDataDisplay;