import { Button } from "@/components/ui/button";
import { Heart, Linkedin, Instagram, Youtube, QrCode, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <div className="bg-primary-foreground/10 p-6 rounded-2xl inline-block">
              <QrCode className="w-16 h-16 mx-auto mb-3" />
              <p className="font-semibold">Scan & Explore on Mobile</p>
            </div>
          </div>

          {/* Regional Language */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Choose Your Language</h3>
            <div className="flex items-center justify-center md:justify-end gap-2">
              <Globe className="w-5 h-5" />
              <select className="bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50">
                <option>हिंदी (Hindi)</option>
                <option>English</option>
                <option>বাংলা (Bengali)</option>
                <option>தமிழ் (Tamil)</option>
                <option>తెలుగు (Telugu)</option>
                <option>मराठी (Marathi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Made with Love */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>Made with</span>
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <span>for India's Teachers</span>
          </div>
          <p className="text-primary-foreground/70 mt-2">
            Empowering rural education through emotion-aware intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;