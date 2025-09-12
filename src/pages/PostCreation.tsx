import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Upload, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Calendar,
  Clock,
  Smile,
  Hash,
  Wand2,
  Image as ImageIcon
} from "lucide-react";
const platforms = [
  { name: "Instagram", icon: Instagram, selected: true },
  { name: "Facebook", icon: Facebook, selected: false },
  { name: "LinkedIn", icon: Linkedin, selected: false },
  { name: "Twitter", icon: Twitter, selected: true },
];

const suggestedHashtags = [
  "#marketing", "#socialmedia", "#business", "#innovation", 
  "#technology", "#startup", "#growth", "#content"
];

const aiSuggestions = [
  "🚀 Ready to transform your business? Discover how our innovative solutions can take you to the next level!",
  "Behind every great product is an amazing team. Here's a glimpse into our creative process ✨",
  "Customer success stories that inspire us every day. Thank you for trusting us with your journey! 💙"
];

export default function PostCreation() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "Twitter"]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
      setGeneratedContent(randomSuggestion);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate AI caption generation
        setTimeout(() => {
          setGeneratedContent("✨ AI-generated caption based on your image: This stunning visual captures the essence of innovation and creativity!");
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const addHashtag = (hashtag: string) => {
    setGeneratedContent(prev => prev + " " + hashtag);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-sidebar-border bg-background sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Create Post</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Save Draft</Button>
            <Button variant="hero" size="sm">Post Now</Button>
          </div>
        </div>
      </header>
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Post</h1>
            <p className="text-muted-foreground">Generate AI-powered content for your social media</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Generation */}
          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tell AI what you want to create</label>
                  <Textarea 
                    placeholder="e.g., 'Create a post about our new product launch with an exciting tone'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerateContent}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? "Generating..." : "Generate Content"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Image Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-card-border rounded-lg p-8 text-center space-y-4">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="max-w-full h-48 object-cover mx-auto rounded-lg"
                      />
                      <Button variant="outline" onClick={() => setUploadedImage(null)}>
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Upload an image</p>
                        <p className="text-sm text-muted-foreground">AI will generate captions and hashtags</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button variant="outline" className="cursor-pointer">
                          Choose File
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Suggested Hashtags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {suggestedHashtags.map(hashtag => (
                    <Button 
                      key={hashtag}
                      variant="outline" 
                      size="sm"
                      onClick={() => addHashtag(hashtag)}
                    >
                      {hashtag}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Settings */}
          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Post Content</label>
                  <Textarea 
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    placeholder="Generated content will appear here..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Smile className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Emoji picker coming soon</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  Character count: {generatedContent.length}/280 (Twitter)
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Platform Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map(platform => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.name);
                    
                    return (
                      <Button
                        key={platform.name}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handlePlatformToggle(platform.name)}
                        className="h-auto p-4 gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {platform.name}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input 
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input 
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    Schedule Post
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Save Draft
                  </Button>
                </div>
                
                <Button variant="hero" className="w-full">
                  Post Now
                </Button>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="border-primary/20 bg-primary-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestions.slice(0, 2).map((suggestion, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-background rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => setGeneratedContent(suggestion)}
                  >
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}