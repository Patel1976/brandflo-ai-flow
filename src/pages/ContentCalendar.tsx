import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Edit,
  Trash2,
  Sparkles
} from "lucide-react";
const mockPosts = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00",
    content: "Excited to announce our new product launch! 🚀",
    platforms: ["Instagram", "Twitter"],
    status: "scheduled",
    engagement: { likes: 0, comments: 0, shares: 0 }
  },
  {
    id: 2,
    date: "2024-01-16",
    time: "14:30",
    content: "Behind the scenes look at our development process",
    platforms: ["LinkedIn", "Facebook"],
    status: "draft",
    engagement: { likes: 0, comments: 0, shares: 0 }
  },
  {
    id: 3,
    date: "2024-01-18",
    time: "11:00",
    content: "Customer testimonial featuring @happy_customer",
    platforms: ["Instagram", "Facebook"],
    status: "published",
    engagement: { likes: 245, comments: 18, shares: 12 }
  }
];

const platformIcons = {
  Instagram: Instagram,
  Facebook: Facebook,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getPostsForDate = (day: number) => {
    if (!day) return [];
    const dateStr = `2024-01-${day.toString().padStart(2, '0')}`;
    return mockPosts.filter(post => post.date === dateStr);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-sidebar-border bg-background sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Content Calendar</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Suggestions
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
          </div>
        </div>
      </header>
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Calendar</h1>
            <p className="text-muted-foreground">Manage and schedule your social media content</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Suggestions
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "month" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
            <Button 
              variant={viewMode === "week" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("week")}
            >
              Week
            </Button>
          </div>
        </div>

        <Card className="border-card-border">
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-card-border">
              {dayNames.map(day => (
                <div key={day} className="p-4 text-center font-medium text-muted-foreground border-r border-card-border last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div 
                  key={index} 
                  className="min-h-32 border-r border-b border-card-border last:border-r-0 p-2"
                >
                  {day && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{day}</div>
                      <div className="space-y-1">
                        {getPostsForDate(day).map(post => (
                          <div 
                            key={post.id}
                            className="p-2 bg-primary-soft rounded text-xs cursor-pointer hover:bg-primary/10"
                            onClick={() => setSelectedPost(post)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium truncate">{post.time}</span>
                              <Badge 
                                variant={post.status === "published" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {post.status}
                              </Badge>
                            </div>
                            <div className="text-muted-foreground truncate mb-1">
                              {post.content}
                            </div>
                            <div className="flex gap-1">
                              {post.platforms.map(platform => {
                                const Icon = platformIcons[platform as keyof typeof platformIcons];
                                return <Icon key={platform} className="w-3 h-3" />;
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedPost && (
          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Post Details</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date & Time</label>
                  <div className="flex items-center gap-2 mt-1">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedPost.date} at {selectedPost.time}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="mt-1">
                    <Badge variant={selectedPost.status === "published" ? "default" : "secondary"}>
                      {selectedPost.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                {isEditing ? (
                  <Textarea 
                    value={selectedPost.content} 
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedPost.content}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Platforms</label>
                <div className="flex gap-2 mt-1">
                  {selectedPost.platforms.map((platform: string) => {
                    const Icon = platformIcons[platform as keyof typeof platformIcons];
                    return (
                      <Badge key={platform} variant="outline" className="gap-1">
                        <Icon className="w-3 h-3" />
                        {platform}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {selectedPost.status === "published" && (
                <div>
                  <label className="text-sm font-medium">Engagement</label>
                  <div className="flex gap-4 mt-1">
                    <div className="text-sm">
                      <span className="font-medium">{selectedPost.engagement.likes}</span> likes
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{selectedPost.engagement.comments}</span> comments
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{selectedPost.engagement.shares}</span> shares
                    </div>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="flex gap-2">
                  <Button size="sm">Save Changes</Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}