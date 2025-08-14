import { QrCode, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CleanQRCode = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/98b8adb5-ed68-4b51-a765-35777ec9f9cb.png';
    link.download = 'sahayak-ai-qr-code.png';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sahayak AI - Mobile Experience',
          text: 'Scan this QR code to access Sahayak AI on your mobile device',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 bg-card/95 backdrop-blur-sm p-4 rounded-2xl shadow-medium border border-border hover:shadow-strong transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-xl">
          <img 
            src="/lovable-uploads/98b8adb5-ed68-4b51-a765-35777ec9f9cb.png" 
            alt="Sahayak AI QR Code" 
            className="w-12 h-12 object-contain"
          />
        </div>
        <div className="text-sm font-nunito">
          <p className="font-semibold text-foreground">Scan for</p>
          <p className="text-primary font-bold">Mobile Experience</p>
        </div>
      </div>
      
      {/* Enhancement Options */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 px-2 text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 px-2 text-xs"
          >
            <Share2 className="w-3 h-3 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CleanQRCode;