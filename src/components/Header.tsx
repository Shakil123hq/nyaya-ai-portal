import { Search, Globe, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Dummy function to simulate authentication check
  const isCitizenAuthenticated = () => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');
    return userToken && userRole === 'citizen';
  };

  const handleFileComplaintClick = () => {
    if (isCitizenAuthenticated()) {
      navigate('/citizen-dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">⚖️</span> {/* Original Emoji Logo */}
            </div>
            <div>
              <h1 className="text-xl font-bold text-accent">Nyaya AI</h1>
              <p className="text-xs text-accent/90">Smart Judicial System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search cases, acts..."
                className="pl-10 w-64 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/60"
              />
            </div>

            {/* Language Switcher */}
            <Select defaultValue="en">
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-primary-foreground">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="regional">Regional</SelectItem>
              </SelectContent>
            </Select>

            {/* Login Button */}
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => navigate('/login')}>
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-1 py-2">
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-accent" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-white/10 hover:text-accent"
            onClick={handleFileComplaintClick}
          >
            File Complaint/FIR
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-accent">
            Track Case
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-accent">
            Legal Resources
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-accent">
            Analytics
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-accent">
            About Us
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;