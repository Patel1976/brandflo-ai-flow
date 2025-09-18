import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Search, Filter, Download } from "lucide-react";
import { PostAnalyticsModal } from "./PostAnalyticsModal";

interface Post {
  id: string;
  snippet: string;
  publishDate: string;
  platform: string;
  engagementRate: number;
  reach: number;
  ctr: number;
  brand: string;
  user: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
}

const mockPosts: Post[] = [
  {
    id: "1",
    snippet: "Exciting new product launch coming this week! Stay tuned for updates...",
    publishDate: "2024-01-15",
    platform: "Instagram",
    engagementRate: 8.5,
    reach: 15420,
    ctr: 3.2,
    brand: "TechCorp",
    user: "john@techcorp.com",
    likes: 1240,
    comments: 85,
    shares: 42,
    saves: 156,
    clicks: 494
  },
  {
    id: "2", 
    snippet: "Behind the scenes at our latest photoshoot. What an amazing day!",
    publishDate: "2024-01-14",
    platform: "Facebook",
    engagementRate: 6.7,
    reach: 8950,
    ctr: 2.8,
    brand: "FashionBrand",
    user: "sarah@fashion.com",
    likes: 720,
    comments: 34,
    shares: 18,
    saves: 89,
    clicks: 251
  },
  {
    id: "3",
    snippet: "Tips for productivity in 2024. Thread below 👇",
    publishDate: "2024-01-13",
    platform: "X (Twitter)",
    engagementRate: 12.3,
    reach: 22100,
    ctr: 4.1,
    brand: "ProductivityApp",
    user: "mike@productivity.com",
    likes: 1840,
    comments: 156,
    shares: 298,
    saves: 420,
    clicks: 906
  }
];

export function AnalyticsTable() {
  const [posts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === "all" || post.platform === platformFilter;
    const matchesBrand = brandFilter === "all" || post.brand === brandFilter;
    
    return matchesSearch && matchesPlatform && matchesBrand;
  });

  const handleViewDetails = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const platforms = Array.from(new Set(posts.map(p => p.platform)));
  const brands = Array.from(new Set(posts.map(p => p.brand)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Platform Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts, users, or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post Snippet</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead className="text-right">Engagement Rate</TableHead>
                  <TableHead className="text-right">Reach</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead>Brand/User</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="max-w-xs truncate font-medium">
                        {post.snippet}
                      </div>
                    </TableCell>
                    <TableCell>{post.publishDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.platform}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {post.engagementRate}%
                    </TableCell>
                    <TableCell className="text-right">
                      {post.reach.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {post.ctr}%
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{post.brand}</div>
                        <div className="text-muted-foreground text-xs">{post.user}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(post)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PostAnalyticsModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}