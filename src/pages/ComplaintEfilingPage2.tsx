import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ComplaintEfilingPage2: React.FC = () => {
  const navigate = useNavigate();
  const [narrative, setNarrative] = useState('');

  const handleBack = () => {
    // Navigate back to Step 1
    navigate('/file-new-complaint');
  };

  const handleContinue = () => {
    // In a real application, you would save the narrative and navigate to the next step
    console.log({ narrative });
    // Navigate to the next step of the wizard
    navigate('/file-new-complaint/evidence');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-card text-card-foreground shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">File a New Complaint/FIR</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Step 2 of 4: Incident Narrative</p>

          <div className="mb-8">
            <Label htmlFor="narrative" className="mb-2 block">Narrative of Incident</Label>
            <Textarea
              id="narrative"
              placeholder="Provide a detailed description of the incident..."
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              rows={10}
              className="bg-input text-input-foreground resize-y"
            />
            <p className="text-xs text-muted-foreground mt-1">Be as descriptive as possible. Include all relevant details, dates, and individuals involved.</p>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="w-full h-12 text-lg font-semibold rounded-md transition-colors duration-200"
              onClick={handleBack}
            >
              Back to Basics (Step 1)
            </Button>
            <Button
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200"
              onClick={handleContinue}
            >
              Continue to Evidence (Step 3)
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComplaintEfilingPage2;
