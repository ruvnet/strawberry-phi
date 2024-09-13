import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import JsonDisplay from './JsonDisplay';

const FileUploadSection = ({ usePreExistingFile, setUsePreExistingFile, jsonContent, setJsonContent }) => {
  const [validationError, setValidationError] = useState(null);

  const validateAndSetJsonContent = (content) => {
    try {
      const lines = content.trim().split('\n');
      const parsedLines = lines.map(line => JSON.parse(line));
      
      if (parsedLines.every(line => typeof line === 'object' && line !== null && 'messages' in line)) {
        setJsonContent(content);
        localStorage.setItem('uploadedJsonFile', content);
        setValidationError(null);
      } else {
        throw new Error("Each line must be a valid JSON object with a 'messages' key");
      }
    } catch (error) {
      setValidationError("Invalid JSONL format. Each line must be a valid JSON object with a 'messages' key.");
      setJsonContent('');
    }
  };

  const handleJsonContentChange = (e) => {
    const content = e.target.value;
    validateAndSetJsonContent(content);
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
          <Label htmlFor="jsonContent" className="text-strawberry-600">JSONL Content</Label>
          <Textarea
            id="jsonContent"
            value={jsonContent}
            onChange={handleJsonContentChange}
            className="w-full h-40 p-2 border rounded border-strawberry-300 focus:border-strawberry-500"
            placeholder="Paste your JSONL content here. Each line should be a valid JSON object with a 'messages' key."
          />
          <p className="text-sm text-strawberry-600 mt-2">
            Only JSONL format is accepted. Each line must be a valid JSON object with a 'messages' key.
          </p>
        </div>
      )}
      {validationError && (
        <Alert variant="destructive">
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
      <JsonDisplay jsonContent={jsonContent} />
    </div>
  );
};

export default FileUploadSection;