import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Globe, 
  MapPin, 
  Clock, 
  Languages,
  TrendingUp,
  Users,
  Calendar,
  Hash,
  Sparkles
} from "lucide-react";
const regions = [
  { 
    name: "North America", 
    countries: ["United States", "Canada", "Mexico"],
    timezone: "EST/PST",
    engagement: "2-4 PM, 7-9 PM",
    languages: ["English", "Spanish"],
    active: true
  },
  { 
    name: "Europe", 
    countries: ["United Kingdom", "Germany", "France", "Spain"],
    timezone: "GMT/CET",
    engagement: "8-10 AM, 6-8 PM",
    languages: ["English", "German", "French", "Spanish"],
    active: false
  },
  { 
    name: "Asia Pacific", 
    countries: ["Japan", "Australia", "Singapore", "India"],
    timezone: "JST/AEST",
    engagement: "10 AM-12 PM, 8-10 PM",
    languages: ["English", "Japanese", "Hindi"],
    active: false
  },
  { 
    name: "Latin America", 
    countries: ["Brazil", "Argentina", "Chile", "Colombia"],
    timezone: "BRT/ART",
    engagement: "6-8 PM, 9-11 PM",
    languages: ["Spanish", "Portuguese"],
    active: true
  }
];

const contentVariations = [
  {
    region: "North America",
    original: "Check out our latest innovation! 🚀",
    localized: "Discover our game-changing innovation! 🚀 #Innovation #Tech",
    cta: "Learn More",
    hashtags: ["#Innovation", "#Tech", "#USA", "#Canada"],
    bestTime: "3:00 PM EST"
  },
  {
    region: "Europe", 
    original: "Check out our latest innovation! 🚀",
    localized: "Explore our brilliant new innovation! 🌟 Revolutionising the industry.",
    cta: "Discover More",
    hashtags: ["#Innovation", "#Technology", "#Europe", "#UK"],
    bestTime: "7:00 PM GMT"
  },
  {
    region: "Asia Pacific",
    original: "Check out our latest innovation! 🚀", 
    localized: "Introducing our cutting-edge innovation! 🎯 Excellence in technology.",
    cta: "Explore Now",
    hashtags: ["#Innovation", "#Asia", "#Technology", "#Excellence"],
    bestTime: "11:00 AM JST"
  }
];

export default function RegionalTargeting() {
  const [selectedRegion, setSelectedRegion] = useState("North America");
  const [originalContent, setOriginalContent] = useState("");
  const [generatingVariants, setGeneratingVariants] = useState(false);

  const generateRegionalVariants = async () => {
    setGeneratingVariants(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratingVariants(false);
    }, 2000);
  };

  const getRegionData = (regionName: string) => {
    return regions.find(r => r.name === regionName);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Regional Targeting</h1>
            <p className="text-muted-foreground">Create region-specific content variations for better engagement</p>
          </div>
          
          <Button className="gap-2">
            <Sparkles className="w-4 h-4" />
            Generate All Variants
          </Button>
        </div>

        {/* Region Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map(region => (
            <Card 
              key={region.name}
              className={`border-card-border cursor-pointer transition-colors ${
                region.active ? 'border-primary bg-primary-soft' : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedRegion(region.name)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{region.name}</CardTitle>
                  <Badge variant={region.active ? "default" : "secondary"}>
                    {region.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{region.timezone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span>{region.engagement}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Languages className="w-4 h-4 text-muted-foreground" />
                  <span>{region.languages.join(", ")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Input */}
          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Original Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Enter your original post content..."
                  value={originalContent}
                  onChange={(e) => setOriginalContent(e.target.value)}
                  rows={4}
                />
                
                <Button 
                  onClick={generateRegionalVariants}
                  disabled={!originalContent.trim() || generatingVariants}
                  className="w-full gap-2"
                >
                  <Target className="w-4 h-4" />
                  {generatingVariants ? "Generating..." : "Generate Regional Variants"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Region Details: {selectedRegion}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const region = getRegionData(selectedRegion);
                  if (!region) return null;

                  return (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Countries</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {region.countries.map(country => (
                            <Badge key={country} variant="outline">{country}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Timezone</label>
                          <p className="text-sm text-muted-foreground mt-1">{region.timezone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Peak Hours</label>
                          <p className="text-sm text-muted-foreground mt-1">{region.engagement}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Languages</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {region.languages.map(language => (
                            <Badge key={language} variant="secondary">{language}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Regional Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">4.2x</div>
                    <div className="text-sm text-muted-foreground">Better Engagement</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">73%</div>
                    <div className="text-sm text-muted-foreground">Higher CTR</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Trending Topics in {selectedRegion}</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">#SustainableTech</Badge>
                    <Badge variant="outline">#Innovation2024</Badge>
                    <Badge variant="outline">#FutureOfWork</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Variants */}
          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Regional Variations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contentVariations.map(variant => (
                  <div key={variant.region} className="space-y-4 p-4 border border-card-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {variant.region}
                      </h3>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" />
                        {variant.bestTime}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Original</label>
                        <p className="text-sm p-2 bg-muted rounded">{variant.original}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Localized</label>
                        <p className="text-sm p-2 bg-primary-soft rounded">{variant.localized}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">CTA: </span>
                        <Badge variant="secondary">{variant.cta}</Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Use This Variant
                      </Button>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        Regional Hashtags
                      </label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {variant.hashtags.map(hashtag => (
                          <Badge key={hashtag} variant="outline" className="text-xs">{hashtag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Optimal Posting Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    <div className="font-medium">Mon</div>
                    <div className="font-medium">Tue</div>
                    <div className="font-medium">Wed</div>
                    <div className="font-medium">Thu</div>
                    <div className="font-medium">Fri</div>
                    <div className="font-medium">Sat</div>
                    <div className="font-medium">Sun</div>
                    
                    <div className="p-2 bg-success-soft rounded text-xs">3 PM</div>
                    <div className="p-2 bg-success-soft rounded text-xs">2 PM</div>
                    <div className="p-2 bg-primary-soft rounded text-xs">1 PM</div>
                    <div className="p-2 bg-success-soft rounded text-xs">3 PM</div>
                    <div className="p-2 bg-warning-soft rounded text-xs">4 PM</div>
                    <div className="p-2 bg-muted rounded text-xs">12 PM</div>
                    <div className="p-2 bg-muted rounded text-xs">2 PM</div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-success-soft rounded"></div>
                      <span>High Engagement</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-primary-soft rounded"></div>
                      <span>Medium Engagement</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-muted rounded"></div>
                      <span>Low Engagement</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}