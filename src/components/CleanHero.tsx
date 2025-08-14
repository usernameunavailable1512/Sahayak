import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-strong">
            <CardContent className="p-12 md:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="text-center lg:text-left space-y-8">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-primary font-semibold text-lg font-nunito">
                      Emotion-Aware Intelligence
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-merriweather">
                      Unlocking Your{" "}
                      <span className="text-primary">Learning Potential</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-muted-foreground font-merriweather font-light">
                      Empowering teachers. Engaging students. Evolving education.
                    </p>
                    
                    <p className="text-lg text-foreground max-w-2xl font-nunito">
                      Transform rural classrooms with AI-powered, culturally-rooted teaching that adapts to every student's emotional and cognitive needs.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button variant="gradient" size="lg" className="group font-nunito">
                      Start the Journey
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button variant="outline" size="lg" className="group font-nunito" asChild>
                      <a href="https://drive.google.com/file/d/1Bl6um3JZG16G1PJA6j0fYeZxSu6HnLPL/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Demo
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img
                      src="/lovable-uploads/98f46e37-8223-46ac-9876-88a4e617f716.png"
                      alt="Happy teacher surrounded by smiling students in a rural classroom"
                      className="relative rounded-2xl shadow-strong w-full max-w-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full font-semibold shadow-medium font-nunito">
                      ✨ Joyful Learning
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;