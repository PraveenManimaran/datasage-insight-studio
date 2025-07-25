import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, FileSpreadsheet, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">DataSage</span>
        </div>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="hero" size="lg" asChild>
            <Link to="/upload">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your
                <span className="gradient-text block">Data Into Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Upload your CSV files and instantly generate beautiful visualizations, 
                correlation matrices, and statistical summaries with DataSage's powerful analytics engine.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/upload" className="group">
                  Start Analyzing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="cta" size="xl" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">CSV Upload & Preview</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Interactive Charts</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl opacity-50" />
            <img 
              src={heroImage} 
              alt="Data visualization dashboard" 
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need for data analysis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade analytics tools made simple and accessible for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="data-card p-8 text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Upload</h3>
              <p className="text-muted-foreground">
                Drag & drop CSV files up to 50MB. Auto-detect data types and suggest target variables.
              </p>
            </Card>

            <Card className="data-card p-8 text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Interactive Visualizations</h3>
              <p className="text-muted-foreground">
                Generate correlation matrices, distribution plots, and missing data heatmaps instantly.
              </p>
            </Card>

            <Card className="data-card p-8 text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Professional Reports</h3>
              <p className="text-muted-foreground">
                Export beautiful PDF reports with all your insights and visualizations included.
              </p>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-muted-foreground">
            Built for data professionals and curious minds alike.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;