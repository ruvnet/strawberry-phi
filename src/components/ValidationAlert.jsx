import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ValidationAlert = ({ validationError }) => {
  if (!validationError) return null;

  return (
    <Alert variant="destructive">
      <AlertTitle>Validation Error</AlertTitle>
      <AlertDescription>{validationError}</AlertDescription>
    </Alert>
  );
};

export default ValidationAlert;