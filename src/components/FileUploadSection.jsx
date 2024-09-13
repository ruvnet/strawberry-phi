import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import JsonDisplay from './JsonDisplay';
import ValidationAlert from './ValidationAlert';
import FileSourceSelector from './FileSourceSelector';

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

      if (correctedLines.length < 10) {
        throw new Error("The training file must have at least 10 examples.");
      }

      const correctedContent = correctedLines.join('\n');
      setCorrectedContent(correctedContent);
      setJsonContent(correctedContent);
      localStorage.setItem('uploadedJsonFile', correctedContent);
      setValidationError(null);
    } catch (error) {
      setValidationError(error.message);
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
      <FileSourceSelector
        usePreExistingFile={usePreExistingFile}
        setUsePreExistingFile={setUsePreExistingFile}
      />
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
            Only JSONL format is accepted. Each line must be a valid JSON object with a 'messages' key. Minimum 10 examples required.
          </p>
        </div>
      )}
      <ValidationAlert
        validationError={validationError}
        correctedContent={correctedContent}
        applyCorrections={applyCorrections}
      />
      <JsonDisplay jsonContent={jsonContent} />
    </div>
  );
};

export default FileUploadSection;