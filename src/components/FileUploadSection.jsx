import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import JsonDisplay from './JsonDisplay';

const FileUploadSection = ({ usePreExistingFile, setUsePreExistingFile, file, setFile, jsonContent, setJsonContent }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setJsonContent(content);
        localStorage.setItem('uploadedJsonFile', content);
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
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
          <Input id="file" type="file" accept=".jsonl,.csv,.parquet" onChange={handleFileChange} className="border-strawberry-300 focus:border-strawberry-500" />
          <p className="text-sm text-strawberry-600 mt-2">
            Accepted file types: JSONL, CSV, Parquet. CSV and Parquet files will be automatically converted to JSONL format.
          </p>
        </div>
      )}
      <JsonDisplay jsonContent={jsonContent} />
      {file && !usePreExistingFile && (
        <div className="mt-4">
          <Button onClick={() => {/* Implement file conversion logic here */}} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
            Convert to JSONL
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;