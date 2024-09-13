import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const TrainingDataDisplay = ({ data, onSave, onDownload }) => {
  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </ScrollArea>
      <div className="flex space-x-2">
        <Button onClick={onSave} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
          Save to Local Storage
        </Button>
        <Button onClick={onDownload} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
          Download JSON
        </Button>
      </div>
    </div>
  );
};

export default TrainingDataDisplay;