import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import justiceScales from '@/assets/hero2.jpg';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGateway from "@/components/AuthGateway";
import CitizenLogin from "@/components/CitizenLogin";
import CitizenRegistration from "@/components/CitizenRegistration";
import ProfessionalLogin from "@/components/ProfessionalLogin";

type UserRole = "citizen" | "professional";

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showCitizenRegistration, setShowCitizenRegistration] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowCitizenRegistration(false); // Reset to login view when role changes
    console.log("Selected role:", role);
  };

  const handleRegisterClick = () => {
    setShowCitizenRegistration(true);
  };

  const handleRegistrationComplete = () => {
    setShowCitizenRegistration(false);
    navigate('/citizen-dashboard'); // Redirect to citizen dashboard after registration
    // Optionally show a toast message for successful registration
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center fixed h-full w-full transition-opacity duration-500"
        style={{
          backgroundImage: `url(${justiceScales})`,
          opacity: selectedRole ? 0.3 : 0.6, // Adjust opacity based on whether a role is selected
          filter: 'blur(8px)',
          transform: 'scale(1.05)', // Restored to previous larger scale
        }}
      ></div>
      <Header className="relative z-10" />
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-lg bg-card text-card-foreground shadow-lg rounded-lg p-8 md:p-12 relative z-20">
          <h1 className="text-3xl font-bold mb-6 text-center">Access Nyaya AI: Smart Judicial System</h1>
          {!selectedRole && <AuthGateway onRoleSelect={handleRoleSelect} />}

          {selectedRole === "citizen" && (
            showCitizenRegistration ? (
              <CitizenRegistration onRegistrationComplete={handleRegistrationComplete} />
            ) : (
              <CitizenLogin onRegisterClick={handleRegisterClick} />
            )
          )}

          {selectedRole === "professional" && <ProfessionalLogin /> }
        </div>
      </main>
      <Footer className="relative z-10" />
    </div>
  );
};

export default LoginPage;
