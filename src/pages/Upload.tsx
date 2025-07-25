import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload as UploadIcon, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  BarChart3 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DataPreview {
  headers: string[];
  rows: any[][];
  rowCount: number;
  size: string;
}

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dataPreview, setDataPreview] = useState<DataPreview | null>(null);
  const [targetVariable, setTargetVariable] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      processFile(droppedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = async (selectedFile: File) => {
    if (selectedFile.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 50MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file processing with progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const text = await selectedFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Parse first 10 rows for preview
      const rows = lines.slice(1, 11).map(line => 
        line.split(',').map(cell => cell.trim().replace(/"/g, ''))
      );

      setDataPreview({
        headers,
        rows,
        rowCount: lines.length - 1,
        size: formatFileSize(selectedFile.size)
      });

      // Auto-suggest target variable
      const possibleTargets = headers.filter(h => 
        h.toLowerCase().includes('target') || 
        h.toLowerCase().includes('label') ||
        h.toLowerCase().includes('class') ||
        h.toLowerCase().includes('outcome')
      );
      
      if (possibleTargets.length > 0) {
        setTargetVariable(possibleTargets[0]);
      }

      setUploadProgress(100);
      toast({
        title: "File uploaded successfully",
        description: `Loaded ${lines.length - 1} rows with ${headers.length} columns.`,
      });
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please check your CSV format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DataSage</span>
          </Link>
          <Button variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Upload Your Data</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a CSV file to get started with your exploratory data analysis. 
              We'll automatically detect columns and help you choose a target variable.
            </p>
          </div>

          {/* Upload Area */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div
                className={`
                  border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
                  ${isDragging 
                    ? 'border-primary bg-primary/5 scale-105' 
                    : 'border-border hover:border-primary/50'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                    <UploadIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Drop your CSV file here, or click to browse
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Maximum file size: 50MB
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                    Choose File
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {isProcessing && (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Processing file...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* File Info & Preview */}
          {file && dataPreview && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* File Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5" />
                    File Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Filename:</span>
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Size:</span>
                      <span className="text-sm font-medium">{dataPreview.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rows:</span>
                      <span className="text-sm font-medium">{dataPreview.rowCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Columns:</span>
                      <span className="text-sm font-medium">{dataPreview.headers.length}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Target Variable (Optional)</label>
                    <Select value={targetVariable} onValueChange={setTargetVariable}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target variable" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataPreview.headers.map(header => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Choose the column you want to predict or analyze
                    </p>
                  </div>

                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/dashboard" className="group">
                      Analyze Data
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Data Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Preview</CardTitle>
                  <CardDescription>First 10 rows of your dataset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          {dataPreview.headers.map((header, index) => (
                            <th key={index} className="text-left p-2 font-medium">
                              <div className="flex items-center gap-2">
                                {header}
                                {targetVariable === header && (
                                  <Badge variant="secondary" className="text-xs">Target</Badge>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dataPreview.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-b hover:bg-muted/50">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="p-2 text-muted-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Upload;