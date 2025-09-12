import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw, 
  MessageSquare,
  Sparkles,
  TrendingUp,
  Eye,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockGeneratedPosts = [
  {
    id: "1",
    content: "🚀 Excited to announce our new AI-powered analytics dashboard! Get real-time insights into your social media performance like never before. #Analytics #AI #SocialMedia",
    platform: "LinkedIn",
    metrics: { views: 1247, likes: 89, comments: 12 },
    feedback: null,
    regenerations: 2
  },
  {
    id: "2", 
    content: "Summer vibes are here! ☀️ Check out our latest collection featuring sustainable materials and bold designs. Perfect for your next adventure! #Summer #Sustainable #Fashion",
    platform: "Instagram",
    metrics: { views: 2156, likes: 243, comments: 31 },
    feedback: "positive",
    regenerations: 0
  },
  {
    id: "3",
    content: "Did you know that 73% of marketers believe AI-generated content will transform social media in the next 2 years? 🤖 What's your take on this trend?",
    platform: "Twitter",
    metrics: { views: 890, likes: 67, comments: 8 },
    feedback: "negative",
    regenerations: 1
  }
];

export default function AIFeedback() {
  const [posts, setPosts] = useState(mockGeneratedPosts);
  const [feedbackTexts, setFeedbackTexts] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const handleFeedback = (postId: string, type: 'positive' | 'negative') => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, feedback: type } : post
    ));
    
    toast({
      title: `Feedback recorded`,
      description: `Thanks for rating this post as ${type}. This helps improve our AI!`,
    });
  };

  const handleRegenerate = (postId: string) => {
    const feedbackText = feedbackTexts[postId];
    
    setPosts(prev => prev.map(post => 
      post.id === postId ? { 
        ...post, 
        regenerations: post.regenerations + 1,
        content: post.content + " [REGENERATED]" // Placeholder for actual regeneration
      } : post
    ));

    toast({
      title: "Post regenerated",
      description: feedbackText ? "Generated new version based on your feedback" : "Generated new version of the post",
    });
  };

  const handleFeedbackTextChange = (postId: string, text: string) => {
    setFeedbackTexts(prev => ({ ...prev, [postId]: text }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-card-border bg-background sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold">AI Feedback & Regeneration</h1>
            <p className="text-sm text-muted-foreground">Help improve AI-generated content with your feedback</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              {posts.filter(p => p.feedback === 'positive').length} Positive
            </Badge>
            <Badge variant="outline" className="text-xs">
              <ThumbsDown className="w-3 h-3 mr-1" />
              {posts.filter(p => p.feedback === 'negative').length} Negative
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Feedback Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{posts.length}</p>
                  <p className="text-sm text-muted-foreground">Posts Generated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round((posts.filter(p => p.feedback === 'positive').length / posts.length) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Positive Feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {posts.reduce((sum, post) => sum + post.regenerations, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Regenerations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Posts with Feedback */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Recent AI-Generated Posts</h2>
          
          {posts.map((post) => (
            <Card key={post.id} className="border-card-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {post.platform[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.platform}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.regenerations > 0 && `Regenerated ${post.regenerations}x • `}
                        Generated by AI
                      </p>
                    </div>
                  </div>
                  
                  {post.feedback && (
                    <Badge 
                      variant={post.feedback === 'positive' ? 'default' : 'destructive'}
                      className="flex items-center gap-1"
                    >
                      {post.feedback === 'positive' ? (
                        <ThumbsUp className="w-3 h-3" />
                      ) : (
                        <ThumbsDown className="w-3 h-3" />
                      )}
                      {post.feedback}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Post Content */}
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm leading-relaxed">{post.content}</p>
                </div>

                {/* Post Metrics */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.metrics.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.metrics.likes} likes
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {post.metrics.comments} comments
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="space-y-3 pt-3 border-t border-card-border">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Rate this post:</span>
                    <div className="flex gap-2">
                      <Button
                        variant={post.feedback === 'positive' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFeedback(post.id, 'positive')}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Good
                      </Button>
                      <Button
                        variant={post.feedback === 'negative' ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => handleFeedback(post.id, 'negative')}
                        className="flex items-center gap-1"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Poor
                      </Button>
                    </div>
                  </div>

                  {/* Feedback Text Area */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Share specific feedback to help improve AI generation (optional)..."
                      value={feedbackTexts[post.id] || ''}
                      onChange={(e) => handleFeedbackTextChange(post.id, e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Your feedback helps train our AI to generate better content
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRegenerate(post.id)}
                        className="flex items-center gap-1"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips for Better Feedback */}
        <Card className="border-card-border bg-gradient-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Tips for Effective Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-success">👍 Good Feedback Examples:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• "Tone is too formal for Instagram"</li>
                  <li>• "Add more emojis and casual language"</li>
                  <li>• "Include a clear call-to-action"</li>
                  <li>• "Hashtags don't match the content"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-destructive">👎 Less Helpful Feedback:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• "I don't like it"</li>
                  <li>• "Bad post"</li>
                  <li>• "Regenerate this"</li>
                  <li>• "Not good enough"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}