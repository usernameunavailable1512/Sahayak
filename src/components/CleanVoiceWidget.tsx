import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MessageCircle, Brain, Volume2 } from "lucide-react";

const CleanVoiceWidget = () => {
  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/95 backdrop-blur-sm border border-border shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="text-center pb-8 space-y-6">
              <div className="flex justify-center">
                <div className="p-6 bg-accent/10 rounded-2xl">
                  <Brain className="w-12 h-12 text-accent" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
                  <CardDescription className="text-accent font-semibold font-nunito mb-0">
                    Cognitive Support
                  </CardDescription>
                </div>
                
                <CardTitle className="text-3xl md:text-4xl font-bold text-foreground font-merriweather">
                  Voice Wizardry Assistant
                </CardTitle>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-nunito leading-relaxed">
                  Voice-driven Q&A support that detects the emotional and mental state of the student while solving doubts in their preferred language.
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
                  "Ask questions through voice, and our AI will respond like your favorite teacher — while analyzing how confident, energetic, or confused you sound!"
                </p>
              </div>
              
              {/* Voice Widget */}
              <div className="bg-background p-8 rounded-xl border-2 border-dashed border-accent/30">
                <div className="text-center space-y-6">
                  <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto">
                    <Mic className="w-12 h-12 text-accent" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold font-merriweather">Interactive Voice Assistant</h3>
                    <p className="text-muted-foreground font-nunito">Click the button below to start talking with our AI assistant</p>
                  </div>
                  
                  {/* ElevenLabs Voice Widget */}
                  <div className="py-4">
                    <div dangerouslySetInnerHTML={{
                      __html: '<elevenlabs-convai agent-id="agent_3601k14bmph0e7r9t5smew0ph35a"></elevenlabs-convai>'
                    }} />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-accent" />
                      <span className="text-sm font-nunito">Voice Q&A</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                      <Brain className="w-5 h-5 text-accent" />
                      <span className="text-sm font-nunito">Emotion Analysis</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                      <Volume2 className="w-5 h-5 text-accent" />
                      <span className="text-sm font-nunito">Multilingual</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="text-center pt-6">
                <Button variant="accent" size="lg" className="group font-nunito">
                  Talk to Me
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CleanVoiceWidget;