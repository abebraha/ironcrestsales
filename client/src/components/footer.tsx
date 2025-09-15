import { Linkedin, Twitter } from "lucide-react";
import ShieldLogo from "./shield-logo";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldLogo size="small" />
              <span className="text-xl font-montserrat font-bold">IronCrest Sales</span>
            </div>
            <p className="text-secondary-foreground/80 mb-4 max-w-md">
              Expert outsourced sales solutions that help businesses build scalable revenue departments through strategic talent and proven systems.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-secondary-foreground/60 hover:text-yellow-300 transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-secondary-foreground/60 hover:text-yellow-300 transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-professionals">Sales Professionals</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-development">System Development</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-hiring">Strategic Hiring</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-optimization">Revenue Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-about">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-case-studies">Case Studies</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-careers">Careers</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors" data-testid="footer-link-contact">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60" data-testid="footer-copyright">
          <p>&copy; 2024 IronCrest Sales. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
