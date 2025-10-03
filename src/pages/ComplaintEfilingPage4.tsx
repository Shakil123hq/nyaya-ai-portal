import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ComplaintEfilingPage4: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate back to Step 3
    navigate('/file-new-complaint/evidence');
  };

  const handleSubmit = () => {
    // In a real application, you would send the complete complaint data to the backend
    alert("Complaint Submitted Successfully!");
    navigate('/citizen-dashboard'); // Redirect to dashboard after submission
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-card text-card-foreground shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">File a New Complaint/FIR</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Step 4 of 4: Review & Submit</p>

          <div className="mb-8 space-y-6">
            {/* Summary of Incident Basics */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Incident Basics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-muted/20 p-4 rounded-md">
                <div><span className="font-medium">Date:</span> <span>2023-11-05</span></div>
                <div><span className="font-medium">Time:</span> <span>14:30</span></div>
                <div className="md:col-span-2"><span className="font-medium">Location:</span> <span>123 Main St, Anytown</span></div>
                <div className="md:col-span-2"><span className="font-medium">Language:</span> <span>English</span></div>
              </div>
            </div>

            {/* Summary of Narrative */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Incident Narrative</h2>
              <div className="bg-muted/20 p-4 rounded-md text-sm text-muted-foreground">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>

            {/* Summary of Evidence */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Uploaded Evidence</h2>
              <div className="bg-muted/20 p-4 rounded-md text-sm text-muted-foreground">
                <ul className="list-disc list-inside">
                  <li>Image_of_incident.jpg (2.1 MB)</li>
                  <li>Witness_statement.pdf (0.5 MB)</li>
                </ul>
                <p className="mt-2">No files uploaded.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-8">
            <Button
              variant="outline"
              className="w-full h-12 text-lg font-semibold rounded-md transition-colors duration-200"
              onClick={handleBack}
            >
              Back to Evidence (Step 3)
            </Button>
            <Button
              className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
              onClick={handleSubmit}
            >
              Submit Complaint/FIR
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComplaintEfilingPage4;
