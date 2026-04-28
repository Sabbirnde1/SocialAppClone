import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, MessageSquare, TrendingUp, Shield, BookOpen, Sparkles } from "lucide-react";
import skillsIllustration from "@/assets/skills-illustration.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 py-12 sm:py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Connect, Learn, and Grow
                  <span className="block text-primary mt-2">Together on Campus</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                  Join the ultimate social learning platform where students share knowledge, 
                  build connections, and achieve their goals together.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center pt-2 sm:pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate("/join")}
                    className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover-scale touch-target"
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate("/signin")}
                    className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover-scale touch-target"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end animate-fade-in">
                <img 
                  src={skillsIllustration} 
                  alt="Skills development and learning illustration with brain, goals, and growth icons" 
                  className="w-full max-w-md h-auto hover-scale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Powerful features designed to enhance your learning journey
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              <Card className="hover-scale transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Connect with Peers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Build meaningful connections with students who share your interests and goals. 
                    Grow your network and collaborate on projects.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <MessageSquare className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Real-Time Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay connected with instant messaging. Share ideas, ask questions, 
                    and get help when you need it most.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <BookOpen className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Knowledge Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Share posts, tips, and resources. Learn from others' experiences 
                    and contribute to the community.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Track Your Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitor your activity, engagement, and learning progress. 
                    See how you're improving over time.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Safe & Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your privacy and security matter. We use industry-standard 
                    encryption to keep your data safe.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <Sparkles className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Discover Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay updated with trending topics and hashtags. 
                    Join conversations that matter to your community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose SkillShare Campus?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of students already transforming their learning experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Learn Together</h3>
                      <p className="text-muted-foreground">
                        Collaborative learning is proven to be more effective. 
                        Share insights and learn from diverse perspectives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Build Your Network</h3>
                      <p className="text-muted-foreground">
                        Connect with like-minded students and create relationships 
                        that extend beyond the classroom.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Stay Motivated</h3>
                      <p className="text-muted-foreground">
                        Engage with a supportive community that keeps you motivated 
                        and accountable to your learning goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-8 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="text-6xl font-bold text-primary">10K+</div>
                    <p className="text-2xl font-semibold text-foreground">Active Students</p>
                    <p className="text-muted-foreground">
                      Join a thriving community of learners from around the world
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90">
              Join SkillShare Campus today and become part of a community 
              that's passionate about learning and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/join")}
                className="text-lg px-8 py-6 hover-scale"
              >
                Create Free Account
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/signin")}
                className="text-lg px-8 py-6 hover-scale bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign In Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
