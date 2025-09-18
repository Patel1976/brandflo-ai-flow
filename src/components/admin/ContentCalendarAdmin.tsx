import { useState } from "react";
import { Calendar, Filter, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ScheduledPost {
  id: string;
  title: string;
  brand: string;
  user: string;
  platform: string;
  scheduledDate: string;
  status: 'scheduled' | 'published' | 'failed';
  content: string;
}

const mockPosts: ScheduledPost[] = [
  {
    id: "1",
    title: "New Product Launch",
    brand: "TechStartup Inc",
    user: "John Smith",
    platform: "LinkedIn",
    scheduledDate: "2024-01-15",
    status: "scheduled",
    content: "Excited to announce our latest product that will revolutionize the industry!"
  },
  {
    id: "2",
    title: "Fashion Week Highlights",
    brand: "Fashion Boutique",
    user: "Sarah Johnson", 
    platform: "Instagram",
    scheduledDate: "2024-01-16",
    status: "scheduled",
    content: "Check out the latest trends from fashion week! #fashion #style"
  },
  {
    id: "3",
    title: "Weekend Special",
    brand: "Local Restaurant",
    user: "Mike Wilson",
    platform: "Facebook",
    scheduledDate: "2024-01-14",
    status: "published",
    content: "Join us this weekend for our special menu! Book now."
  }
];

export function ContentCalendarAdmin() {
  const [posts, setPosts] = useState<ScheduledPost[]>(mockPosts);
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredPosts = posts.filter(post => {
    const matchesBrand = brandFilter === "all" || post.brand === brandFilter;
    const matchesPlatform = platformFilter === "all" || post.platform === platformFilter;
    return matchesBrand && matchesPlatform;
  });

  const handleViewPost = (post: ScheduledPost) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  };

  const handleDeletePost = (post: ScheduledPost) => {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      setPosts(posts.filter(p => p.id !== post.id));
      toast({
        title: "Post deleted",
        description: "The scheduled post has been removed."
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const brands = Array.from(new Set(posts.map(p => p.brand)));
  const platforms = Array.from(new Set(posts.map(p => p.platform)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-muted-foreground">View and manage all scheduled content across the platform</p>
        </div>
        <Button onClick={() => setIsGenerateModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Generate Content
        </Button>
      </div>

      <div className="flex gap-4">
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            {platforms.map(platform => (
              <SelectItem key={platform} value={platform}>{platform}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Brand: {post.brand}</p>
                <p>User: {post.user}</p>
                <p>Platform: {post.platform}</p>
                <p>Date: {post.scheduledDate}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 line-clamp-3">{post.content}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewPost(post)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePost(post)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={selectedPost.title} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Brand</Label>
                  <Input value={selectedPost.brand} readOnly />
                </div>
                <div>
                  <Label>Platform</Label>
                  <Input value={selectedPost.platform} readOnly />
                </div>
              </div>
              <div>
                <Label>Scheduled Date</Label>
                <Input value={selectedPost.scheduledDate} readOnly />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea value={selectedPost.content} readOnly rows={4} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Generate Content Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Generate Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Brand</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Platform</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Content Goals</Label>
              <Textarea placeholder="Describe what type of content to generate..." rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setIsGenerateModalOpen(false);
                toast({
                  title: "Content generation started",
                  description: "AI is generating content. You'll be notified when ready."
                });
              }}>
                Generate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}