import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComplaintList from "@/components/Citizen/ComplaintList";
import LegalResources from "@/components/Citizen/LegalResources";
import { Button } from "@/components/ui/button";

const CitizenDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for complaints
  const mockComplaints = [
    {
      id: "1",
      type: "Criminal",
      subject: "Assault Case",
      status: "Pending",
      date: "2023-10-26",
    },
    {
      id: "2",
      type: "Civil",
      subject: "Property Dispute",
      status: "Resolved",
      date: "2023-09-15",
    },
    {
      id: "3",
      type: "Family",
      subject: "Child Custody",
      status: "In Progress",
      date: "2023-11-01",
    },
  ];

  // Mock data for legal resources
  const mockLegalResources = [
    {
      id: "1",
      title: "Understanding Your FIR",
      description: "A guide to what an FIR is and your rights when filing one.",
      link: "#",
    },
    {
      id: "2",
      title: "Basic Consumer Rights",
      description: "Know your rights as a consumer in India.",
      link: "#",
    },
    {
      id: "3",
      title: "Property Law Basics",
      description: "An introduction to common property laws.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Citizen Dashboard</h1>
        <p className="text-center text-muted-foreground mb-8">Welcome to your personal dashboard. Here you can track your complaints and access legal information.</p>
        
        <div className="flex flex-col items-center gap-4 mb-12">
          <Button
            className="w-full max-w-sm h-16 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/file-new-complaint')}
          >
            File a New Complaint/FIR
          </Button>
          <Button
            className="w-full max-w-sm h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/citizen-case-tracking')}
          >
            View My Case Tracking Dashboard
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Complaints</h2>
            <ComplaintList complaints={mockComplaints} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Legal Rights Explainers</h2>
            <LegalResources resources={mockLegalResources} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CitizenDashboardPage;
