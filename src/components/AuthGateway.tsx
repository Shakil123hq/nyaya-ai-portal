import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User, Gavel } from 'lucide-react'; // Import icons

type UserRole = "citizen" | "professional";

interface AuthGatewayProps {
  onRoleSelect: (role: UserRole) => void;
}

const AuthGateway: React.FC<AuthGatewayProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold text-center text-muted-foreground">User Classification</h2>
      <div className="grid gap-4">
        <Button
          variant={"default"}
          className={`h-auto py-6 text-lg flex-col items-center justify-center transition-all duration-300 rounded-full
            ${selectedRole === "citizen"
              ? "bg-amber-600 text-white ring-2 ring-amber-800"
              : "bg-amber-500 text-white border-transparent hover:bg-amber-600"
            }
          `}
          onClick={() => {
            setSelectedRole("citizen");
            onRoleSelect("citizen");
          }}
        >
          <User className="h-8 w-8 mb-2" />
          <span className="font-bold">Citizen</span>
          <span className="text-sm font-normal opacity-80 mt-1 text-center">File complaints, track cases, access simple guidance.</span>
        </Button>
        <Button
          variant={"outline"}
          className={`h-auto py-6 text-lg flex-col items-center justify-center transition-all duration-300 rounded-full
            ${selectedRole === "professional"
              ? "bg-blue-800 text-white border-blue-800 ring-2 ring-blue-900"
              : "text-blue-800 border-blue-800 hover:bg-blue-50"
            }
          `}
          onClick={() => {
            setSelectedRole("professional");
            onRoleSelect("professional");
          }}
        >
          <Gavel className="h-8 w-8 mb-2" />
          <span className="font-bold">Official</span>
          <span className="text-sm font-normal opacity-80 mt-1 text-center">Access tools for Police, Judges, and Advocates.</span>
        </Button>
      </div>
    </div>
  );
};

export default AuthGateway;
