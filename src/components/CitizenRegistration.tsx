import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

interface CitizenRegistrationProps {
  onRegistrationComplete: () => void;
}

const CitizenRegistration: React.FC<CitizenRegistrationProps> = ({ onRegistrationComplete }) => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [mobileNumberError, setMobileNumberError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileNumberError(null);

    let isValid = true;
    if (!mobileNumber) {
      setMobileNumberError("Mobile number is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    console.log("Sending OTP to:", mobileNumber);
    // Simulate OTP sending
    setTimeout(() => {
      setStep(2); // Move to step 2 after OTP is 'sent'
    }, 1000);
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);
    setPasswordError(null);
    setFullNameError(null);
    setRegistrationError(null);

    let isValid = true;

    if (!otp) {
      setOtpError("OTP is required.");
      isValid = false;
    } else if (otp !== "123456") { // Simple mock OTP validation
      setOtpError("Invalid OTP.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (!fullName) {
      setFullNameError("Full name is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    console.log("Completing registration:", { mobileNumber, otp, password, fullName });
    // Simulate registration completion
    // For now, assuming successful registration if all validations pass
    if (otp === "123456") { // Final check for mock OTP
      localStorage.setItem('userToken', 'mock-citizen-token');
      localStorage.setItem('userRole', 'citizen');
      onRegistrationComplete(); // Notify parent component (LoginPage) that registration is complete
    } else {
      setRegistrationError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="mt-6">
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              aria-invalid={mobileNumberError ? "true" : "false"}
              aria-describedby="mobile-number-error"
            />
            {mobileNumberError && <p id="mobile-number-error" className="text-sm text-red-500" role="alert">{mobileNumberError}</p>}
          </div>
          <Button type="submit" className="w-full">Send OTP</Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCompleteRegistration} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              aria-invalid={otpError ? "true" : "false"}
              aria-describedby="otp-error"
            />
            {otpError && <p id="otp-error" className="text-sm text-red-500" role="alert">{otpError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={passwordError ? "true" : "false"}
              aria-describedby="password-error"
            />
            <PasswordStrengthIndicator password={password} />
            {passwordError && <p id="password-error" className="text-sm text-red-500" role="alert">{passwordError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              aria-invalid={fullNameError ? "true" : "false"}
              aria-describedby="full-name-error"
            />
            {fullNameError && <p id="full-name-error" className="text-sm text-red-500" role="alert">{fullNameError}</p>}
          </div>
          {registrationError && <p className="text-sm text-red-500 text-center" role="alert">{registrationError}</p>}
          <Button type="submit" className="w-full">Complete Registration</Button>
        </form>
      )}
    </div>
  );
};

export default CitizenRegistration;
