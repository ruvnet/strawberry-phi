import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import JsonDisplay from './JsonDisplay';
import FileSourceSelector from './FileSourceSelector';

const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

const FileUploadSection = ({ usePreExistingFile, setUsePreExistingFile, jsonContent, setJsonContent }) => {
  const [validationError, setValidationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (usePreExistingFile) {
      loadPreExistingFile();
    }
  }, [usePreExistingFile]);

  const loadPreExistingFile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/finetune/strawberry-phi.jsonl');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      validateAndSetContent(content);
    } catch (error) {
      setValidationError(`Error loading pre-existing file: ${error.message}`);
      setUsePreExistingFile(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndSetContent = (content) => {
    try {
      const lines = content.trim().split('\n');
      if (lines.length < 10) {
        throw new Error("The training file must have at least 10 examples.");
      }
      lines.forEach(JSON.parse);
      setJsonContent(content);
      setValidationError(null);
      storeContentInChunks(content);
    } catch (error) {
      setValidationError(`Invalid JSONL format: ${error.message}`);
      setJsonContent('');
    }
  };

  const storeContentInChunks = (content) => {
    try {
      const chunks = [];
      for (let i = 0; i < content.length; i += CHUNK_SIZE) {
        chunks.push(content.slice(i, i + CHUNK_SIZE));
      }
      chunks.forEach((chunk, index) => {
        localStorage.setItem(`uploadedJsonFile_${index}`, chunk);
      });
      localStorage.setItem('uploadedJsonFile_chunks', chunks.length.toString());
    } catch (error) {
      console.error('Error storing content in chunks:', error);
      setValidationError("Failed to store the file due to storage limitations.");
    }
  };

  const handleJsonContentChange = (e) => {
    validateAndSetContent(e.target.value);
  };

  return (
    <div className="space-y-4">
      <FileSourceSelector
        usePreExistingFile={usePreExistingFile}
        setUsePreExistingFile={setUsePreExistingFile}
      />
      {isLoading && <p>Loading pre-existing file...</p>}
      {validationError && (
        <Alert variant="destructive">
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
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
      <JsonDisplay jsonContent={jsonContent} />
    </div>
  );
};

export default FileUploadSection;