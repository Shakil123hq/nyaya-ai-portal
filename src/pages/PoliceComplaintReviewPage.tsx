import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const PoliceComplaintReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data for a single complaint (replace with actual fetch in a real app)
  const mockComplaint = {
    id: "C-2023-001",
    citizenName: "Ramesh Kumar",
    dateTimeFiled: "2023-11-05 10:30",
    incidentLocation: "Sector 14, Dwarka, Delhi",
    incidentDate: "2023-11-05",
    incidentTime: "10:00",
    language: "English",
    narrative: "On November 5th, 2023, at approximately 10:00 AM, my red Honda Activa, bearing license plate DL1234, was stolen from the parking area near the Dwarka Sector 14 Metro Station. I had parked it there around 9:30 AM before heading to work. Upon my return at 11:00 AM, the scooter was missing. I immediately checked with nearby vendors, but no one saw anything. I have attached a photo of the scooter and a copy of its registration document as evidence. This is a significant loss as it is my primary mode of transportation for work.",
    evidenceAttached: true,
    evidenceFiles: [
      { name: "scooter_photo.jpg", size: "2.5 MB" },
      { name: "registration_document.pdf", size: "0.8 MB" },
    ],
    // Citizen profile details
    userProfile: {
      name: "Ramesh Kumar",
      email: "ramesh.kumar@example.com",
      mobile: "+91 98765 43210",
    }
  };

  // Simulate fetching complaint data
  const complaint = mockComplaint; // In a real app, you'd fetch based on `id`

  const handleFIRDraft = () => {
    // Logic to save/process the FIR draft
    console.log("FIR Draft submitted for complaint ID:", id);
    navigate('/professional-dashboard'); // Redirect back to police dashboard
  };

  if (!complaint) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4 md:px-6 text-center">
          <p className="text-xl text-muted-foreground">Complaint not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Complaint Review & FIR Drafting</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Citizen Complaint Details Pane */}
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Citizen Complaint Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <p className="font-medium">Complaint ID:</p>
                  <p className="text-muted-foreground">{complaint.id}</p>
                  <p className="font-medium">Citizen Name:</p>
                  <p className="text-muted-foreground">{complaint.citizenName}</p>
                  <p className="font-medium">Date/Time Filed:</p>
                  <p className="text-muted-foreground">{complaint.dateTimeFiled}</p>
                  <p className="font-medium">Incident Date:</p>
                  <p className="text-muted-foreground">{complaint.incidentDate}</p>
                  <p className="font-medium">Incident Time:</p>
                  <p className="text-muted-foreground">{complaint.incidentTime}</p>
                  <p className="font-medium">Incident Location:</p>
                  <p className="text-muted-foreground">{complaint.incidentLocation}</p>
                  <p className="font-medium">Language of Narration:</p>
                  <p className="text-muted-foreground">{complaint.language}</p>
                  <p className="font-medium">Citizen Mobile:</p>
                  <p className="text-muted-foreground">{complaint.userProfile.mobile}</p>
                  <p className="font-medium">Citizen Email:</p>
                  <p className="text-muted-foreground">{complaint.userProfile.email}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Narrative of Incident</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{complaint.narrative}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Attached Evidence</h3>
                  {complaint.evidenceAttached && complaint.evidenceFiles && complaint.evidenceFiles.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {complaint.evidenceFiles.map((file, index) => (
                        <li key={index} className="text-muted-foreground">{file.name} ({file.size})</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No evidence attached.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-assisted FIR Drafting Pane */}
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">AI-Assisted FIR Drafting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firDraft" className="mb-2 block text-lg font-semibold">Draft FIR Content</Label>
                  <Textarea
                    id="firDraft"
                    placeholder="AI suggestions for FIR content will appear here based on the complaint narrative. Officer can edit."
                    rows={20}
                    className="bg-input text-input-foreground resize-y min-h-[400px]"
                    // You might pre-fill this with AI-generated content in a real scenario
                    defaultValue={`FIR No.: [Auto-generated]
Date of Registration: ${new Date().toLocaleDateString()}

Complaint ID: ${complaint.id}
Complainant: ${complaint.citizenName} (Mobile: ${complaint.userProfile.mobile}, Email: ${complaint.userProfile.email})
Incident Date: ${complaint.incidentDate}
Incident Time: ${complaint.incidentTime}
Incident Location: ${complaint.incidentLocation}

Narrative of Incident (from Citizen Complaint):
${complaint.narrative}

[Detailed FIR content to be drafted here, potentially with AI assistance]

Details of Offense:

Actions Taken:

Officer In-Charge:
`}
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold h-12" onClick={handleFIRDraft}>
                  Submit FIR Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliceComplaintReviewPage;
