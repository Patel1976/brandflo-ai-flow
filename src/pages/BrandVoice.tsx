import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Upload, 
  Plus, 
  Trash2, 
  Sparkles,
  Volume2,
  MessageSquare,
  BookOpen,
  Wand2
} from "lucide-react";
const toneSliders = [
  { name: "Formal", value: [75], min: 0, max: 100, opposite: "Casual" },
  { name: "Professional", value: [85], min: 0, max: 100, opposite: "Playful" },
  { name: "Friendly", value: [60], min: 0, max: 100, opposite: "Authoritative" },
  { name: "Enthusiastic", value: [70], min: 0, max: 100, opposite: "Calm" },
  { name: "Direct", value: [65], min: 0, max: 100, opposite: "Diplomatic" },
];

const samplePosts = [
  "Excited to share our latest innovation! This breakthrough technology will transform how you work.",
  "Behind the scenes: Our team's dedication to excellence drives everything we do. Meet the people making it happen.",
  "Customer success story: See how we helped TechCorp increase their efficiency by 300%.",
];

const keywordPhrases = [
  "innovative solutions", "cutting-edge technology", "customer-centric", 
  "game-changing", "industry-leading", "user-friendly", "revolutionary",
  "state-of-the-art", "world-class", "next-generation"
];

export default function BrandVoice() {
  const [activeTab, setActiveTab] = useState("tune");
  const [sliderValues, setSliderValues] = useState(
    toneSliders.reduce((acc, slider) => ({
      ...acc,
      [slider.name]: slider.value
    }), {})
  );
  const [customKeywords, setCustomKeywords] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [sampleText, setSampleText] = useState("");
  const [analyzedTone, setAnalyzedTone] = useState<any>(null);

  const handleSliderChange = (sliderName: string, value: number[]) => {
    setSliderValues(prev => ({
      ...prev,
      [sliderName]: value
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !selectedKeywords.includes(newKeyword.trim())) {
      setSelectedKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(prev => prev.filter(k => k !== keyword));
  };

  const analyzeSampleText = () => {
    // Simulate tone analysis
    setTimeout(() => {
      setAnalyzedTone({
        formality: Math.floor(Math.random() * 100),
        enthusiasm: Math.floor(Math.random() * 100),
        friendliness: Math.floor(Math.random() * 100),
        confidence: Math.floor(Math.random() * 100),
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Brand Voice Tuning</h1>
            <p className="text-muted-foreground">Define and refine your brand's unique voice and tone</p>
          </div>
          
          <Button className="gap-2">
            <Sparkles className="w-4 h-4" />
            Apply Voice Settings
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Button 
            variant={activeTab === "tune" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("tune")}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Tone Tuning
          </Button>
          <Button 
            variant={activeTab === "keywords" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("keywords")}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Keywords & Phrases
          </Button>
          <Button 
            variant={activeTab === "samples" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("samples")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Sample Analysis
          </Button>
        </div>

        {activeTab === "tune" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tone Sliders */}
            <div className="space-y-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Voice Characteristics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {toneSliders.map(slider => (
                    <div key={slider.name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{slider.name}</span>
                        <span className="text-sm text-muted-foreground">{slider.opposite}</span>
                      </div>
                      <Slider
                        value={sliderValues[slider.name] || slider.value}
                        onValueChange={(value) => handleSliderChange(slider.name, value)}
                        max={slider.max}
                        min={slider.min}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{slider.min}%</span>
                        <span className="font-medium">{sliderValues[slider.name]?.[0] || slider.value[0]}%</span>
                        <span>{slider.max}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Voice Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Do Use</label>
                    <Textarea 
                      placeholder="Describe what language, tone, and style to use..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Don't Use</label>
                    <Textarea 
                      placeholder="Describe what to avoid..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Voice Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Sample Posts with Current Settings:</h3>
                    {samplePosts.map((post, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <p className="text-sm mb-2">{post}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            Formality: {(sliderValues as any).Formal?.[0] || 75}%
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Enthusiasm: {(sliderValues as any).Enthusiastic?.[0] || 70}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full gap-2">
                    <Wand2 className="w-4 h-4" />
                    Generate Sample with Current Voice
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary-soft">
                <CardHeader>
                  <CardTitle className="text-primary">Voice Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Your brand voice is <strong>highly professional</strong> with a <strong>formal tone</strong>, 
                    moderately friendly approach, and enthusiastic energy. This creates an authoritative 
                    yet approachable communication style perfect for B2B audiences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "keywords" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Brand Keywords & Phrases</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add brand keyword or phrase"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                    />
                    <Button onClick={addKeyword}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Suggested Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {keywordPhrases.map(keyword => (
                        <Button 
                          key={keyword}
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (!selectedKeywords.includes(keyword)) {
                              setSelectedKeywords(prev => [...prev, keyword]);
                            }
                          }}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Upload Brand Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-card-border rounded-lg p-8 text-center space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Upload brand guidelines</p>
                      <p className="text-sm text-muted-foreground">PDF, DOC, TXT files</p>
                    </div>
                    <Button variant="outline">Choose Files</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Active Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedKeywords.map(keyword => (
                      <Badge 
                        key={keyword} 
                        variant="secondary"
                        className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeKeyword(keyword)}
                      >
                        {keyword}
                        <Trash2 className="w-3 h-3" />
                      </Badge>
                    ))}
                    {selectedKeywords.length === 0 && (
                      <p className="text-muted-foreground text-sm">No keywords selected yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Keyword Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Brand Consistency</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>SEO Relevance</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Engagement Potential</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Analyze Keyword Performance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "samples" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Analyze Sample Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Paste your brand content here to analyze its tone..."
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                    rows={6}
                  />
                  
                  <Button 
                    onClick={analyzeSampleText}
                    disabled={!sampleText.trim()}
                    className="w-full gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    Analyze Tone
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Upload Sample Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-card-border rounded-lg p-8 text-center space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Upload existing content</p>
                      <p className="text-sm text-muted-foreground">CSV, TXT, or social media exports</p>
                    </div>
                    <Button variant="outline">Choose Files</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {analyzedTone && (
                <Card className="border-card-border">
                  <CardHeader>
                    <CardTitle>Tone Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(analyzedTone).map(([trait, value]: [string, any]) => (
                      <div key={trait} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium capitalize">{trait}</span>
                          <span className="text-sm text-muted-foreground">{value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all duration-300"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 p-4 bg-primary-soft rounded-lg">
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Increase friendliness to match target tone</li>
                        <li>• Consider more enthusiastic language</li>
                        <li>• Maintain current formality level</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Voice Training Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Samples Analyzed</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Voice Accuracy</span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Consistency Score</span>
                      <span className="font-medium">92%</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Export Voice Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}