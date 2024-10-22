import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import JsonDisplay from './JsonDisplay';
import FileSourceSelector from './FileSourceSelector';
import { useToast } from "@/components/ui/use-toast";
import ValidationAlert from './ValidationAlert';

const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

const FileUploadSection = ({ usePreExistingFile, setUsePreExistingFile, jsonContent, setJsonContent }) => {
  const [validationError, setValidationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (usePreExistingFile) {
      handlePreExistingFile();
    }
  }, [usePreExistingFile]);

  const handlePreExistingFile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/finetune/strawberry-phi.jsonl');
      if (!response.ok) {
        throw new Error('Failed to fetch the Strawberry Phi Data Set');
      }
      const content = await response.text();
      validateAndSetContent(content);
      toast({
        title: "Pre-existing File Selected",
        description: "Strawberry Phi Data Set - 2500 agentic flows has been loaded.",
      });
    } catch (error) {
      handleError(`Error loading Strawberry Phi Data Set: ${error.message}`);
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
      if (!usePreExistingFile) {
        storeContentInChunks(content);
      }
    } catch (error) {
      handleError(`Invalid JSONL format: ${error.message}`);
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
      toast({
        title: "File Stored",
        description: "The file has been successfully stored in chunks.",
      });
    } catch (error) {
      handleError("Failed to store the file due to storage limitations. Try a smaller file or clear some browser storage.");
    }
  };

  const handleError = (message) => {
    setValidationError(message);
    setJsonContent('');
    setUsePreExistingFile(false);
    toast({
      title: "Validation Error",
      description: message,
      variant: "destructive",
    });
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
      <ValidationAlert validationError={validationError} />
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