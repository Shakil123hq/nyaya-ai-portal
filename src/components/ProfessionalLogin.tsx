import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useNavigate } from 'react-router-dom';

type ProfessionalRole = "advocate" | "judge" | "police" | "system" | null;

const ProfessionalLogin: React.FC = () => {
  const [professionalRole, setProfessionalRole] = useState<ProfessionalRole>(null);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const [professionalRoleError, setProfessionalRoleError] = useState<string | null>(null);
  const [idError, setIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getLabelForId = (role: ProfessionalRole) => {
    switch (role) {
      case "advocate":
        return "Bar Council ID / Enrollment Number";
      case "judge":
        return "Judicial Service ID";
      case "police":
        return "Unique Badge/Service ID";
      case "system":
        return "Government ID / Employee ID";
      default:
        return "ID";
    }
  };

  const getPlaceholderForId = (role: ProfessionalRole) => {
    switch (role) {
      case "advocate":
        return "Enter your Bar Council ID or Enrollment Number";
      case "judge":
        return "Enter your Judicial Service ID";
      case "police":
        return "Enter your Unique Badge/Service ID";
      case "system":
        return "Enter your Government ID or Employee ID";
      default:
        return "Enter your ID";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfessionalRoleError(null);
    setIdError(null);
    setPasswordError(null);
    setLoginError(null);

    let isValid = true;

    if (!professionalRole) {
      setProfessionalRoleError("Please select your professional role.");
      isValid = false;
    }

    if (!id) {
      setIdError("ID is required.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Simulate API call
    if (id === "testprof" && password === "password123") {
      localStorage.setItem('userToken', 'mock-professional-token');
      localStorage.setItem('userRole', professionalRole as string);

      if (professionalRole === "advocate") {
        navigate("/advocate-dashboard");
      } else if (professionalRole === "police") {
        navigate("/professional-dashboard"); // This currently points to PoliceDashboardPage
      } else if (professionalRole === "judge") {
        navigate("/judge-dashboard"); // Redirect to the dedicated Judge dashboard
      } else if (professionalRole === "system") {
        navigate("/system-dashboard"); // Redirect to the dedicated System dashboard
      } else {
        navigate("/professional-dashboard"); // Fallback
      }
    } else {
      setLoginError("Invalid ID or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
      <div className="grid gap-2">
        <Label htmlFor="professionalRole">I am a...</Label>
        <Select onValueChange={(value: ProfessionalRole) => {
          setProfessionalRole(value);
          setProfessionalRoleError(null); // Clear error when role changes
        }}>
          <SelectTrigger id="professionalRole" aria-invalid={professionalRoleError ? "true" : "false"} aria-describedby="professional-role-error">
            <SelectValue placeholder="Select your professional role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="advocate">Advocate</SelectItem>
            <SelectItem value="judge">Judge</SelectItem>
            <SelectItem value="police">Police</SelectItem>
            <SelectItem value="system">System (Government)</SelectItem>
          </SelectContent>
        </Select>
        {professionalRoleError && <p id="professional-role-error" className="text-sm text-red-500" role="alert">{professionalRoleError}</p>}
      </div>

      {professionalRole && (
        <>
          <div className="grid gap-2">
            <Label htmlFor="professionalId">{getLabelForId(professionalRole)}</Label>
            <Input
              id="professionalId"
              type="text"
              placeholder={getPlaceholderForId(professionalRole)}
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              aria-invalid={idError ? "true" : "false"}
              aria-describedby="professional-id-error"
            />
            {idError && <p id="professional-id-error" className="text-sm text-red-500" role="alert">{idError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={passwordError ? "true" : "false"}
              aria-describedby="password-error"
            />
            <PasswordStrengthIndicator password={password} />
            {passwordError && <p id="password-error" className="text-sm text-red-500" role="alert">{passwordError}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keepLoggedIn"
              checked={keepLoggedIn}
              onCheckedChange={(checked: boolean) => setKeepLoggedIn(checked)}
            />
            <label
              htmlFor="keepLoggedIn"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Keep Me Logged In (For secure personal devices only)
            </label>
          </div>
          {loginError && <p className="text-sm text-red-500 text-center" role="alert">{loginError}</p>}
          <Button type="submit" className="w-full">Login</Button>
          <div className="text-center text-sm">
            <a href="/forgot-password-professional" className="text-muted-foreground hover:underline">
              Forgot Password?
            </a>
          </div>
        </>
      )}
    </form>
  );
};

export default ProfessionalLogin;
