import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Removed Link import as it's no longer directly navigating, but triggering a state change
import { useNavigate } from 'react-router-dom';

interface CitizenLoginProps {
  onRegisterClick: () => void;
}

const CitizenLogin: React.FC<CitizenLoginProps> = ({ onRegisterClick }) => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileOrEmailError, setMobileOrEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileOrEmailError(null);
    setPasswordError(null);
    setLoginError(null);

    let isValid = true;

    if (!mobileOrEmail) {
      setMobileOrEmailError("Mobile number or email is required.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    console.log("Citizen Login Attempt:", { mobileOrEmail, password });
    // Simulate API call
    if (mobileOrEmail === "test@example.com" && password === "password123") {
      console.log("Login successful!");
      localStorage.setItem('userToken', 'mock-citizen-token');
      localStorage.setItem('userRole', 'citizen');
      navigate("/citizen-dashboard"); // Redirect to dashboard
    } else {
      setLoginError("Invalid mobile number/email or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
      <div className="grid gap-2">
        <Label htmlFor="mobileOrEmail">Mobile Number or Email</Label>
        <Input
          id="mobileOrEmail"
          type="text"
          placeholder="Enter your mobile number or email"
          value={mobileOrEmail}
          onChange={(e) => setMobileOrEmail(e.target.value)}
          required
          aria-invalid={mobileOrEmailError ? "true" : "false"}
          aria-describedby="mobile-or-email-error"
        />
        {mobileOrEmailError && <p id="mobile-or-email-error" className="text-sm text-red-500" role="alert">{mobileOrEmailError}</p>}
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
        {passwordError && <p id="password-error" className="text-sm text-red-500" role="alert">{passwordError}</p>}
      </div>
      {loginError && <p className="text-sm text-red-500 text-center" role="alert">{loginError}</p>}
      <Button type="submit" className="w-full">Login</Button>
      <div className="flex justify-between text-sm">
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-primary hover:underline"
        >
          Register Here
        </button>
        <a href="/forgot-password-citizen" className="text-muted-foreground hover:underline">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default CitizenLogin;
