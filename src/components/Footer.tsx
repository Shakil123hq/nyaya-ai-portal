import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    "Quick Links": [
      "About Us",
      "Newsletter",
      "Sitemap",
      "Helpdesk",
      "Accessibility"
    ],
    "Legal": [
      "Terms & Conditions",
      "Privacy Policy",
      "Disclaimer",
      "Copyright Policy",
      "Hyperlink Policy"
    ],
    "Resources": [
      "Court Orders",
      "Judgments",
      "Case Status",
      "Cause Lists",
      "Legal Aid"
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xl">⚖️</span>
              </div>
              <div>
                <h3 className="font-bold">Nyaya AI</h3>
                <p className="text-xs opacity-90">Justice for All</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Empowering justice through technology and transparency.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-accent">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary-foreground/80 hover:text-accent font-normal"
                    >
                      {link}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="text-sm font-semibold mb-4">Our Partners</h4>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="bg-white/10 px-4 py-2 rounded">
              <span className="text-xs">National Informatics Centre</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded">
              <span className="text-xs">Digital India</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded">
              <span className="text-xs">Department of Justice</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded">
              <span className="text-xs">Ministry of Law</span>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="text-sm font-semibold mb-4">Download Mobile App</h4>
          <div className="flex gap-4">
            <Button variant="secondary" size="sm">
              <span className="text-sm">📱 Google Play</span>
            </Button>
            <Button variant="secondary" size="sm">
              <span className="text-sm">🍎 App Store</span>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-sm opacity-80">
            © 2024 Nyaya AI - Smart Judicial System. All rights reserved.
          </p>
          <p className="text-xs opacity-60 mt-2">
            Best viewed in Chrome, Firefox, Safari, or Edge browsers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
