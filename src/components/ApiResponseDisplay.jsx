import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ApiResponseDisplay = ({ apiResponse }) => {
  if (!apiResponse) return null;

  return (
    <Card className="mt-4 bg-white/50 backdrop-blur-sm border-strawberry-200">
      <CardContent>
        <h2 className="text-xl font-semibold text-strawberry-700 mb-2">API Response</h2>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(apiResponse, null, 2)}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ApiResponseDisplay;