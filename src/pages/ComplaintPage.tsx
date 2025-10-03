import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComplaintForm from "@/components/Citizen/ComplaintForm";

const ComplaintPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">File a New Complaint</h1>
        <ComplaintForm />
      </main>
      <Footer />
    </div>
  );
};

export default ComplaintPage;
