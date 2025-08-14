import CleanQRCode from "@/components/CleanQRCode";
import CleanHero from "@/components/CleanHero";
import CleanFeatureSection from "@/components/CleanFeatureSection";
import CleanVoiceWidget from "@/components/CleanVoiceWidget";
import Footer from "@/components/Footer";
import { BookOpen, Brain, Camera, Gamepad2, FlaskConical, BarChart3, User } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-nunito">
      {/* QR Code - Fixed Position */}
      <CleanQRCode />
      
      {/* Hero Section */}
      <CleanHero />
      
      {/* Section 1: Academic Enrichment */}
      <CleanFeatureSection
        title="Magic Lesson Builder"
        subtitle="Academic Enrichment"
        description="Boost teaching creativity and engagement using AI-generated lesson content perfectly tailored for Indian rural classrooms."
        instructions="Just tell us your lesson idea. We'll craft it into regionally flavored, story-driven, multilingual content with local culture, visual maps, and interactive diagrams."
        features={[
          "Teacher enters a simple topic/prompt",
          "Multilingual contextual stories with local references",
          "Visually appealing mind maps and diagrams",
          "Conceptual roadmaps with familiar examples",
          "Designed for large classrooms with varied learning paces",
          "Regional cultural context integration"
        ]}
        buttonText="Create Lesson Magic"
        buttonVariant="gradient"
        icon={<BookOpen className="w-12 h-12 text-primary" />}
        bgColor="bg-background"
        href="https://studio--sahayakai-dqs4b.us-central1.hosted.app/"
      />

      {/* Workflow Arrow */}
      <div className="flex justify-center py-8">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-secondary"></div>
          </div>
        </div>
      </div>

      {/* Section 2: Voice Widget */}
      <CleanVoiceWidget />

      {/* Workflow Arrow */}
      <div className="flex justify-center py-8">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-secondary"></div>
          </div>
        </div>
      </div>

      {/* Section 3: Behavioral Monitoring */}
      <CleanFeatureSection
        title="Live Emotion-Driven Assessment"
        subtitle="Behavioral Monitoring"
        description="Analyze how students feel while learning, helping teachers get a complete picture of student engagement and emotional state."
        instructions="Smile, frown, or get surprised – we'll notice it all and give your teacher a behavioral insight into how you're feeling while learning."
        features={[
          "Facial expression detection via webcam",
          "Tracks attention, disinterest, confusion, and joy",
          "Real-time monitoring during quizzes and presentations",
          "Flags students who may need extra encouragement",
          "Privacy-first emotion recognition",
          "Cultural sensitivity in expression analysis"
        ]}
        buttonText="Start Emotion Monitoring"
        buttonVariant="warning"
        icon={<Camera className="w-12 h-12 text-warning" />}
        bgColor="bg-warning/5"
        href="https://emotional-intelligence-phi.vercel.app/"
      />

      {/* Workflow Arrow */}
      <div className="flex justify-center py-8">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-secondary"></div>
          </div>
        </div>
      </div>

      {/* Section 4: Neuroadaptive Intelligence */}
      <CleanFeatureSection
        title="Smart Quiz & Engagement AI"
        subtitle="Neuroadaptive Intelligence"
        description="Adapt learning content live based on student emotional and mental response for truly personalized education."
        instructions="Feeling stuck? We'll launch a simulation. Looking bored? Here comes a game! Your learning experience changes based on how you're feeling!"
        features={[
          "Real-time quizzes adapted to emotional signals",
          "Game-based interventions when engagement drops",
          "Simulation launches for misunderstood concepts",
          "Promotes inclusive, customized learning",
          "Fun-first educational approach",
          "Instant difficulty adjustment"
        ]}
        buttonText="Begin Interactive Quiz"
        buttonVariant="secondary"
        icon={<Gamepad2 className="w-12 h-12 text-secondary" />}
        bgColor="bg-secondary/5"
        href="https://studio--interviewprepai-lelr0.us-central1.hosted.app/"
      />

      {/* Workflow Arrow */}
      <div className="flex justify-center py-8">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-secondary"></div>
          </div>
        </div>
      </div>

      {/* Section 5: Virtual Lab */}
      <CleanFeatureSection
        title="Virtual Lab & Simulation Zone"
        subtitle="Premium Learning Experience"
        description="Give students access to immersive learning content that reignites their interest in complex subjects like Physics and Science."
        instructions="Jump into an interactive world! Discover how real-world concepts work through live simulations and virtual labs – tailored for students needing extra love."
        features={[
          "Visual simulations of scientific concepts",
          "3D lab experiments for Physics/Science",
          "Gamified content for complex ideas",
          "Specialized input for struggling students",
          "Advanced tracks for excelling students",
          "Safe virtual experimentation environment"
        ]}
        buttonText="Enter the Virtual Lab"
        buttonVariant="success"
        icon={<FlaskConical className="w-12 h-12 text-success" />}
        bgColor="bg-success/5"
        href="https://frontend-livid-nine-11.vercel.app/"
      />

      {/* Workflow Arrow */}
      <div className="flex justify-center py-8">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-secondary"></div>
          </div>
        </div>
      </div>

      {/* Section 6: Assessment Reports */}
      <CleanFeatureSection
        title="Beyond Marks, Into the Mind"
        subtitle="Assessment Reports"
        description="Generate holistic reports that measure not just grades but learning style, behavior, emotion, and cognitive development."
        instructions="Track every student's progress – from grades to confidence. We give teachers the full picture to guide every learner effectively."
        features={[
          "Academic + Emotional + Cognitive reporting",
          "Mentorship and support recommendations",
          "Advanced track suggestions",
          "Special attention flags for struggling students",
          "Progress visualization dashboards",
          "Parent-friendly progress summaries"
        ]}
        buttonText="Generate Student Reports"
        buttonVariant="accent"
        icon={<BarChart3 className="w-12 h-12 text-accent" />}
        bgColor="bg-accent/5"
        href="https://fair-jigsaw-466616-h9.el.r.appspot.com/"
        secondaryButtonText="Take Exam"
        secondaryButtonHref="https://studio--gradewise-ezy6d.us-central1.hosted.app/"
        secondaryButtonVariant="gradient"
      />

      {/* Workflow Arrow */}
      <div className="flex justify-center py-8">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-secondary"></div>
          </div>
        </div>
      </div>

      {/* Section 7: Teacher's Companion */}
      <CleanFeatureSection
        title="My Feedback Space"
        subtitle="Teacher's Companion"
        description="Receive valuable feedback about classroom involvement and discover how AI can assist you more effectively in your teaching journey."
        instructions="Dear Teacher, you're doing amazing! Here's how AI has helped, what students are responding to best, and ideas to make your classes even more magical."
        features={[
          "Insights on student response to lessons",
          "AI-generated tips for improved engagement",
          "Participation and understanding metrics",
          "Teaching effectiveness analytics",
          "Personalized improvement suggestions",
          "Student feedback compilation"
        ]}
        buttonText="View My Teaching Report"
        buttonVariant="default"
        icon={<User className="w-12 h-12 text-primary" />}
        bgColor="bg-background"
        href="https://edu-ai-insights.vercel.app/"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
