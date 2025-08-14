import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CleanFeatureSectionProps {
  title: string;
  subtitle: string;
  description: string;
  instructions: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "secondary" | "accent" | "warning" | "success" | "gradient";
  icon: React.ReactNode;
  bgColor?: string;
  href?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonVariant?: "default" | "secondary" | "accent" | "warning" | "success" | "gradient";
}

const CleanFeatureSection = ({
  title,
  subtitle,
  description,
  instructions,
  features,
  buttonText,
  buttonVariant = "default",
  icon,
  bgColor = "bg-background", 
  href,
  secondaryButtonText,
  secondaryButtonHref,
  secondaryButtonVariant = "default"
}: CleanFeatureSectionProps) => {
  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/95 backdrop-blur-sm border border-border shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="text-center pb-8 space-y-6">
              <div className="flex justify-center">
                <div className="p-6 bg-primary/10 rounded-2xl">
                  {icon}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                  <CardDescription className="text-primary font-semibold font-nunito mb-0">
                    {subtitle}
                  </CardDescription>
                </div>
                
                <CardTitle className="text-3xl md:text-4xl font-bold text-foreground font-merriweather">
                  {title}
                </CardTitle>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-nunito leading-relaxed">
                  {description}
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Instructions */}
              <div className="bg-accent/10 p-6 rounded-xl border border-accent/20">
                <h4 className="font-semibold text-lg text-accent mb-3 font-merriweather">
                  How it works:
                </h4>
                <p className="text-foreground leading-relaxed font-nunito">
                  "{instructions}"
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground font-nunito leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="text-center pt-6 space-y-4">
                <div className={secondaryButtonText ? "flex flex-col sm:flex-row gap-4 justify-center items-center" : ""}>
                  <Button 
                    variant={buttonVariant} 
                    size="lg" 
                    className="group font-nunito"
                    onClick={() => href && window.open(href, '_blank')}
                  >
                    {buttonText}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Button>
                  
                  {secondaryButtonText && secondaryButtonHref && (
                    <Button 
                      variant={secondaryButtonVariant} 
                      size="lg" 
                      className="group font-nunito"
                      onClick={() => window.open(secondaryButtonHref, '_blank')}
                    >
                      {secondaryButtonText}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CleanFeatureSection;
