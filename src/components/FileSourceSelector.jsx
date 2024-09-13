import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FileSourceSelector = ({ usePreExistingFile, setUsePreExistingFile }) => {
  return (
    <div>
      <Label htmlFor="fileSource" className="text-strawberry-600">File Source</Label>
      <RadioGroup defaultValue={usePreExistingFile ? "preExisting" : "upload"} onValueChange={(value) => setUsePreExistingFile(value === "preExisting")}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upload" id="upload" />
          <Label htmlFor="upload">Upload new file</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="preExisting" id="preExisting" />
          <Label htmlFor="preExisting">Strawberry Phi Data Set - 2500 agentic flows</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default FileSourceSelector;