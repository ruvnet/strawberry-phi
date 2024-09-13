import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ValidationAlert = ({ validationError, correctedContent, applyCorrections }) => {
  if (validationError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Validation Error</AlertTitle>
        <AlertDescription>{validationError}</AlertDescription>
      </Alert>
    );
  }

  if (correctedContent) {
    return (
      <Alert>
        <AlertTitle>Content Corrected</AlertTitle>
        <AlertDescription>
          Some lines were automatically corrected to match the required format.
          <Button onClick={applyCorrections} className="mt-2 bg-strawberry-500 hover:bg-strawberry-600 text-white">
            Apply Corrections
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default ValidationAlert;