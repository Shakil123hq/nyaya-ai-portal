import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ComplaintEfilingPage3: React.FC = () => {
  const navigate = useNavigate();
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setEvidenceFiles(Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setEvidenceFiles(evidenceFiles.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    // Navigate back to Step 2
    navigate('/file-new-complaint/narrative');
  };

  const handleContinue = () => {
    // In a real application, you would upload the evidence and navigate to the next step
    console.log({ evidenceFiles });
    // Navigate to the next step of the wizard
    navigate('/file-new-complaint/review-submit');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-card text-card-foreground shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">File a New Complaint/FIR</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Step 3 of 4: Evidence</p>

          <div className="mb-8">
            <Label htmlFor="evidenceUpload" className="mb-2 block">Upload Evidence (Documents, Images, Videos)</Label>
            <Input
              id="evidenceUpload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="bg-input text-input-foreground file:text-primary file:font-semibold"
            />
            <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, JPEG, PNG, MP4, etc. Max file size: 25MB per file.</p>
          </div>

          {evidenceFiles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Uploaded Files:</h2>
              <ul className="space-y-2">
                {evidenceFiles.map((file, index) => (
                  <li key={index} className="flex justify-between items-center bg-muted/20 p-3 rounded-md">
                    <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700">
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="w-full h-12 text-lg font-semibold rounded-md transition-colors duration-200"
              onClick={handleBack}
            >
              Back to Narrative (Step 2)
            </Button>
            <Button
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200"
              onClick={handleContinue}
            >
              Continue to Review & Submit (Step 4)
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComplaintEfilingPage3;
