import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CitizenRegistrationProps {
  onRegistrationComplete: () => void;
}

const CitizenRegistration: React.FC<CitizenRegistrationProps> = ({
  onRegistrationComplete,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setFullNameError(null);
    setMobileNumberError(null);
    setLoading(true);

    // Validation
    if (!email) {
      setEmailError("Email is required.");
      setLoading(false);
      return;
    }

    if (!fullName) {
      setFullNameError("Full name is required.");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            mobile_number: mobileNumber || null,
          }
        }
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Registration successful",
          description: "Welcome to Nyaya AI!",
        });
        onRegistrationComplete();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4 mt-6">
      <h2 className="text-xl font-semibold text-center">Register as Citizen</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled={loading}
            aria-invalid={fullNameError ? "true" : "false"}
            aria-describedby="full-name-error"
          />
          {fullNameError && <p id="full-name-error" className="text-sm text-red-500" role="alert">{fullNameError}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            aria-invalid={emailError ? "true" : "false"}
            aria-describedby="email-error"
          />
          {emailError && <p id="email-error" className="text-sm text-red-500" role="alert">{emailError}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="mobileNumber">Mobile Number (Optional)</Label>
          <Input
            id="mobileNumber"
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            disabled={loading}
            aria-invalid={mobileNumberError ? "true" : "false"}
            aria-describedby="mobile-number-error"
          />
          {mobileNumberError && <p id="mobile-number-error" className="text-sm text-red-500" role="alert">{mobileNumberError}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby="password-error"
          />
          {passwordError && <p id="password-error" className="text-sm text-red-500" role="alert">{passwordError}</p>}
          <PasswordStrengthIndicator password={password} />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default CitizenRegistration;
