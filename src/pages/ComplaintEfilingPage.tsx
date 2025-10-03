import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ComplaintEfilingPage: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');

  // Mock pre-filled user profile details
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+91 98765 43210",
  };

  const handleContinue = () => {
    // In a real application, you would save these details and navigate to the next step
    console.log({
      date, time, location, language, userProfile
    });
    // Navigate to the next step of the wizard
    navigate('/file-new-complaint/narrative');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-card text-card-foreground shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">File a New Complaint/FIR</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Step 1 of 4: Incident Basics</p>

          {/* Accountability Check: Pre-filled Profile Details */}
          <div className="mb-6 p-4 border border-border rounded-md bg-muted/20">
            <h2 className="text-lg font-semibold mb-2">Your Profile Details (Read-only)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="font-medium">Name:</Label>
                <p className="text-muted-foreground">{userProfile.name}</p>
              </div>
              <div>
                <Label className="font-medium">Email:</Label>
                <p className="text-muted-foreground">{userProfile.email}</p>
              </div>
              <div className="md:col-span-2">
                <Label className="font-medium">Mobile Number:</Label>
                <p className="text-muted-foreground">{userProfile.mobile}</p>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <Label htmlFor="language" className="mb-2 block">Language of Narration</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Incident Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <Label htmlFor="incidentDate" className="mb-2 block">Date of Incident</Label>
              <Input
                id="incidentDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-input text-input-foreground"
              />
            </div>
            <div>
              <Label htmlFor="incidentTime" className="mb-2 block">Time of Incident</Label>
              <Input
                id="incidentTime"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-input text-input-foreground"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="incidentLocation" className="mb-2 block">Location/Address of Incident</Label>
              <Input
                id="incidentLocation"
                type="text"
                placeholder="Enter full address or landmark"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-input text-input-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">This will help suggest the correct Police Station Jurisdiction.</p>
            </div>
          </div>

          {/* Navigation Button */}
          <Button
            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200"
            onClick={handleContinue}
          >
            Continue to Narrative (Step 2)
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComplaintEfilingPage;
