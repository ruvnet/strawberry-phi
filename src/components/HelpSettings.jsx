import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Settings User Manual</h2>
      <p className="text-strawberry-600 mb-4">
        The Settings section allows you to manage your API key and configure application preferences. Here's how to use this feature:
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="api-key-management">
          <AccordionTrigger>API Key Management</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Enter your OpenAI API key in the provided input field.</li>
              <li>Click "Save" to store your API key securely.</li>
              <li>Your API key is encrypted before being stored in the browser's local storage.</li>
              <li>You can update your API key at any time by entering a new one and saving.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="application-preferences">
          <AccordionTrigger>Application Preferences</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Customize the application's appearance and behavior.</li>
              <li>Toggle between light and dark modes for comfortable viewing.</li>
              <li>Set default values for model testing parameters.</li>
              <li>Configure notification preferences for job status updates.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security-notes">
          <AccordionTrigger>Security Notes</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Your API key is encrypted using advanced encryption standards.</li>
              <li>The key is only decrypted when needed for API calls.</li>
              <li>Never share your API key with others or expose it in public repositories.</li>
              <li>Regularly rotate your API key for enhanced security.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpSettings;