import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TrainingDataDisplay = ({ data }) => {
  const { toast } = useToast();

  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem('trainingData', JSON.stringify(data));
      toast({
        title: "Saved",
        description: "Training data saved to local storage.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save training data to local storage.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'training_data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
          Download JSON
        </Button>
      </div>
    </div>
  );
};

export default TrainingDataDisplay;