import React from 'react';
import { Progress } from "./ui/progress";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 0) strength += 20; // Base strength
    if (password.length >= 8) strength += 20; // Longer password
    if (/[A-Z]/.test(password)) strength += 20; // Uppercase letters
    if (/[a-z]/.test(password)) strength += 20; // Lowercase letters
    if (/[0-9]/.test(password)) strength += 20; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special characters

    return Math.min(strength, 100); // Cap at 100
  };

  const strength = getPasswordStrength(password);

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength === 0) return "";
    if (strength < 40) return "Weak";
    if (strength < 70) return "Moderate";
    return "Strong";
  };

  return (
    <div className="grid gap-1 mt-2">
      <Progress value={strength} className={`h-2 ${getStrengthColor(strength)}`} />
      {strength > 0 && (
        <p className={`text-sm ${getStrengthColor(strength).replace("bg", "text")}`}>
          Strength: {getStrengthText(strength)}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
