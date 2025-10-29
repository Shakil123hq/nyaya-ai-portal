import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type ProfessionalRole = "advocate" | "judge" | "police" | "system" | null;

const ProfessionalLogin: React.FC = () => {
  const [professionalRole, setProfessionalRole] = useState<ProfessionalRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [professionalRoleError, setProfessionalRoleError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfessionalRoleError(null);
    setEmailError(null);
    setPasswordError(null);
    setLoading(true);

    // Validation
    if (!professionalRole) {
      setProfessionalRoleError("Please select your professional role.");
      setLoading(false);
      return;
    }

    if (!email) {
      setEmailError("Email is required.");
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError("Password is required.");
      setLoading(false);
      return;
    }

    try {
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        toast({
          title: "Login failed",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        toast({
          title: "Login failed",
          description: "Unable to authenticate",
          variant: "destructive",
        });
        return;
      }

      // Check if user has the selected professional role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .eq('role', professionalRole)
        .maybeSingle();

      if (roleError) {
        toast({
          title: "Error",
          description: "Failed to verify your role",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      if (!roleData) {
        toast({
          title: "Access denied",
          description: `You don't have ${professionalRole} access. Please contact an administrator.`,
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      // Navigate based on role
      toast({
        title: "Login successful",
        description: `Welcome ${professionalRole}!`,
      });

      if (professionalRole === "advocate") {
        navigate("/advocate-dashboard");
      } else if (professionalRole === "police") {
        navigate("/police-dashboard");
      } else if (professionalRole === "judge") {
        navigate("/judge-dashboard");
      } else if (professionalRole === "system") {
        navigate("/system-dashboard");
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
    <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
      <div className="grid gap-2">
        <Label htmlFor="professionalRole">I am a...</Label>
        <Select onValueChange={(value: ProfessionalRole) => {
          setProfessionalRole(value);
          setProfessionalRoleError(null);
        }}>
          <SelectTrigger 
            id="professionalRole" 
            disabled={loading}
            aria-invalid={professionalRoleError ? "true" : "false"} 
            aria-describedby="professional-role-error"
          >
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              aria-invalid={passwordError ? "true" : "false"}
              aria-describedby="password-error"
            />
            {passwordError && <p id="password-error" className="text-sm text-red-500" role="alert">{passwordError}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keepLoggedIn"
              checked={keepLoggedIn}
              onCheckedChange={(checked: boolean) => setKeepLoggedIn(checked)}
              disabled={loading}
            />
            <label
              htmlFor="keepLoggedIn"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Keep Me Logged In (For secure personal devices only)
            </label>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </>
      )}
    </form>
  );
};

export default ProfessionalLogin;
