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
  const [correctedContent, setCorrectedContent] = useState(null);

  const validateAndCorrectJsonContent = (content) => {
    try {
      const lines = content.trim().split('\n');
      const correctedLines = lines.map(line => {
        try {
          const parsed = JSON.parse(line);
          if (typeof parsed === 'object' && parsed !== null && 'messages' in parsed) {
            return JSON.stringify(parsed);
          } else {
            throw new Error("Invalid structure");
          }
        } catch (error) {
          // Attempt to correct the line
          const corrected = {
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: line },
              { role: "assistant", content: "I'm sorry, but I don't have enough context to provide a specific response to that input." }
            ]
          };
          return JSON.stringify(corrected);
        }
      });

      const correctedContent = correctedLines.join('\n');
      setCorrectedContent(correctedContent);
      setJsonContent(correctedContent);
      localStorage.setItem('uploadedJsonFile', correctedContent);
      setValidationError(null);
    } catch (error) {
      setValidationError("Failed to validate and correct JSONL content. Please check your input.");
      setJsonContent('');
      setCorrectedContent(null);
    }
  };

  const handleJsonContentChange = (e) => {
    const content = e.target.value;
    validateAndCorrectJsonContent(content);
  };

  const applyCorrections = () => {
    if (correctedContent) {
      setJsonContent(correctedContent);
      setCorrectedContent(null);
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
      {correctedContent && (
        <Alert>
          <AlertTitle>Content Corrected</AlertTitle>
          <AlertDescription>
            Some lines were automatically corrected to match the required format.
            <Button onClick={applyCorrections} className="mt-2 bg-strawberry-500 hover:bg-strawberry-600 text-white">
              Apply Corrections
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <JsonDisplay jsonContent={jsonContent} />
    </div>
  );
};

export default FileUploadSection;