import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  Filter, 
  TrendingUp, 
  PieChart, 
  Activity,
  Database,
  Target,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock data for demonstration
  const mockStats = {
    totalRows: 15842,
    totalColumns: 12,
    missingValues: 324,
    targetVariable: "price",
    completeness: 97.9
  };

  const mockColumns = [
    { name: "price", type: "numeric", missing: 23, correlation: 1.0 },
    { name: "area", type: "numeric", missing: 12, correlation: 0.87 },
    { name: "bedrooms", type: "numeric", missing: 8, correlation: 0.64 },
    { name: "location", type: "categorical", missing: 45, correlation: 0.52 },
    { name: "age", type: "numeric", missing: 67, correlation: -0.43 },
    { name: "garage", type: "boolean", missing: 15, correlation: 0.38 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DataSage</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="default" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/login">Account</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">EDA Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Ready to analyze your data • Select a file to get started
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <Database className="h-3 w-3 mr-1" />
              {mockStats.completeness}% Complete
            </Badge>
            <Badge variant="outline">
              <Target className="h-3 w-3 mr-1" />
              Target: {mockStats.targetVariable}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="data-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Database className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Rows</p>
                  <p className="text-lg font-semibold">{mockStats.totalRows.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="data-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-accent/30">
                  <BarChart3 className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Columns</p>
                  <p className="text-lg font-semibold">{mockStats.totalColumns}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="data-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Missing Values</p>
                  <p className="text-lg font-semibold">{mockStats.missingValues}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="data-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completeness</p>
                  <p className="text-lg font-semibold">{mockStats.completeness}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="correlations">Correlations</TabsTrigger>
            <TabsTrigger value="distributions">Distributions</TabsTrigger>
            <TabsTrigger value="missing">Missing Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Column Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Column Summary</CardTitle>
                  <CardDescription>
                    Data types and basic statistics for each column
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockColumns.map((column, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded text-xs font-medium ${
                            column.type === 'numeric' ? 'bg-primary/10 text-primary' :
                            column.type === 'categorical' ? 'bg-accent/30 text-accent-foreground' :
                            'bg-secondary text-secondary-foreground'
                          }`}>
                            {column.type === 'numeric' ? '123' : 
                             column.type === 'categorical' ? 'ABC' : 'T/F'}
                          </div>
                          <div>
                            <p className="font-medium">{column.name}</p>
                            <p className="text-xs text-muted-foreground">{column.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            r = {column.correlation > 0 ? '+' : ''}{column.correlation.toFixed(2)}
                          </p>
                          {column.missing > 0 && (
                            <p className="text-xs text-warning">{column.missing} missing</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Placeholder for Correlation Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Correlation Matrix
                  </CardTitle>
                  <CardDescription>
                    Correlation between numeric variables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <PieChart className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium text-muted-foreground">Interactive Heatmap</p>
                        <p className="text-sm text-muted-foreground">
                          Correlation visualization will appear here
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="correlations">
            <Card>
              <CardHeader>
                <CardTitle>Correlation Analysis</CardTitle>
                <CardDescription>
                  Detailed correlation matrix and scatter plots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Activity className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-muted-foreground">Interactive Correlation Charts</p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Advanced correlation analysis with interactive scatter plots and statistical significance testing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distributions">
            <Card>
              <CardHeader>
                <CardTitle>Distribution Analysis</CardTitle>
                <CardDescription>
                  Histograms and box plots for numeric variables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-muted-foreground">Distribution Visualizations</p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Histogram, box plots, and statistical summaries for all numeric columns
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missing">
            <Card>
              <CardHeader>
                <CardTitle>Missing Data Analysis</CardTitle>
                <CardDescription>
                  Patterns and visualizations of missing values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-warning/5 via-destructive/5 to-warning/5 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-muted-foreground">Missing Data Heatmap</p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Visual patterns of missing data across your dataset with recommendations for handling
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;