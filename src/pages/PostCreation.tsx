import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Upload,
  Instagram,
  Facebook,
  Linkedin,
  Calendar,
  Clock,
  Smile,
  Hash,
  Wand2,
  Image as ImageIcon
} from "lucide-react";

const aiPlatforms = [
  { name: "ChatGPT", models: ["GPT-4", "GPT-3.5"] },
  { name: "Google", models: ["Gemini Pro", "Gemini Ultra"] },
  { name: "Meta", models: ["LLaMA 3 Small", "LLaMA 3 Large"] },
];

const tones = ["Professional", "Casual", "Funny", "Inspiring", "Persuasive"];
const lengths = ["Short", "Medium", "Long"];

const socialPlatforms = [
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "LinkedIn", icon: Linkedin },
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
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [selectedLength, setSelectedLength] = useState("Medium");
  const [selectedSocials, setSelectedSocials] = useState<string[]>([]);
  const [enableImageGen, setEnableImageGen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);

  const handleGenerateContent = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newPosts = [
        `✨ Option 1: ${prompt} (Tone: ${selectedTone}, Length: ${selectedLength})`,
        `🔥 Option 2: ${prompt} (Tone: ${selectedTone}, Length: ${selectedLength})`,
        `💡 Option 3: ${prompt} (Tone: ${selectedTone}, Length: ${selectedLength})`,
      ];
      setGeneratedPosts(newPosts);
      setIsGenerating(false);
      setIsPreviewOpen(true);
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

  const toggleSelection = (list: string[], item: string, setter: (val: string[]) => void) => {
    setter(
      list.includes(item) ? list.filter(i => i !== item) : [...list, item]
    );
  };

  return (
    <div className="min-h-screen bg-background">
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
                {/* AI Platform */}
                <div>
                  <p className="text-sm font-medium mb-2">AI Platforms</p>
                  <div className="flex gap-4 flex-wrap">
                    {aiPlatforms.map(p => (
                      <label key={p.name} className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedPlatforms.includes(p.name)}
                          onCheckedChange={() => toggleSelection(selectedPlatforms, p.name, setSelectedPlatforms)}
                        />
                        {p.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* AI Models */}
                {selectedPlatforms.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">AI Models</p>
                    <div className="flex gap-2 flex-wrap">
                      {aiPlatforms
                        .filter(p => selectedPlatforms.includes(p.name))
                        .flatMap(p => p.models)
                        .map(model => (
                          <Button
                            key={model}
                            variant={selectedModels.includes(model) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSelection(selectedModels, model, setSelectedModels)}
                          >
                            {model}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Image Gen Toggle */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={enableImageGen}
                    onCheckedChange={(checked) => setEnableImageGen(checked === true)}
                  />
                  <span className="text-sm">Enable Image Generation</span>
                </div>

                {/* Tone */}
                <div>
                  <p className="text-sm font-medium mb-2">Tone</p>
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map(tone => (
                        <SelectItem key={tone} value={tone}>
                          {tone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Length */}
                <div>
                  <p className="text-sm font-medium mb-2">Length</p>
                  <div className="flex gap-2">
                    {lengths.map(len => (
                      <Button
                        key={len}
                        variant={selectedLength === len ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedLength(len)}
                      >
                        {len}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Social Media Selection */}
                <div>
                  <p className="text-sm font-medium mb-2">Target Platforms</p>
                  <div className="grid grid-cols-2 gap-3">
                    {socialPlatforms.map(p => {
                      const Icon = p.icon;
                      return (
                        <Button
                          key={p.name}
                          variant={selectedSocials.includes(p.name) ? "default" : "outline"}
                          onClick={() => toggleSelection(selectedSocials, p.name, setSelectedSocials)}
                          className="h-auto p-4 gap-2"
                        >
                          <Icon className="w-4 h-4" />
                          {p.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <p className="text-sm font-medium mb-2">Prompt</p>
                  <Textarea
                    placeholder="e.g., 'Create a post about our new product launch with an exciting tone'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
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
                  Character count: {generatedContent.length}/280 (Instagram)
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Platform Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map(platform => {
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
          </div>

          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="w-full max-w-[90vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Generated Post Options</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {generatedPosts.map((option, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border rounded-lg ${generatedContent === option
                      ? "border-primary bg-primary/10"
                      : "border-muted"
                      }`}
                  >
                    <p>{option}</p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => setGeneratedContent(option)}
                    >
                      {generatedContent === option ? "Selected" : "Select this"}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => setIsPreviewOpen(false)}>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}